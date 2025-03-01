import React, { useState } from 'react';
import '../styles/EvenSplitPanel.css';

export default function EvenSplitPanel({ total, setPeople, onDone, onCancel }) {
  const [numPeople, setNumPeople] = useState('');
  const [splitAmounts, setSplitAmounts] = useState([]);
  const [isConfirmed, setIsConfirmed] = useState(false);

  function confirmEvenSplit() {
    if (numPeople > 0) {
      const splitAmount = (total / numPeople).toFixed(2);
      const newPeople = Array.from({ length: numPeople }, (_, i) => ({
        name: `Person ${i + 1}`,
        amount: splitAmount,
      }));
      setPeople(newPeople);
      setSplitAmounts(newPeople);
      setIsConfirmed(true);
    }
  }

  function editAmount() {
    setIsConfirmed(false);
    setSplitAmounts([]);
    setNumPeople('');
  }

  function handleCancel() {
    console.log("Cancel button clicked");
    if (onCancel) {
      onCancel();
    }
  }

  function handleDone() {
    console.log("Done button clicked, people:", splitAmounts);
    if (onDone) {
      onDone(splitAmounts);
    }
  }

  return (
    <div className={`even-split-panel ${isConfirmed ? 'expanded' : ''}`}>
      <h2>Even Split</h2>

      {!isConfirmed ? (
        <>
          <h3>How many people are splitting?</h3>
          <input
            type="number"
            min="1"
            value={numPeople}
            onChange={(e) => setNumPeople(parseInt(e.target.value, 10) || '')}
            placeholder="Enter number of people"
          />
          <div className="even-split-buttons">
            <button onClick={confirmEvenSplit}>Confirm</button>
            <button className="cancel-btn" onClick={handleCancel}>Cancel</button>
          </div>
        </>
      ) : (
        <>
          <div className="split-results">
            {splitAmounts.map((person, index) => (
              <p key={index}>{person.name}: ${person.amount}</p>
            ))}
          </div>
          <div>
            <button onClick={editAmount}>Edit</button>
            <button onClick={handleDone}>Done</button>
          </div>
        </>
      )}
    </div>
  );
}
