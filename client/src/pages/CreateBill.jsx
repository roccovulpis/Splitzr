import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import EventDetails from "../components/EventDetails";
import ItemInput from "../components/ItemInput";
import ItemList from "../components/ItemList";
import "../styles/BillForm.css";
import "../styles/CreateBill.css";

export default function CreateBill() {
  const navigate = useNavigate();

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
      isBillSubmitted: false,
    };
  };

  const [state, setState] = useState(getInitialState());

  useEffect(() => {
    localStorage.setItem("billFormState", JSON.stringify(state));
  }, [state]);

  const confirmBill = () => {
    setState((prevState) => ({
      ...prevState,
      isConfirmed: true,
      isEditingEvent: false,
      isBillSubmitted: true,
    }));
    navigate("/bill-overview");
  };

  const resetBill = () => {
    const confirmReset = window.confirm(
      "Are you sure you want to reset the bill? This action cannot be undone."
    );
    if (confirmReset) {
      localStorage.removeItem("billFormState");
      setState({
        event: "",
        eventDate: "",
        items: [],
        newItem: "",
        itemPrice: "",
        quantity: "",
        isEditingEvent: true,
        editingIndex: null,
        isConfirmed: false,
        isBillSubmitted: false,
      });
    }
  };

  const addItem = () => {
    const unitPrice = parseFloat(state.itemPrice) || 0;
    const qty = parseInt(state.quantity, 10) || 0;

    if (state.newItem.trim() !== "" && unitPrice > 0 && qty > 0) {
      if (state.editingIndex !== null) {
        setState((prevState) => ({
          ...prevState,
          items: prevState.items.map((item, index) =>
            index === state.editingIndex
              ? { ...item, name: state.newItem, price: unitPrice, quantity: qty }
              : item
          ),
          editingIndex: null,
          newItem: "",
          itemPrice: "",
          quantity: "",
        }));
      } else {
        setState((prevState) => ({
          ...prevState,
          items: [...prevState.items, { name: state.newItem, price: unitPrice, quantity: qty }],
          newItem: "",
          itemPrice: "",
          quantity: "",
        }));
      }
    }
  };

  const removeItem = (index) => {
    setState((prevState) => ({
      ...prevState,
      items: prevState.items.filter((_, i) => i !== index),
    }));
  };

  const startEditItem = (index) => {
    const item = state.items[index];
    setState((prevState) => ({
      ...prevState,
      newItem: item.name,
      itemPrice: item.price.toString(),
      quantity: item.quantity.toString(),
      editingIndex: index,
    }));
  };

  const cancelEdit = () => {
    setState((prevState) => ({
      ...prevState,
      editingIndex: null,
      newItem: "",
      itemPrice: "",
      quantity: "",
    }));
  };

  return (
    <>
      <h1 className="create-bill-heading">Create a Bill</h1>
      <div className="bill-create-container">
      <div className="bill-create-panel">
        <EventDetails
          event={state.event}
          eventDate={state.eventDate}
          setEvent={(newEvent) => setState((prevState) => ({ ...prevState, event: newEvent }))}
          setEventDate={(newDate) => setState((prevState) => ({ ...prevState, eventDate: newDate }))}
          isEditing={state.isEditingEvent}
          setIsEditing={(isEditing) => setState((prevState) => ({ ...prevState, isEditingEvent: isEditing }))}
        />

        <ItemInput
          newItem={state.newItem}
          itemPrice={state.itemPrice}
          quantity={state.quantity}
          editingIndex={state.editingIndex}
          handleItemInputChange={(e) => setState({ ...state, newItem: e.target.value })}
          handlePriceInputChange={(e) => setState({ ...state, itemPrice: e.target.value })}
          handleQuantityInputChange={(e) => setState({ ...state, quantity: e.target.value })}
          addItem={addItem}
          cancelEdit={cancelEdit}
        />

        <ItemList items={state.items} startEditItem={startEditItem} removeItem={removeItem} />

        <h3>Total: ${state.items.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)}</h3>

        <div className="bill-panel-btns">
          <button className="bill-confirm-btn" onClick={confirmBill}>Confirm Bill</button>
          <button className="reset-bill-btn" onClick={resetBill}>Reset Bill</button>
        </div>
      </div>
    </div>
    </>
  );
}
