import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import EventDetails from "./EventDetails";
import ItemInput from "./ItemInput";
import ItemList from "./ItemList";
import ActionPanel from "./ActionPanel";
import SplitPanel from "./SplitPanel";
import EvenSplitPanel from "./EvenSplitPanel";
import AddBillButton from "./buttons/AddBillButton";
import { loadBillFromStorage, saveBillToStorage, resetStoredBill } from "../utils/localStorageUtils";
import "../styles/BillForm.css";

export default function BillForm() {
  const navigate = useNavigate();
  const formRef = useRef(null);
  // Initialize state with default values if none are stored
  const [state, setState] = useState(loadBillFromStorage() || { event: "", eventDate: "", items: [] });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    saveBillToStorage(state);
  }, [state]);

  // Validate required fields and update error messages
  const validateForm = () => {
    let valid = true;
    let newErrors = {};
    if (!state.event || state.event.trim() === "") {
      newErrors.event = "Please enter an event name.";
      valid = false;
    }
    if (!state.eventDate) {
      newErrors.eventDate = "Please select an event date.";
      valid = false;
    }
    if (!state.items || state.items.length === 0) {
      newErrors.items = "Please add at least one item.";
      valid = false;
    }
    setErrors(newErrors);
    return valid;
  };

  const confirmBill = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    if (formRef.current && !formRef.current.checkValidity()) {
      formRef.current.reportValidity();
      return;
    }
    
    const newBill = {
      ...state,
      isConfirmed: true,
      isEditingEvent: false,
      isBillSubmitted: false,
    };
    setState(newBill);
    saveBillToStorage(newBill);
    navigate("/bill-overview");
  };

  const resetBill = () => {
    if (window.confirm("Are you sure you want to reset the bill?")) {
      resetStoredBill();
      setState(loadBillFromStorage() || { event: "", eventDate: "", items: [] });
      setErrors({});
    }
  };

  return (
    <form
      className={`bill-container ${state.isConfirmed ? "confirmed" : ""}`}
      ref={formRef}
      onSubmit={confirmBill}
      noValidate
    >
      <div className={`bill-panel ${state.isConfirmed ? "shrunk" : ""}`}>
        <EventDetails
          event={state.event}
          eventDate={state.eventDate}
          setState={setState}
          isEditing={state.isEditingEvent}
          isConfirmed={state.isConfirmed}
        />
        {/* Display error messages for event details */}
        {errors.event && <p className="error">{errors.event}</p>}
        {errors.eventDate && <p className="error">{errors.eventDate}</p>}

        {!state.isConfirmed ? (
          <>
            <ItemInput state={state} setState={setState} />
            <ItemList items={state.items} setState={setState} />
            {/* Display error message for items */}
            {errors.items && <p className="error">{errors.items}</p>}
            <h3 className="total-display">
              Total: ${state.items.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)}
            </h3>
            <div className="bill-panel-btns">
              <button type="submit" className="bill-confirm-btn">
                Confirm Bill
              </button>
              <button type="button" className="reset-bill-btn" onClick={resetBill}>
                Reset Bill
              </button>
            </div>
          </>
        ) : (
          <div className="confirmed-items">
            <h3>Items:</h3>
            <ItemList items={state.items} hideButtons={true} />
            <h3>
              Total: ${state.items.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)}
            </h3>
            {!state.isBillSubmitted && <AddBillButton onClick={() => navigate("/bill-overview")} />}
          </div>
        )}
      </div>

      {state.isConfirmed && (
        <div className="right-panel">
          {!state.splitOption && <ActionPanel state={state} setState={setState} />}
          {state.splitOption === "equal" && <EvenSplitPanel state={state} setState={setState} />}
          {state.splitOption === "custom" && <SplitPanel people={state.people} />}
        </div>
      )}
    </form>
  );
}
