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

export const checkBill = async (req, res) => {
  try {
    const { event_name, event_date } = req.body;

    if (!event_name || !event_date) {
      return res.status(400).json({ message: "Event name and event date are required." });
    }

    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized. Please log in." });
    }

    // Query the database for an existing bill with the same event name and event date for this user
    const existingBill = await Bill.findOne({ event_name, event_date, user: req.user.id });

    if (existingBill) {
      return res.status(200).json({ exists: true, bill: existingBill });
    } else {
      return res.status(200).json({ exists: false });
    }
  } catch (error) {
    console.error("❌ Error checking bill:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

export const deleteBill = async (req, res) => {
  try {
    const billId = req.params.id;
    
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized. Please log in." });
    }
    
    // Ensure the bill belongs to the authenticated user
    const deletedBill = await Bill.findOneAndDelete({ _id: billId, user: req.user.id });
    
    if (!deletedBill) {
      return res.status(404).json({ message: "Bill not found or unauthorized." });
    }
    
    res.status(200).json({ message: "Bill deleted successfully", deletedBill });
  } catch (error) {
    console.error("❌ Error deleting bill:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
