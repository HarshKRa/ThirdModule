// require ("dotenv").config({path: './env'})
import dotenv from "dotenv"
import connectDB from "./db/indexdp.js";
dotenv.config({
    path : './env'                // added some code in package.json file in dev
})

connectDB();







/*
// import mongoose from "mongoose";
// import { DB_NAME } from "./constants";
// import { express } from "express";
const app = express();

;( async()=>{    // ; for cleaning purpose for clean previouse code
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        app.on("Error :",(error)=>{
            console.log('Database connection error');
            throw error;
        })

    app.listen(process.env.PORT,()=>{
        console.log(`Server is running on port ${process.env.PORT}`);
    })

    } catch (error) {
        console.error("ERROR :", error)
        throw error
    }
})()

*/