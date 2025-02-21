import mongoose from "mongoose";

const ItemSchema = new mongoose.Schema({
  item: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

const BillSchema = new mongoose.Schema({
  event_name: { type: String, required: true },
  event_date: { type: Date, required: true },
  items: [ItemSchema],
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

const Bill = mongoose.model("Bill", BillSchema);
export default Bill;
