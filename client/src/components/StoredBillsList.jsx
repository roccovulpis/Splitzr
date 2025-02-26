import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/StoredBillsDisplay.css";
import BillItem from "./BillItem";

export default function StoredBillsList({ bills }) {
  const navigate = useNavigate();

  const handleBillClick = (bill) => {
    const normalizedBill = {
      event: bill.event || bill.event_name,
      eventDate: bill.eventDate || bill.event_date,
      items: bill.items,
    };
    navigate("/bill-overview", { state: { selectedBill: normalizedBill } });
  };
  
  return (
    <div className="stored-bills-container">
      <h2>Stored Bills</h2>
      {bills.length > 0 ? (
        <ul className="bills-list">
          {bills.map((bill) => (
            <BillItem key={bill._id} bill={bill} onClick={() => handleBillClick(bill)} />
          ))}
        </ul>
      ) : (
        <p>No bills stored yet.</p>
      )}
    </div>
  );
}
