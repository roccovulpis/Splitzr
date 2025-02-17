import React from 'react';
import '../styles/ActionPanel.css';

export default function ActionPanel({ editBill, handleSplitOption }) {
  return (
    <div className="action-panel">
      <h2>Choose How to Split</h2>
      <span className='action-panel-btns'>
        <button onClick={editBill}>✏️ Edit Bill</button>
        <button onClick={() => handleSplitOption('equal')}>🔄 Split Evenly</button>
        <button onClick={() => handleSplitOption('custom')}>👥 Assign Items Manually</button>
      </span>

    </div>
  );
}
