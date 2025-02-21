import React from "react";
import "../styles/ActionPanel.css";

export default function ActionPanel({ editBill, handleSplitOption, splitOption, handleAddBill, isBillSubmitted }) {
  return (
    <div className="action-panel">
      <h2>Choose How to Split</h2>
      <div className="action-panel-btns">
        <button onClick={editBill}>
          <span className="button-icon">✏️</span>
          <span className="button-text">Edit Bill</span>
        </button>
        <button onClick={() => handleSplitOption("equal")}>
          <span className="button-icon">🔄</span>
          <span className="button-text">Split Evenly</span>
        </button>
        <button onClick={() => handleSplitOption("custom")} disabled>
          <span className="button-icon">👥</span>
          <span className="button-text">Assign Items</span>
        </button>
      </div>
    </div>
  );
}
