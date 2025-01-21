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
  const [isEditingEvent, setIsEditingEvent] = useState(true);
  const [editingIndex, setEditingIndex] = useState(null);

  // Event Handlers
  function handleEventInputChange(event) {
    setEvent(event.target.value);
  }

  function handleEventDateInputChange(event) {
    setEventDate(event.target.value);
  }

  // Item Input Handlers
  function handleItemInputChange(event) {
    setNewItem(event.target.value);
  }

  function handlePriceInputChange(event) {
    setItemPrice(event.target.value);
  }

  function handleQuantityInputChange(event) {
    setQuantity(event.target.value);
  }

  // Add or Update Item
  function addItem() {
    const unitPrice = parseFloat(itemPrice) || 0;
    const qty = parseInt(quantity, 10) || 0;

    if (newItem.trim() !== '' && unitPrice > 0 && qty > 0) {
      if (editingIndex !== null) {
        // Update the existing item
        setItems((prevItems) =>
          prevItems.map((item, index) =>
            index === editingIndex
              ? { ...item, name: newItem, unitPrice, price: unitPrice * qty, quantity: qty }
              : item
          )
        );
        setEditingIndex(null); // Exit edit mode
      } else {
        // Add a new item
        const newItemObject = {
          name: newItem,
          unitPrice,
          price: unitPrice * qty,
          quantity: qty,
        };
        setItems((prevItems) => [...prevItems, newItemObject]);
      }

      resetInputs(); // Reset input fields
    }
  }

  // Update Total after items state changes
  React.useEffect(() => {
    const newTotal = items.reduce((sum, item) => sum + item.price, 0);
    setTotal(newTotal);
  }, [items]);

  // Start Editing an Item
  function startEditItem(index) {
    const itemToEdit = items[index];
    setNewItem(itemToEdit.name);
    setItemPrice(itemToEdit.unitPrice.toFixed(2));
    setQuantity(itemToEdit.quantity);
    setEditingIndex(index);
  }

  // Cancel Editing Mode
  function cancelEdit() {
    resetInputs();
    setEditingIndex(null);
  }

  // Remove an Item
  function removeItem(index) {
    setItems((prevItems) => prevItems.filter((_, i) => i !== index));
  }

  // Reset Input Fields
  function resetInputs() {
    setNewItem('');
    setItemPrice('');
    setQuantity('');
  }

  return (
    <div className="event-form-container">
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
          <button className="add-btn" onClick={() => setIsEditingEvent(false)}>
            ✔️
          </button>
        </div>
      ) : (
        <div className="event-summary">
          <h2>
            Event: {event} (Date: {eventDate})
          </h2>
          <button className="event-edit-btn" onClick={() => setIsEditingEvent(true)}>
            ✏️
          </button>
        </div>
      )}

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
          {editingIndex !== null ? 'Update' : 'Add'}
        </button>
        {editingIndex !== null && (
          <button className="cancel-btn" onClick={cancelEdit}>
            Cancel
          </button>
        )}
      </div>

      {/* Hide the list when editingIndex is not null */}
      {editingIndex === null && (
        <ol className="added-items">
          {items.map((item, index) => (
            <li key={index} className="added-list-items">
              <div className="text">
                <span>{item.quantity} x</span>
                <span>{item.name}</span>
                <span className="added-item-price">${item.price.toFixed(2)}</span>
              </div>
              <button className="added-item-edit-btn" onClick={() => startEditItem(index)}>
                ✏️
              </button>
              <button className="remove-btn" onClick={() => removeItem(index)}>
                ❌
              </button>
            </li>
          ))}
        </ol>
      )}

      <h3 className="total-display">Total: ${total.toFixed(2)}</h3>
    </div>
  );
}
