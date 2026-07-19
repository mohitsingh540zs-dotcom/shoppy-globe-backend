import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`Connection Establied with mongoDB: ${conn.connection.host}`)
    } catch (error) {
        console.log(`Connection Failed with mongoDB: ${error.message}`);
        process.exit(1);
    }
}