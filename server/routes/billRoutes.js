import express from "express";
import { addBill, getBills } from "../controllers/billController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/add", protect, addBill);
router.get("/", protect, getBills);

export default router;