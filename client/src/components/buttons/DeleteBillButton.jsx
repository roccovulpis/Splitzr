import React from "react";

export default function DeleteBillButton({ onClick }) {
  return (
    <button onClick={onClick}>
      <span className="button-icon">❌</span>
      <span className="button-text">Delete Bill</span>
    </button>
  );
}
