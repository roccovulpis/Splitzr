import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

console.log("🔍 DEBUG: MONGO_URI:", process.env.MONGO_URI); 

const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("❌ MONGO_URI is missing in .env file!");
    }

    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("✅ MongoDB connected successfully");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  }
};

export default connectDB;
