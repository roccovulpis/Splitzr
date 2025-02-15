import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import connectDB from "../config/db.js";
import authRoutes from "../routes/authRoutes.js";

// Fix for ES module path resolution
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Explicitly Load `.env` from `server/`
dotenv.config({ path: path.resolve(__dirname, "../.env") });

console.log("🔍 DEBUG: MONGO_URI:", process.env.MONGO_URI); // Debugging check

connectDB(); // Connect to MongoDB

const app = express();

// ✅ Fix: Middleware to Parse JSON & URL-Encoded Requests
app.use(express.json());  // ✅ Parses incoming JSON requests
app.use(express.urlencoded({ extended: true })); // ✅ Parses form data

// ✅ Fix: CORS Configuration
const allowedOrigins = [
  "http://localhost:5173",  // ✅ Allow local frontend
  "https://splitzr.vercel.app"  // ✅ Allow deployed frontend
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS policy does not allow this origin."), false);
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
  })
);

// ✅ API Routes
app.use("/api/auth", authRoutes);

// ✅ Test Route
app.get("/api/test", (req, res) => {
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

export default app;
