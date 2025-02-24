import React, { useState, useEffect } from "react";
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

  // Load from local storage or set defaults
  const [state, setState] = useState(loadBillFromStorage());

  useEffect(() => {
    saveBillToStorage(state);
  }, [state]);

  const confirmBill = () => {
    const newBill = {
      ...state,
      isConfirmed: true,
      isEditingEvent: false,
      isBillSubmitted: false, // Reset for new submission
    };
    setState(newBill);
    saveBillToStorage(newBill);
    navigate("/bill-overview"); // Redirect to overview after confirming
  };

  const resetBill = () => {
    if (window.confirm("Are you sure you want to reset the bill?")) {
      resetStoredBill();
      setState(loadBillFromStorage());
    }
  };

  return (
    <div className={`bill-container ${state.isConfirmed ? "confirmed" : ""}`}>
      <div className={`bill-panel ${state.isConfirmed ? "shrunk" : ""}`}>
        <EventDetails
          event={state.event}
          eventDate={state.eventDate}
          setState={setState}
          isEditing={state.isEditingEvent}
          isConfirmed={state.isConfirmed}
        />

        {!state.isConfirmed ? (
          <>
            <ItemInput state={state} setState={setState} />
            <ItemList items={state.items} setState={setState} />
            <h3 className="total-display">Total: ${state.items.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)}</h3>
            <div className="bill-panel-btns">
              <button className="bill-confirm-btn" onClick={confirmBill}>Confirm Bill</button>
              <button className="reset-bill-btn" onClick={resetBill}>Reset Bill</button>
            </div>
          </>
        ) : (
          <div className="confirmed-items">
            <h3>Items:</h3>
            <ItemList items={state.items} hideButtons={true} />
            <h3>Total: ${state.items.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)}</h3>
            {!state.isBillSubmitted && <AddBillButton state={state} setState={setState} />}
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
    </div>
  );
}
