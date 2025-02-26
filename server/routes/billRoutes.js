import express from "express";
import { addBill, getBills, checkBill, deleteBill } from "../controllers/billController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/add", protect, addBill);
router.get("/", protect, getBills);
router.post("/check", protect, checkBill);
router.delete("/:id", protect, deleteBill); 

export default router;
