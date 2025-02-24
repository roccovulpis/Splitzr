import React, { useEffect, useState } from "react";
import axios from "axios";
import StoredBillsList from "./StoredBillsList";

export default function StoredBillsDisplay() {
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchBills() {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("No authentication token found. Please log in.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get("http://localhost:5000/api/bills", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setBills(response.data);
      } catch (error) {
        setError("Failed to load bills. Unauthorized.");
      } finally {
        setLoading(false);
      }
    }

    fetchBills();
  }, []);

  return loading ? <p>Loading bills...</p> : error ? <p className="error-message">{error}</p> : <StoredBillsList bills={bills} />;
}
