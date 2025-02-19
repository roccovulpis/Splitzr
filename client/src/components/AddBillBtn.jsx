import React from "react";

const AddBillButton = ({ onClick }) => {
  return (
    <button onClick={onClick} className="add-bill-button">
      Add to Bills
    </button>
  );
};

export default AddBillButton;
