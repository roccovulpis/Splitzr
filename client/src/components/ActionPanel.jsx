import React from "react";
import EditButton from "./buttons/EditBillButton";
import DeleteButton from "./buttons/DeleteBillButton";
import AddBillButton from "./buttons/AddBillButton";
import SplitEvenlyButton from "./buttons/SplitEvenlyButton";
import AssignItemsButton from "./buttons/AssignItemsButton";
import "../styles/ActionPanel.css";

export default function ActionPanel({ editBill, handleSplitOption, handleAddBill, handleDeleteBill, isBillSubmitted, setBill, billId }) {
  console.log("Passing billId to DeleteButton:", billId);

  return (
    <div className="action-panel">
      <div className="action-panel-content">
        <h2>Bill Options</h2>
        <div className="action-panel-btns">
          <EditButton onClick={editBill} />
          <SplitEvenlyButton onClick={() => handleSplitOption("equal")} />
          <AssignItemsButton onClick={() => handleSplitOption("custom")} />
          <AddBillButton onClick={handleAddBill} isBillSubmitted={isBillSubmitted} setBill={setBill} />
          <DeleteButton billId={billId} setBill={setBill} />
        </div>
      </div>
    </div>
  );
}
