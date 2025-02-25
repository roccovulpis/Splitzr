import React from "react";
import { useNavigate } from "react-router-dom"; 
import { resetStoredBill } from "../../utils/localStorageUtils";

export default function DeleteBillButton({ setBill }) {
  const navigate = useNavigate(); 

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this bill?")) {
      resetStoredBill();
      setBill(null); 
      
      setTimeout(() => {
        navigate("/create-bill");
      }, 100); 
    }
  };

  return (
    <button onClick={handleDelete}>
      <span className="button-icon">❌</span>
      <span className="button-text">Delete Bill</span>
    </button>
  );
}
