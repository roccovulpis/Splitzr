import Bill from "../models/Bill.js";

export const addBill = async (req, res) => {
    try {
        const { event_name, event_date, items } = req.body;

        // Validate input fields
        if (!event_name || !event_date || !items || !Array.isArray(items) || items.length === 0) {
            return res.status(400).json({ message: "All fields are required, including at least one item." });
        }

        // Create a new bill with multiple items
        const newBill = new Bill({
            event_name,
            event_date,
            items, // Store the items array
        });

        await newBill.save();
        res.status(201).json({ message: "Bill added successfully", newBill });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

export const getBills = async (req, res) => {
    try {
        const bills = await Bill.find();
        res.status(200).json(bills);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};
