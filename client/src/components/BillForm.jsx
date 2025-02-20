import React, { useState, useEffect } from "react";
import EventDetails from "./EventDetails";
import ItemInput from "./ItemInput";
import ItemList from "./ItemList";
import ActionPanel from "./ActionPanel";
import SplitPanel from "./SplitPanel";
import AddBillButton from "./AddBillBtn";
import EvenSplitPanel from "./EvenSplitPanel";
import "../styles/BillForm.css";

const API_BASE_URL = import.meta.env.VITE_API_URL;

export default function BillForm() {
  /** ✅ Load state from localStorage before rendering */
  const getInitialState = () => {
    const savedState = JSON.parse(localStorage.getItem("billFormState"));
    return savedState || {
      event: "",
      eventDate: "",
      items: [],
      newItem: "",
      itemPrice: "",
      quantity: "",
      isEditingEvent: true,
      editingIndex: null,
      isConfirmed: false,
      splitOption: null,
      people: [{ name: "", amount: 0 }],
      isBillSubmitted: false,
    };
  };

  const [event, setEvent] = useState(getInitialState().event);
  const [eventDate, setEventDate] = useState(getInitialState().eventDate);
  const [items, setItems] = useState(getInitialState().items);
  const [newItem, setNewItem] = useState(getInitialState().newItem);
  const [itemPrice, setItemPrice] = useState(getInitialState().itemPrice);
  const [quantity, setQuantity] = useState(getInitialState().quantity);
  const [isEditingEvent, setIsEditingEvent] = useState(getInitialState().isEditingEvent);
  const [editingIndex, setEditingIndex] = useState(getInitialState().editingIndex);
  const [isConfirmed, setIsConfirmed] = useState(getInitialState().isConfirmed);
  const [splitOption, setSplitOption] = useState(getInitialState().splitOption);
  const [people, setPeople] = useState(getInitialState().people);
  const [isBillSubmitted, setIsBillSubmitted] = useState(getInitialState().isBillSubmitted);

  /** ✅ Save state to localStorage when changes happen */
  useEffect(() => {
    localStorage.setItem(
      "billFormState",
      JSON.stringify({
        event,
        eventDate,
        items,
        newItem,
        itemPrice,
        quantity,
        isEditingEvent,
        editingIndex,
        isConfirmed,
        splitOption,
        people,
        isBillSubmitted,
      })
    );
  }, [event, eventDate, items, newItem, itemPrice, quantity, isEditingEvent, editingIndex, isConfirmed, splitOption, people, isBillSubmitted]);

  /** ✅ Calculate total price dynamically */
  const total = items.reduce((sum, item) => sum + item.price, 0);

  function confirmBill() {
    setIsConfirmed(true);
    setIsEditingEvent(false);
  }

  function editBill() {
    setIsConfirmed(false);
    setSplitOption(null);
    setIsEditingEvent(true);
    localStorage.removeItem("billFormState");
  }

  function handleSplitOption(option) {
    setSplitOption(option);
  }

  /** ✅ Restore Add Item Function */
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
      setIsBillSubmitted(false); // ✅ Show "Add to My Bills" button again when an item is added
    }
  }

  function resetInputs() {
    setNewItem("");
    setItemPrice("");
    setQuantity("");
  }

  /** ✅ Restore Item Deletion */
  function removeItem(index) {
    setItems(items.filter((_, i) => i !== index));
  }

  /** ✅ Restore Item Editing */
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

  /** ✅ Reset Bill with Confirmation */
  function resetBill() {
    const confirmReset = window.confirm("Are you sure you want to reset the bill? This action cannot be undone.");
    if (confirmReset) {
      localStorage.removeItem("billFormState");
      setEvent("");
      setEventDate("");
      setItems([]);
      setNewItem("");
      setItemPrice("");
      setQuantity("");
      setIsEditingEvent(true);
      setEditingIndex(null);
      setIsConfirmed(false);
      setSplitOption(null);
      setPeople([{ name: "", amount: 0 }]);
      setIsBillSubmitted(false);
    }
  }

  /** ✅ Add to My Bills */
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
        alert("Bill added successfully!");
        setIsBillSubmitted(true); // ✅ Hide the "Add to My Bills" button permanently after submission
      } else {
        alert("Error adding bill: " + data.message);
      }
    } catch (error) {
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
            <div className="bill-panel-btns">
              <button className="bill-confirm-btn" onClick={confirmBill}>
                Confirm Bill
              </button>
              <button className="reset-bill-btn" onClick={resetBill}>
                Reset Bill
              </button>
            </div>
          </>
        ) : (
          <div className="confirmed-items">
            <h3>Items:</h3>
            <ItemList items={items} hideButtons={true} />
            <h3>Total: ${total.toFixed(2)}</h3>

            {!isBillSubmitted && <AddBillButton onClick={handleAddBill} />}
          </div>
        )}
      </div>

      {isConfirmed && (
        <div className="right-panel">
          {!splitOption && <ActionPanel editBill={editBill} handleSplitOption={handleSplitOption} />}
          {splitOption === "equal" && <EvenSplitPanel total={total} setPeople={setPeople} onDone={() => setSplitOption(null)} onCancel={() => setSplitOption(null)} />}
          {splitOption === "custom" && <SplitPanel people={people} />}
        </div>
      )}
    </div>
  );
}
