import React, { useState } from 'react';
import '../styles/EvenSplitPanel.css'; // Optional CSS file for styling

export default function EvenSplitPanel({ total, setPeople, setSplitOption }) {
  const [numPeople, setNumPeople] = useState('');

  function confirmEvenSplit() {
    if (numPeople > 0) {
      const splitAmount = total / numPeople;
      setPeople(Array.from({ length: numPeople }, () => ({ name: '', amount: splitAmount })));
      setSplitOption(null); // ✅ Return to main split options after confirming
    }
  }

  function cancelSplit() {
    setSplitOption(null); // ✅ Go back to the original panel when "Cancel" is clicked
  }

  return (
    <div className="even-split-panel">
      <h2>How many people are splitting?</h2>
      <input
        type="number"
        min="1"
        value={numPeople}
        onChange={(e) => setNumPeople(parseInt(e.target.value, 10) || '')}
        placeholder="Enter number of people"
      />
      <div className="even-split-buttons">
        <button onClick={confirmEvenSplit}>Confirm</button>
        <button className="cancel-btn" onClick={cancelSplit}>Cancel</button> {/* ✅ New Cancel Button */}
      </div>
    </div>
  );
}
