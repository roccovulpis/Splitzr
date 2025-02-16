import React from 'react';
import '../styles/ItemList.css';

export default function ItemList({ items, startEditItem, removeItem }) {
  return (
    <ol className="added-items">
      {items.map((item, index) => (
        <li key={index} className="added-list-items">
          <div className="text">
            <span>{item.quantity} x</span>
            <span>{item.name}</span>
            <span className="added-item-price">${item.price.toFixed(2)}</span>
          </div>
          <button className="added-item-edit-btn" onClick={() => startEditItem(index)}>✏️</button>
          <button className="remove-btn" onClick={() => removeItem(index)}>❌</button>
        </li>
      ))}
    </ol>
  );
}
