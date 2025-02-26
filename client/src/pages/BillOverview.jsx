import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ItemList from "../components/ItemList";
import ActionPanel from "../components/ActionPanel";
import EvenSplitPanel from "../components/EvenSplitPanel";
import { loadBillFromStorage, resetStoredBill } from "../utils/localStorageUtils";
import "../styles/BillOverview.css";

const API_BASE_URL = import.meta.env.VITE_API_URL;

export default function BillOverview() {
  const navigate = useNavigate();
  const { state: navState } = useLocation();
  const [bill, setBill] = useState(navState?.selectedBill || null);
  const [splitOption, setSplitOption] = useState(null);
  const [people, setPeople] = useState([]);
  const [isBillSubmitted, setIsBillSubmitted] = useState(false);

  // Ref to prevent infinite loop on checkIfBillExists
  const hasCheckedRef = useRef(false);

  // Normalization function: map backend keys to expected keys.
  const normalizeBill = (billObj) => {
    return {
      ...billObj,
      event: billObj.event || billObj.event_name || "",
      eventDate: billObj.eventDate || billObj.event_date || "",
    };
  };

  useEffect(() => {
    if (!bill) {
      // No bill loaded.
      // If coming from a deletion (refresh flag passed), navigate to My Bills.
      if (navState && navState.refresh) {
        navigate("/my-bills", { state: { refresh: true } });
      } else {
        navigate("/create-bill");
      }
      return;
    }
    // Normalize the bill
    const normalized = normalizeBill(bill);
    if (
      !normalized.event ||
      !normalized.eventDate ||
      !normalized.items ||
      normalized.items.length < 1
    ) {
      window.alert(
        "Bill is missing required details. Please ensure you have entered an event name, selected an event date, and added at least one item."
      );
      navigate("/create-bill");
      return;
    }
    // Only update state if normalization changes something.
    if (
      normalized.event !== bill.event ||
      normalized.eventDate !== bill.eventDate
    ) {
      setBill(normalized);
      return;
    }
    // Call checkIfBillExists only once per bill.
    if (!hasCheckedRef.current) {
      checkIfBillExists(normalized);
      hasCheckedRef.current = true;
    }
  }, [bill, navigate, navState]);

  const checkIfBillExists = async (billObj) => {
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
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          event_name: billObj.event,
          event_date: billObj.eventDate,
        }),
      });
      const data = await response.json();
      if (response.ok && data.exists) {
        if (data.bill) {
          console.log("Bill exists. Updating state with saved bill:", data.bill);
          setBill(normalizeBill(data.bill));
        }
        setIsBillSubmitted(true);
      }
    } catch (error) {
      console.error("Error checking bill existence:", error);
    }
  };

  const editBill = () => {
    const updatedBill = { ...bill, isBillSubmitted: false };
    localStorage.setItem("bill", JSON.stringify(updatedBill));
    setBill(updatedBill);
    navigate("/create-bill", { state: { editedBill: updatedBill } });
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
    if (
      !bill ||
      !bill.event ||
      !bill.eventDate ||
      !bill.items ||
      bill.items.length < 1
    ) {
      window.alert(
        "Please enter event details and add at least one item before adding the bill."
      );
      return false;
    }
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        window.alert("You are not logged in. Please log in and try again.");
        return false;
      }
      const payload = {
        event_name: bill.event,
        event_date: bill.eventDate,
        items: bill.items.map(({ name, price, quantity }) => ({
          item: name,
          price,
          quantity,
        })),
      };
      console.log("Sending payload:", payload);
      const response = await fetch(`${API_BASE_URL}/bills/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
      if (response.ok) {
        setIsBillSubmitted(true);
        window.alert("Bill added successfully!");
        return true;
      } else {
        const errorData = await response.json();
        console.error("Error response from API:", errorData);
        window.alert(
          `Error adding bill: ${errorData.message || "Internal Server Error"}`
        );
        return false;
      }
    } catch (error) {
      console.error("API error:", error);
      window.alert("Failed to add bill.");
      return false;
    }
  };

  const handleDeleteBill = () => {
    if (window.confirm("Are you sure you want to delete this bill?")) {
      resetStoredBill();
      setBill(null);
      setIsBillSubmitted(false);
      // Navigate to My Bills after deletion.
      setTimeout(() => {
        navigate("/my-bills", { state: { refresh: true } });
      }, 100);
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
            <h3>{bill.eventDate}</h3>
            <ItemList items={bill.items} hideButtons={true} />
            <h3>
              Total: $
              {bill.items
                .reduce((sum, item) => sum + item.price * item.quantity, 0)
                .toFixed(2)}
            </h3>
          </div>
          <div className="bill-overview-action-container">
            {splitOption === "equal" ? (
              <EvenSplitPanel
                total={bill.items.reduce(
                  (sum, item) => sum + item.price * item.quantity,
                  0
                )}
                setPeople={setPeople}
                onDone={handleDoneSplit}
                onCancel={handleCancelSplit}
              />
            ) : (
              <ActionPanel
                editBill={editBill}
                handleSplitOption={handleSplitOption}
                handleAddBill={handleAddBill}
                handleDeleteBill={handleDeleteBill}
                isBillSubmitted={isBillSubmitted}
                setBill={setBill}
                billId={bill._id}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
