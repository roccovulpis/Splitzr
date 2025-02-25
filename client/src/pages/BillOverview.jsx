import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ItemList from "../components/ItemList";
import ActionPanel from "../components/ActionPanel";
import EvenSplitPanel from "../components/EvenSplitPanel";
import { loadBillFromStorage, saveBillToStorage, resetStoredBill } from "../utils/localStorageUtils";
import "../styles/BillOverview.css";

const API_BASE_URL = import.meta.env.VITE_API_URL;

export default function BillOverview() {
  const navigate = useNavigate();
  const [bill, setBill] = useState(null);
  const [splitOption, setSplitOption] = useState(null);
  const [people, setPeople] = useState([]);
  const [isBillSubmitted, setIsBillSubmitted] = useState(false);

  useEffect(() => {
    const savedBill = loadBillFromStorage();
    if (savedBill) {
      // Check if required fields are missing
      if (!savedBill.event || !savedBill.eventDate || !savedBill.items || savedBill.items.length < 1) {
        window.alert(
          "Bill is missing required details. Please ensure you have entered an event name, selected an event date, and added at least one item."
        );
        navigate("/create-bill");
        return;
      }
      setBill(savedBill);
      checkIfBillExists(savedBill);
    } else {
      navigate("/create-bill");
    }
  }, [navigate]);

  const checkIfBillExists = async (bill) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        window.alert("You are not logged in. Please log in and try again.");
        navigate("/login");
        return;
      }
      const response = await fetch(`${API_BASE_URL}/bills/check`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ event_name: bill.event, event_date: bill.eventDate }),
      });
      const data = await response.json();
      if (response.ok && data.exists) {
        setIsBillSubmitted(true);
      }
    } catch (error) {
      console.error("Error checking bill existence:", error);
    }
  };

  const editBill = () => {
    setBill((prev) => ({ ...prev, isBillSubmitted: false }));
    navigate("/create-bill");
  };

  const handleSplitOption = (option) => {
    setSplitOption(option);
  };

  const handleCancelSplit = () => {
    setSplitOption(null);
  };

  const handleDoneSplit = (splitData) => {
    setPeople(splitData);
    setSplitOption(null);
  };

  const handleAddBill = async () => {
    if (!bill || !bill.event || !bill.eventDate || !bill.items || bill.items.length < 1) {
      window.alert("Please enter event details and add at least one item before adding the bill.");
      return false;
    }
  
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        window.alert("You are not logged in. Please log in and try again.");
        return false;
      }
  
      const response = await fetch(`${API_BASE_URL}/bills/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
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
        window.alert("Bill added successfully!");
        return true;
      } else {
        const errorData = await response.json();
        window.alert(`Error adding bill: ${errorData.message || "Unauthorized"}`);
        return false;
      }
    } catch (error) {
      window.alert("Failed to add bill.");
      console.error("API error:", error);
      return false;
    }
  };

  const handleDeleteBill = () => {
    if (window.confirm("Are you sure you want to delete this bill?")) {
      resetStoredBill();
      setBill(null);
      setIsBillSubmitted(false);
      setTimeout(() => {
        navigate("/create-bill");
      }, 100);
    }
  };

  return (
    <>
      <h1 className="overview-heading">Overview</h1>
      <div className="bill-overview-container">
      {bill ? (
        <div className="bill-overview-content">
          <div className="bill-overview-panel">
            <h2>{bill.event}</h2>
            <h3>{bill.eventDate}</h3>
            <ItemList items={bill.items} hideButtons={true} />
            <h3>
              Total: ${bill.items.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)}
            </h3>
          </div>
          <div className="bill-overview-action-container">
            {splitOption === "equal" ? (
              <EvenSplitPanel
                total={bill.items.reduce((sum, item) => sum + item.price * item.quantity, 0)}
                setPeople={setPeople}
                onDone={handleDoneSplit}
                onCancel={handleCancelSplit}
              />
            ) : (
              bill.isConfirmed && (
                <ActionPanel
                  editBill={editBill}
                  handleSplitOption={handleSplitOption}
                  handleAddBill={handleAddBill}
                  handleDeleteBill={handleDeleteBill}
                  isBillSubmitted={isBillSubmitted}
                  setBill={setBill}
                />
              )
            )}
          </div>
        </div>
      ) : (
        <h2>No submitted bills found.</h2>
      )}
    </div>
    </>
    
  );
}
