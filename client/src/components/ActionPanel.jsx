import React from "react";
import EditBillButton from "./buttons/EditBillButton";
import DeleteBillButton from "./buttons/DeleteBillButton";
import AddBillButton from "./buttons/AddBillButton";
import SplitEvenlyButton from "./buttons/SplitEvenlyButton";
import AssignItemsButton from "./buttons/AssignItemsButton";
import "../styles/ActionPanel.css";

export default function ActionPanel({
  editBill,
  handleSplitOption,
  handleAddBill,
  handleDeleteBill,
  isBillSubmitted,
}) {
  return (
    <div className="action-panel">
      <h2>Bill Options</h2>
      <div className="action-panel-btns">
        <EditBillButton onClick={editBill} />
        <SplitEvenlyButton onClick={() => handleSplitOption("equal")} />
        <AssignItemsButton onClick={() => handleSplitOption("custom")} />
        <AddBillButton onClick={handleAddBill} isBillSubmitted={isBillSubmitted} />
        <DeleteBillButton onClick={handleDeleteBill} />
      </div>
    </div>
  );
}
