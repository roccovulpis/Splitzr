import React from "react";
import { resetStoredBill } from "../../utils/localStorageUtils";

export default function ResetBillButton({ setBill }) {
  const handleReset = () => {
    if (window.confirm("Are you sure you want to reset the bill?")) {
      resetStoredBill();
      setBill(null); 
    }
  };

  return (
    <button className="reset-bill-btn" onClick={handleReset}>
      Reset Bill
    </button>
  );
}
