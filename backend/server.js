import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// User Schema
const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true }, // Store hashed password
});

const User = mongoose.model("User", UserSchema);

// ✅ Login Route (Fixed `/api/` Prefix)
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("🔵 Login request received:", { email });

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      console.error("❌ Login failed: Account not found");
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Compare entered password with hashed password in DB
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.error("❌ Login failed: Incorrect password");
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    console.log("✅ Login successful for:", user.email);
    return res.status(200).json({ message: "Login successful", token });

  } catch (error) {
    console.error("❌ Login error:", error);
    return res.status(500).json({ message: "Server error. Please try again later." });
  }
});

// ✅ Registration Route (Fixed `/api/` Prefix)
app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log("🟢 Registration request received:", req.body);

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.error("❌ Registration failed: User already exists");
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    console.log("✅ User registered successfully:", newUser);
    
    return res.status(201).json({ message: "User registered successfully", token }); 
  } catch (error) {
    console.error("❌ Registration error:", error);
    return res.status(500).json({ message: "Error registering user", error: error.message });
  }
});

// ✅ Test Route (For Checking If API Works)
app.get("/test", (req, res) => {
  res.json({ message: "API is working!" });
});

// ✅ Handle 404 for Unknown Routes
app.use((req, res) => {
  res.status(404).json({ error: "Not Found" });
});

// ✅ Fix Port Handling for Vercel
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

export default app; // Required for Vercel
