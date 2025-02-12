import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Define a simple User schema
const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true }
});

const User = mongoose.model("User", UserSchema);

// API Routes
app.get("/", (req, res) => {
  res.send("Welcome to the Splitzr API!");
});

// Get all users
app.get("/users", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// Create a user
app.post("/users", async (req, res) => {
  const { name, email } = req.body;
  try {
    const newUser = new User({ name, email });
    await newUser.save();
    res.json(newUser);
  } catch (err) {
    res.status(400).json({ error: "Failed to create user" });
  }
});

// Start the server
app.listen(process.env.PORT, () => {
  console.log(`🚀 Server running on port ${process.env.PORT}`);
});
