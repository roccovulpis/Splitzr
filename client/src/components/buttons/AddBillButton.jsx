import React from "react";

export default function AddBillButton({ onClick, isBillSubmitted }) {
  return (
    <button onClick={onClick} disabled={isBillSubmitted}>
      <span className="button-icon">💸</span>
      <span className="button-text">
        {isBillSubmitted ? "Already Added" : "Add to My Bills"}
      </span>
    </button>
  );
}
