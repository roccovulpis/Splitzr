import React from "react";

export default function ConfirmBillButton({ onClick }) {
  return (
    <button className="bill-confirm-btn" onClick={onClick}>
      Confirm Bill
    </button>
  );
}
