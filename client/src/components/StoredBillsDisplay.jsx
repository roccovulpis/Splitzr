import React, { useEffect, useState } from "react";
import axios from "axios";
import StoredBillsList from "./StoredBillsList";

export default function StoredBillsDisplay() {
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ Use environment variable for API base URL
  const API_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

  useEffect(() => {
    async function fetchBills() {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("No authentication token found. Please log in.");
        setLoading(false);
        return;
      }

      try {
        console.log("🔵 Fetching bills from:", `${API_URL}/api/bills`);

        const response = await axios.get(`${API_URL}/api/bills`, {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true, // ✅ Ensures cookies are sent (if needed)
        });

        console.log("🟢 Bills fetched successfully:", response.data);
        setBills(response.data);
      } catch (error) {
        console.error("🔴 Error fetching bills:", error);
        
        if (error.response) {
          console.error("🔴 Server responded with:", error.response.data);
          setError(error.response.data.message || "Failed to load bills.");
        } else if (error.request) {
          console.error("🔴 No response received from server:", error.request);
          setError("Server is not responding. Try again later.");
        } else {
          console.error("🔴 Error setting up request:", error.message);
          setError("Unexpected error occurred. Try again.");
        }
      } finally {
        setLoading(false);
      }
    }

    fetchBills();
  }, []);

  if (loading) return <p>Loading bills...</p>;
  if (error) return <p className="error-message">{error}</p>;
  return <StoredBillsList bills={bills} />;
}