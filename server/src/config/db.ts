import mongoose from "mongoose";

const connectDB = async () => {
    const uri: string =
        process.env.MONGO_URI || "mongodb://localhost:27017/talksyDB";
        
    try {
        const conn = await mongoose.connect(uri);
        console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch (err) {
        console.error(`Error: ${(err as Error).message}`);
        process.exit(1);
    }
};

export default connectDB;
