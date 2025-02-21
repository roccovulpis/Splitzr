import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
    try {
        console.log("🔹 Incoming Request Headers:", req.headers);

        let token = req.header("Authorization");

        if (!token) {
            console.log("❌ No token received.");
            return res.status(401).json({ message: "No token provided. Unauthorized." });
        }

        if (token.startsWith("Bearer ")) {
            token = token.split(" ")[1]; 
        }

        console.log("🔹 Extracted Token:", token);

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("🔹 Decoded Token:", decoded);

        req.user = await User.findById(decoded.userId).select("-password");

        if (!req.user) {
            console.log("❌ User Not Found in Database!");
            return res.status(401).json({ message: "User not found. Unauthorized." });
        }

        console.log("✅ User Authenticated:", req.user);
        next();
    } catch (error) {
        console.error("❌ Invalid Token:", error.message);
        res.status(401).json({ message: "Invalid token. Unauthorized." });
    }
};
