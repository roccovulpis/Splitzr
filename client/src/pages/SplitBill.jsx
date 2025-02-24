import React from "react";
import { useLocation } from "react-router-dom";
import BillForm from "../components/BillForm";
import "../styles/SplitBill.css";

export default function SplitBill() {
  const location = useLocation();
  const selectedBill = location.state?.selectedBill || null;

  return (
    <div>
      <div id="panels-container">
        <div id="entry-panel">
          <h1>Details</h1>
          <BillForm selectedBill={selectedBill} />
        </div>
      </div>
    </div>
  );
}
