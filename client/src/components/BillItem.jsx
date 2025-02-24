import React from "react";

export default function BillItem({ bill, onClick }) {
  return (
    <li className="bill-item" onClick={onClick}>
      <p><strong>{bill.event_name || "Untitled Bill"}</strong></p>
      <p>Date: {bill.event_date ? new Date(bill.event_date).toLocaleDateString() : "N/A"}</p>
      <p>Items: {bill.items?.length ?? 0}</p>
    </li>
  );
}
