// require ("dotenv").config({path: './env'})
import dotenv from "dotenv"
import connectDB from "./db/indexdp.js";
import { app } from "./app.js";
dotenv.config({
    path : './.env'                // added some code in package.json file in dev
})

connectDB()
.then(()=>{
    app.listen(process.env.PORT || 8000, ()=>{
        console.log(`Server is running at port : ${process.env.PORT}`)
    })
})
.catch((err)=>{
    console.log("MONGO db connection failed !!!", err)
})







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