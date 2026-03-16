import mongoose from "mongoose";
import "dotenv/config"

export async function connectMoongooseDB(){
    try{
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("connected to mongoDB suceffuly")
    }
    catch(err){
        console.error(err)
        process.exit(1)
    }
}