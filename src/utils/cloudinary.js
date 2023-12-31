import {v2 as cloudinary} from 'cloudinary';
import fs from "fs"

          
cloudinary.config({ 
  cloud_name:process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret:process.env.CLOUDINARY_API_SECRET 
});


const uploadOnCloudinary = async (loaclFilePath)=>{
    try {
        if(!loaclFilePath) return "Could not find loaclFilePath"
        // Uload the file path on cloudinary
        const response = await cloudinary.uploader.upload(loaclFilePath,{
            resource_type: "auto"
        })

        // file has been uloaded succesfully
        console.log("*****file is uploaded on cloudinary********", response, response.url);
        fs.unlinkSync(loaclFilePath)// delete local copy of the image after it's been uploaded to cl
        return response;
    } catch (error) {
        fs.unlinkSync(loaclFilePath)   // remove the locally saved tem file as the upload opeartion got failed
        return null
    }
}


export {uploadOnCloudinary}




// we have to check full response in consle.log me