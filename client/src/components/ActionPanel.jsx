import React from "react";
import EditButton from "./buttons/EditBillButton";
import DeleteButton from "./buttons/DeleteBillButton";
import AddBillButton from "./buttons/AddBillButton";
import SplitEvenlyButton from "./buttons/SplitEvenlyButton";
import AssignItemsButton from "./buttons/AssignItemsButton";
import "../styles/ActionPanel.css";

export default function ActionPanel({ editBill, handleSplitOption, handleAddBill, handleDeleteBill, isBillSubmitted, setBill }) {
  return (
    <div className="action-panel">
      <h2>Bill Options</h2>
      <div className="action-panel-btns">
        <EditButton onClick={editBill} />
        <SplitEvenlyButton onClick={() => handleSplitOption("equal")} />
        <AssignItemsButton onClick={() => handleSplitOption("custom")} />
        <AddBillButton onClick={handleAddBill} isBillSubmitted={isBillSubmitted} setBill={setBill} />
        <DeleteButton onClick={handleDeleteBill} setBill={setBill} />
      </div>
    </div>
  );
}
