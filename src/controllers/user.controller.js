import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import {User} from '../models/user.model.js'
import {uploadOnCloudinary} from '../utils/cloudinary.js'
import { ApiResonse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req,res) =>{
    // res.status(200).json({
    //     message : "Harsh Raj Kumar"
    // })

    // get user details from frontend
    // validation - not empty
    // check if user already exists: username, email
    // check for images , check for avatar
    // upload them to cloudinary, avatar
    // creat user object - create entry in db
    // remove password and refresh token field from response 
    // return res


     // get user details from frontend

        const {fullname, email, username, password} = req.body;

        // check req.body in consloe.log me

        console.log("Name : ",fullname,"    ", "email : ",email);

        // if (fullname === "") {
        //     throw new ApiError(400,"full name is required") 
        // } else {
            
        // }


        // validation - not empty
        if(
            [fullname,email,username,password].some((field) => field?.trim() === "")
            ){
                throw new ApiError(400,"All vild are required")
            }

    // check if user already exists: username, email

    const existedUser = await User.findOne({
        $or:[{username}, {email}]
    })

    if(existedUser){
        throw new ApiError(409,"User already exist")
    }

    // check for images , check for avatar

    const avatarLocalPath = req.files?.avatar[0]?.path;

    // check request.file in console.log me

    console.log("****** console.log(req.files)***********",req.files)

    let coverImageLocalPath;
    // const coverImageLocalPath = req.files?.coverImage[0]?.path;
     if(req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length>0){
        coverImageLocalPath = req.files.coverImage[0].path
     }

     if(!avatarLocalPath){
        throw new ApiError(400,"Avatar iage is required")
    }
    
     
    // upload them to cloudinary, avatar

    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)

    // check again avatar is available or not
    if(!avatar){
        throw new ApiError(400,"Avatar iage is required")
    }

     // creat user object - create entry in db

    const user = await User.create({
        fullname,
        avatar:avatar.url,
        coverImage:coverImage?.url||"",
        email,
        password,
        username:username?username.toLowerCase() : undefined

     })


    // remove password and refresh token field from response
    // check user creation
    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if(!createdUser){
        throw new ApiError(500,"Something went wrong while registering the user")
    }

    // return response

    return res.status(201).json(
        new ApiResonse(200,createdUser,"User registered successfully")
    )

})

export {registerUser}