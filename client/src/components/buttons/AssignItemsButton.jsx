import React from "react";

export default function AssignItemsButton({ onClick }) {
  return (
    <button onClick={onClick} disabled>
      <span className="button-icon">👥</span>
      <span className="button-text">Assign Items</span>
    </button>
  );
}
