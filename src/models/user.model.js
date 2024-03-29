import mongoose,{Schema} from "mongoose";
import  jwt  from "jsonwebtoken";
import bcrypt from 'bcrypt';

const userSchema = new Schema({
    username: {
        type: String,
        required : true,
        unique : true,
        lowercase : true,
        trime : true,
        index: true  
    },
    email: {
        type: String,
        required : true,
        unique : true,
        lowercase : true,
        trime : true, 
    },
    fullname: {
        type: String,
        required : true,
        trime : true, 
        index : true
    },
    avatar: {
        type: String,             // cloudinary url
        required : true,
    },
    coverImage: {
        type: String,             // cloudinary url
    },
    watchHistory : [
        {
        type: Schema.Types.ObjectId,
        ref : "Video"
        }
    ],
    password:{
        type : String,
        required : [true, 'Password is required']
    },
    refreshToken:{
        type : String
    }
},{timestamps:true})

// don't use arrow function for callback, arrow function not allow this keyword
userSchema.pre("save", async function(next){
    if(!this.isModified("password"))  return next();   // without this every time password encription is done whenever we change any fild
    
    this.password =await bcrypt.hash(this.password,10)
    next()
}) 


userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password,this.password)
}

userSchema.methods.generateAccessToken = async function(){
    return await jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullname: this.fullname
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.generateRefershAccessToken = async function(){
    return await jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}


export const User = mongoose.model("User",userSchema);