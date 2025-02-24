import React from "react";

export default function ResetBillButton({ onClick }) {
  return (
    <button className="reset-bill-btn" onClick={onClick}>
      Reset Bill
    </button>
  );
}
