import React, { useState, useEffect } from "react";
import EventDetails from "./EventDetails";
import ItemInput from "./ItemInput";
import ItemList from "./ItemList";
import ActionPanel from "./ActionPanel";
import SplitPanel from "./SplitPanel";
import AddBillButton from "./AddBillBtn";
import EvenSplitPanel from "./EvenSplitPanel";
import "../styles/BillForm.css";

const API_BASE_URL = import.meta.env.VITE_API_URL; // Load API URL from .env

export default function BillForm() {
  const [event, setEvent] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState("");
  const [itemPrice, setItemPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [total, setTotal] = useState(0);
  const [isEditingEvent, setIsEditingEvent] = useState(true);
  const [editingIndex, setEditingIndex] = useState(null);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [splitOption, setSplitOption] = useState(null);
  const [people, setPeople] = useState([{ name: "", amount: 0 }]);
  const [isBillSubmitted, setIsBillSubmitted] = useState(false); // ✅ New state for tracking submission

  // Calculate total price whenever items update
  useEffect(() => {
    setTotal(items.reduce((sum, item) => sum + item.price, 0));
  }, [items]);

  function addItem() {
    const unitPrice = parseFloat(itemPrice) || 0;
    const qty = parseInt(quantity, 10) || 0;

    if (newItem.trim() !== "" && unitPrice > 0 && qty > 0) {
      if (editingIndex !== null) {
        setItems((prevItems) =>
          prevItems.map((item, index) =>
            index === editingIndex
              ? { ...item, name: newItem, unitPrice, price: unitPrice * qty, quantity: qty }
              : item
          )
        );
        setEditingIndex(null);
      } else {
        setItems([...items, { name: newItem, unitPrice, price: unitPrice * qty, quantity: qty }]);
      }
      resetInputs();
    }
  }

  function removeItem(index) {
    setItems(items.filter((_, i) => i !== index));
  }

  function startEditItem(index) {
    const item = items[index];
    setNewItem(item.name);
    setItemPrice(item.unitPrice.toString());
    setQuantity(item.quantity.toString());
    setEditingIndex(index);
  }

  function cancelEdit() {
    setEditingIndex(null);
    resetInputs();
  }

  function resetInputs() {
    setNewItem("");
    setItemPrice("");
    setQuantity("");
  }

  function confirmBill() {
    setIsConfirmed(true);
    setIsEditingEvent(false);
  }

  function editBill() {
    setIsConfirmed(false);
    setSplitOption(null);
    setIsEditingEvent(true);
    setIsBillSubmitted(false); // ✅ Reset submission state when editing
  }

  function handleSplitOption(option) {
    setSplitOption(option);
  }

  async function handleAddBill() {
    if (!event || !eventDate || items.length === 0) {
      alert("Please enter event details and at least one item before adding the bill.");
      return;
    }

    const billData = {
      event_name: event,
      event_date: eventDate,
      items: items.map(({ name, unitPrice, quantity }) => ({
        item: name,
        price: unitPrice,
        quantity,
      })),
    };

    console.log("Submitting Bill:", billData);
    console.log("Using API URL:", API_BASE_URL); // Debugging check

    try {
      const response = await fetch(`${API_BASE_URL}/bills/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(billData),
      });

      const data = await response.json();
      if (response.ok) {
        console.log("Bill added successfully:", data);
        alert("Bill added successfully!");
        setIsBillSubmitted(true); // ✅ Hide button after successful submission
      } else {
        console.error("Error:", data.message);
        alert("Error adding bill: " + data.message);
      }
    } catch (error) {
      console.error("Request error:", error);
      alert("Failed to add bill. Please try again.");
    }
  }

  return (
    <div className={`bill-container ${isConfirmed ? "confirmed" : ""}`}>
      {/* Left Panel */}
      <div className={`bill-panel ${isConfirmed ? "shrunk" : ""}`}>
        <EventDetails
          event={event}
          eventDate={eventDate}
          setEvent={setEvent}
          setEventDate={setEventDate}
          isEditing={isEditingEvent && !isConfirmed}
          setIsEditing={setIsEditingEvent}
          isConfirmed={isConfirmed}
        />

        {!isConfirmed ? (
          <>
            <ItemInput
              newItem={newItem}
              itemPrice={itemPrice}
              quantity={quantity}
              editingIndex={editingIndex}
              handleItemInputChange={(e) => setNewItem(e.target.value)}
              handlePriceInputChange={(e) => setItemPrice(e.target.value)}
              handleQuantityInputChange={(e) => setQuantity(e.target.value)}
              addItem={addItem}
              cancelEdit={cancelEdit}
            />
            <ItemList items={items} startEditItem={startEditItem} removeItem={removeItem} />
            <h3 className="total-display">Total: ${total.toFixed(2)}</h3>
            <button className="bill-confirm-btn" onClick={confirmBill}>
              Confirm Bill
            </button>
          </>
        ) : (
          <div className="confirmed-items">
            <h3>Items:</h3>
            <ItemList items={items} startEditItem={() => {}} removeItem={() => {}} hideButtons={true} />
            <h3>Total: ${total}</h3>

            {!isBillSubmitted && <AddBillButton onClick={handleAddBill} />} {/* ✅ Hide button after submission */}
          </div>
        )}
      </div>

      {/* Right Panel - Handles split options */}
      {isConfirmed && (
        <div className="right-panel">
          {!splitOption && <ActionPanel editBill={editBill} handleSplitOption={handleSplitOption} />}

          {splitOption === "equal" && <EvenSplitPanel total={total} setPeople={setPeople} setSplitOption={setSplitOption} />}

          {splitOption === "custom" && <SplitPanel people={people} handlePersonChange={() => {}} addPerson={() => {}} />}
        </div>
      )}
    </div>
  );
}
