import mongoose from "mongoose";

const MONGOOSE_URL = 'mongodb://localhost:27017/BlogServer'

export const connectDb = async ()=>{
    try {
        mongoose.connect(MONGOOSE_URL);
        console.log('Db Connected');
    } catch (error) {
        console.log('Db not Connected');
    }
}