import React from 'react';
import '../styles/SplitPanel.css';

export default function SplitPanel({ people, handlePersonChange, addPerson }) {
  return (
    <div className="split-panel visible">
      <h2>Assign Items to People</h2>
      {people.map((p, index) => (
        <div key={index} className="person-entry">
          <input
            type="text"
            placeholder="Name"
            value={p.name}
            onChange={(e) => handlePersonChange(index, 'name', e.target.value)}
          />
          <input
            type="number"
            placeholder="Amount"
            value={p.amount}
            onChange={(e) => handlePersonChange(index, 'amount', e.target.value)}
          />
        </div>
      ))}
      <button onClick={addPerson}>➕ Add Person</button>
    </div>
  );
}
