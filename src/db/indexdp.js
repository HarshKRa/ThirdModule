import mongoose from "mongoose";
import {DB_NAME} from '../constants.js'

const connectDB = async() => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        console.log(`\n MongoDB connected !! DB HOST : ${connectionInstance.connection.host}`)   // check console this(connectionInstance)

    } catch (error) {
        console.log("MONGODB connection erro ", error);
        process.exit(1);                                     // we need to read process exit in node
    }
}




export default connectDB;