import Bill from "../models/Bill.js";

export const addBill = async (req, res) => {
    try {
        const { event_name, event_date, items } = req.body;

        if (!event_name || !event_date || !items || !Array.isArray(items) || items.length === 0) {
            return res.status(400).json({ message: "All fields are required, including at least one item." });
        }

        // Ensure the user is authenticated
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized. Please log in." });
        }

        console.log("✅ User ID adding bill:", req.user.id);

        // Create a new bill with a reference to the user
        const newBill = new Bill({
            event_name,
            event_date,
            items,
            user: req.user.id,
        });

        await newBill.save();
        res.status(201).json({ message: "Bill added successfully", newBill });
    } catch (error) {
        console.error("❌ Error adding bill:", error);
        res.status(500).json({ message: "Server error", error });
    }
};

export const getBills = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized. Please log in." });
        }

        const bills = await Bill.find({ user: req.user.id }).populate("user", "name email");

        res.status(200).json(bills);
    } catch (error) {
        console.error("❌ Error retrieving bills:", error);
        res.status(500).json({ message: "Server error", error });
    }
};