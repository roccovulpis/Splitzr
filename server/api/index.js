import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import connectDB from "../config/db.js";
import authRoutes from "../routes/authRoutes.js";
import billRoutes from "../routes/billRoutes.js";

// ✅ Get __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Load environment variables (Railway handles env variables automatically)
dotenv.config();

// ✅ Connect to MongoDB
connectDB();

const app = express();

// ✅ Allow CORS from frontend URLs
const allowedOrigins = [
  "http://localhost:5173",
  "https://splitzr.vercel.app",
  "https://splitzr-backend.vercel.app",
  "https://splitzr-production.up.railway.app" 
];

// ✅ Use CORS Middleware Before Routes
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS policy does not allow this origin."));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
  })
);

// ✅ Handle Preflight Requests (IMPORTANT for Vercel & Railway)
app.options("*", (req, res) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    return res.status(204).end();
  }
  return res.status(403).json({ message: "CORS Not Allowed" });
});

// ✅ Middleware for Parsing JSON and URL-Encoded Data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Root Route (Fixes 404 on Railway)
app.get("/", (req, res) => {
  res.send("Backend is running! 🚀");
});

// ✅ Fix 404 Error for /favicon.ico (Prevents Console Errors)
app.get("/favicon.ico", (req, res) => res.status(204).end());

// ✅ API Routes
app.use("/api/auth", authRoutes);
app.use("/api/bills", billRoutes);

// ✅ 404 Handler (Unknown Routes)
app.use((req, res) => {
  res.status(404).json({ error: "Not Found" });
});

// ✅ Start Server (PORT is auto-assigned by Railway)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

export default app;
