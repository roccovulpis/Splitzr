import React from "react";

export default function SplitEvenlyButton({ onClick }) {
  return (
    <button onClick={onClick}>
      <span className="button-icon">🔄</span>
      <span className="button-text">Split Evenly</span>
    </button>
  );
}
