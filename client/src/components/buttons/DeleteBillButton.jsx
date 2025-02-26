import React from "react";
import { useNavigate } from "react-router-dom"; 
import { resetStoredBill } from "../../utils/localStorageUtils";

const API_BASE_URL = import.meta.env.VITE_API_URL;

export default function DeleteBillButton({ billId, setBill }) {
  const navigate = useNavigate(); 

  const handleDelete = async () => {
    if (!billId) {
      console.error("DeleteBillButton: No bill ID provided for deletion.");
      window.alert("Error: Bill ID is missing. Cannot delete bill.");
      return;
    }

    if (window.confirm("Are you sure you want to delete this bill?")) {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          window.alert("You are not logged in. Please log in and try again.");
          navigate("/login");
          return;
        }

        console.log("🔍 Sending DELETE request for bill ID:", billId);
        const response = await fetch(`${API_BASE_URL}/bills/${billId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("🔍 Response status:", response.status);
        const responseData = await response.json();
        console.log("🔍 Response data:", responseData);

        if (response.ok) {
          window.alert("Bill deleted successfully!");
          resetStoredBill();
          setBill(null);
          navigate("/my-bills", { state: { refresh: true } });
        } else {
          window.alert(`Error deleting bill: ${responseData.message || "Unknown error"}`);
        }
      } catch (error) {
        console.error("DeleteBillButton: API error:", error);
        window.alert("Failed to delete bill.");
      }
    }
  };

  return (
    <button onClick={handleDelete}>
      <span className="button-icon">❌</span>
      <span className="button-text">Delete Bill</span>
    </button>
  );
}
