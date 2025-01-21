import React, { useState } from 'react';
import '../styles/BillForm.css';

export default function BillForm() {
  const [event, setEvent] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');
  const [itemPrice, setItemPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [total, setTotal] = useState(0);
  const [isEditingEvent, setIsEditingEvent] = useState(true); // Track if the event is being edited

  function handleEventInputChange(event) {
    setEvent(event.target.value);
  }

  function handleEventDateInputChange(event) {
    setEventDate(event.target.value);
  }

  function handleItemInputChange(event) {
    setNewItem(event.target.value);
  }

  function handlePriceInputChange(event) {
    setItemPrice(event.target.value);
  }

  function handleQuantityInputChange(event) {
    setQuantity(event.target.value);
  }

  function addEvent() {
    if (event.trim() !== '' && eventDate.trim() !== '') {
      setIsEditingEvent(false); // Hide input fields
    }
  }

  function editEvent() {
    setIsEditingEvent(true); // Show input fields for editing
  }

  function addItem() {
    if (newItem.trim() !== '') {
      const price = parseFloat(itemPrice) || 0;
      const qty = parseInt(quantity, 10) || 0;

      setItems((prevItems) => [
        ...prevItems,
        { name: newItem, price, quantity: qty },
      ]);

      setTotal((prevTotal) => prevTotal + price * qty);
      setNewItem('');
      setItemPrice('');
      setQuantity('');
    }
  }

  function updateQuantity(index, value) {
    setItems((prevItems) =>
      prevItems.map((item, i) =>
        i === index ? { ...item, quantity: parseInt(value, 10) || 0 } : item
      )
    );
  }

  function updatePrice(index, value) {
    setItems((prevItems) =>
      prevItems.map((item, i) =>
        i === index ? { ...item, price: parseFloat(value) || 0 } : item
      )
    );
  }

  function removeItem(index) {
    const removedItem = items[index];
    setTotal((prevTotal) => prevTotal - removedItem.price * removedItem.quantity);
    setItems((prevItems) => prevItems.filter((_, i) => i !== index));
  }

  return (
    <div className="event-form-container">
      {/* Event Details */}
      {isEditingEvent ? (
        <div className="event-details-container">
          <input
            type="text"
            id="event-name"
            placeholder="Event Name"
            value={event}
            onChange={handleEventInputChange}
          />
          <input
            type="date"
            id="date"
            value={eventDate}
            onChange={handleEventDateInputChange}
          />
          <button className="add-btn" onClick={addEvent}>
            ✔️
          </button>
        </div>
      ) : (
        <div className="event-summary">
          <h2>
            Event: {event} (Date: {eventDate})
          </h2>
          <button className="event-edit-btn" onClick={editEvent}>
            ✏️
          </button>
        </div>
      )}

      {/* Item Details */}
      <div className="event-items-container">
        <input
          className="item-input"
          type="text"
          placeholder="Item"
          value={newItem}
          onChange={handleItemInputChange}
        />
        <input
          className="price-input"
          type="number"
          placeholder="Price"
          value={itemPrice}
          onChange={handlePriceInputChange}
        />
        <input
          className="quantity-input"
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={handleQuantityInputChange}
        />
        <button className="add-btn" onClick={addItem}>
          ✔️
        </button>
      </div>

      {/* Display Items */}
      <ol className="added-items">
        {items.map((item, index) => (
          <li key={index} className='added-list-items'>
            <span className="text">
              <input
                className='added-items-quant-input'
                type="number"
                placeholder="Quantity"
                value={item.quantity}
                onChange={(e) => updateQuantity(index, e.target.value)}
              />
               {item.name} - ${item.price}
            </span>
            <input
              className='added-items-price-input'
              type="number"
              placeholder="Price"
              value={item.price * item.quantity}
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

      {/* Display Total */}
      <h3 className="total-display">Total: ${total}</h3>
    </div>
  );
}
