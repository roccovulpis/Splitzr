import React from "react";

export default function EditBillButton({ onClick }) {
  return (
    <button onClick={onClick}>
      <span className="button-icon">✏️</span>
      <span className="button-text">Edit Bill</span>
    </button>
  );
}