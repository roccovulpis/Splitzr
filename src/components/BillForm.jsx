import React, { useState } from 'react';
import '../styles/BillForm.css';

export default function BillForm() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');
  const [itemPrice, setItemPrice] = useState();
  const [quantity, setQuantity] = useState();

  function handleItemInputChange(event) {
    setNewItem(event.target.value);
  }

  function handlePriceInputChange(event) {
    setItemPrice(event.target.value);
  }

  function handleQuantityInputChange(event) {
    setQuantity(event.target.value);
  }

  function addItem() {
    if (newItem.trim() !== '') {
      setItems((prevItems) => [
        ...prevItems,
        { name: newItem, price: itemPrice, quantity: quantity },
      ]);
      setNewItem('');
      setItemPrice('');
      setQuantity('');
    }
  }

  function updateQuantity(index, value) {
    setItems((prevItems) =>
      prevItems.map((item, i) =>
        i === index ? { ...item, quantity: value } : item
      )
    );
  }

  function updatePrice(index, value) {
    setItems((prevItems) =>
      prevItems.map((item, i) =>
        i === index ? { ...item, price: value } : item
      )
    );
  }

  function removeItem(index) {
    setItems((prevItems) => prevItems.filter((_, i) => i !== index));
  }

  return (
    <div className="event-form-container">
      <div className="event-details-container">
        <input type="text" id="event-name" placeholder="Event Name" />
        <input type="date" id="date" placeholder="date" />
      </div>

      <div className="event-items-container">
        <input
          id="item-input"
          type="text"
          placeholder="Item"
          value={newItem}
          onChange={handleItemInputChange}
        />
        <input
          id="price-input"
          type="number"
          placeholder="Price"
          value={itemPrice}
          onChange={handlePriceInputChange}
        />
        <input
          id="quantity-input"
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={handleQuantityInputChange}
        />
        <button className="add-btn" onClick={addItem}>
          ✔️
        </button>
      </div>

      <ol>
        {items.map((item, index) => (
          <li key={index}>
            <span className="text">
            {item.quantity} x {item.name} - ${item.price}
            </span>
            <input
              type="number"
              placeholder="Quantity"
              value={item.quantity}
              onChange={(e) => updateQuantity(index, e.target.value)}
            />
            <input
              type="number"
              placeholder="Price"
              value={item.price}
              onChange={(e) => updatePrice(index, e.target.value)}
            />
            <button
              className="remove-btn"
              onClick={() => removeItem(index)}
            >
              ❌
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}
