import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ItemList from "../components/ItemList";
import ActionPanel from "../components/ActionPanel";
import EvenSplitPanel from "../components/EvenSplitPanel";
import { resetStoredBill } from "../utils/localStorageUtils";
import "../styles/BillOverview.css";

// ✅ Use environment variable for API base URL
const API_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

export default function BillOverview() {
  const navigate = useNavigate();
  const { state: navState } = useLocation();
  const [bill, setBill] = useState(navState?.selectedBill || null);
  const [splitOption, setSplitOption] = useState(null);
  const [people, setPeople] = useState([]);
  const [isBillSubmitted, setIsBillSubmitted] = useState(false);
  const isLoggedIn = Boolean(localStorage.getItem("token"));
  const hasCheckedRef = useRef(false);

  useEffect(() => {
    if (!bill) {
      if (navState?.refresh) {
        navigate("/my-bills", { state: { refresh: true } });
      } else {
        navigate("/create-bill");
      }
      return;
    }

    if (!hasCheckedRef.current && isLoggedIn) {
      checkIfBillExists(bill);
      hasCheckedRef.current = true;
    }
  }, [bill, navigate, navState, isLoggedIn]);

  const checkIfBillExists = async (billObj) => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("Guest mode: No token, skipping bill existence check.");
      return;
    }
    try {
      const response = await fetch(`${API_URL}/api/bills/check`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ event_name: billObj.event, event_date: billObj.eventDate }),
      });
      const data = await response.json();
      if (response.ok && data.exists) {
        setBill(data.bill);
        setIsBillSubmitted(true);
      }
    } catch (error) {
      console.error("🔴 Error checking bill existence:", error);
    }
  };

  const handleAddBill = async () => {
    if (!isLoggedIn) {
      window.alert("Please log in to use this feature.");
      return false;
    }
    if (!bill?.event || !bill.eventDate || !bill.items?.length) {
      window.alert("Please enter event details and add at least one item.");
      return false;
    }
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/api/bills/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
        body: JSON.stringify({
          event_name: bill.event,
          event_date: bill.eventDate,
          items: bill.items.map(({ name, price, quantity }) => ({
            item: name,
            price,
            quantity,
          })),
        }),
      });

      if (response.ok) {
        setIsBillSubmitted(true);
        window.alert("✅ Bill added successfully!");
        return true;
      } else {
        const errorData = await response.json();
        window.alert(`❌ Error adding bill: ${errorData.message || "Internal Server Error"}`);
        return false;
      }
    } catch (error) {
      console.error("🔴 API error:", error);
      window.alert("❌ Failed to add bill.");
      return false;
    }
  };

  const handleDeleteBill = () => {
    if (!isLoggedIn) {
      window.alert("Please log in to use this feature.");
      return;
    }
    if (window.confirm("Are you sure you want to delete this bill?")) {
      resetStoredBill();
      setBill(null);
      setIsBillSubmitted(false);
      navigate("/my-bills", { state: { refresh: true } });
    }
  };

  if (!bill) {
    return <div>Loading bill...</div>;
  }

  return (
    <>
      <h1 className="overview-heading">Overview</h1>
      <div className="bill-overview-container">
        <div className="bill-overview-content">
          <div className="bill-overview-panel">
            <h2>{bill.event}</h2>
            <h3>{new Date(bill.eventDate).toLocaleDateString()}</h3>
            <ItemList items={bill.items} hideButtons={true} />
            <h3>Total: ${bill.items.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)}</h3>
          </div>
          <div className="bill-overview-action-container">
            {splitOption === "equal" ? (
              <EvenSplitPanel
                total={bill.items.reduce((sum, item) => sum + item.price * item.quantity, 0)}
                setPeople={setPeople}
                onDone={handleDoneSplit}
                onCancel={() => setSplitOption(null)}
              />
            ) : (
              <ActionPanel
                editBill={() => navigate("/create-bill", { state: { editedBill: bill } })}
                handleSplitOption={setSplitOption}
                handleAddBill={handleAddBill}
                handleDeleteBill={handleDeleteBill}
                isBillSubmitted={isBillSubmitted}
                setBill={setBill}
                billId={bill._id}
                isLoggedIn={isLoggedIn}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
