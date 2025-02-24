import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ItemList from "../components/ItemList";
import ActionPanel from "../components/ActionPanel";
import EvenSplitPanel from "../components/EvenSplitPanel";
import "../styles/BillOverview.css";

const API_BASE_URL = import.meta.env.VITE_API_URL;

export default function BillOverview() {
  const navigate = useNavigate();
  const [bill, setBill] = useState(null);
  const [splitOption, setSplitOption] = useState(null);
  const [people, setPeople] = useState([]);

  useEffect(() => {
    const savedBill = JSON.parse(localStorage.getItem("billFormState"));
    if (savedBill) {
      setBill(savedBill);
    } else {
      navigate("/create-bill");
    }
  }, [navigate]);

  const editBill = () => {
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
    if (!bill || !bill.event || !bill.eventDate || bill.items.length === 0) {
      alert("Please enter event details and at least one item before adding the bill.");
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/bills/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          event_name: bill.event,
          event_date: bill.eventDate,
          items: bill.items.map(({ name, unitPrice, quantity }) => ({
            item: name,
            price: unitPrice,
            quantity,
          })),
        }),
      });

      if (response.ok) {
        setBill((prevBill) => ({ ...prevBill, isBillSubmitted: true }));
        localStorage.setItem("billFormState", JSON.stringify({ ...bill, isBillSubmitted: true }));
        alert("Bill added successfully!");
      } else {
        alert("Error adding bill.");
      }
    } catch (error) {
      alert("Failed to add bill.");
    }
  };

  const handleDeleteBill = () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this bill?");
    if (confirmDelete) {
      localStorage.removeItem("billFormState");
      setBill(null);
      navigate("/create-bill");
    }
  };

  return (
    <div className="bill-overview-container">
      {bill ? (
        <div className="bill-overview-content">
          <div className="bill-overview-panel">
            <h2>{bill.event}</h2>
            <h3>{bill.eventDate}</h3>
            <ItemList items={bill.items} hideButtons={true} />
            <h3>Total: ${bill.items.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)}</h3>
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
                  isBillSubmitted={bill.isBillSubmitted}
                />
              )
            )}
          </div>
        </div>
      ) : (
        <h2>No submitted bills found.</h2>
      )}
    </div>
  );
}
