import React, { useState, useEffect } from 'react';
import EventDetails from './EventDetails';
import ItemInput from './ItemInput';
import ItemList from './ItemList';
import ActionPanel from './ActionPanel';
import SplitPanel from './SplitPanel';
import '../styles/BillForm.css';

export default function BillForm() {
  const [event, setEvent] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [items, setItems] = useState([]); // Holds items added
  const [newItem, setNewItem] = useState('');
  const [itemPrice, setItemPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [total, setTotal] = useState(0);
  const [isEditingEvent, setIsEditingEvent] = useState(true);
  const [editingIndex, setEditingIndex] = useState(null);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [splitOption, setSplitOption] = useState(null);
  const [people, setPeople] = useState([{ name: '', amount: 0 }]);

  useEffect(() => {
    setTotal(items.reduce((sum, item) => sum + item.price, 0));
  }, [items]);

  function addItem() {
    const unitPrice = parseFloat(itemPrice) || 0;
    const qty = parseInt(quantity, 10) || 0;

    if (newItem.trim() !== '' && unitPrice > 0 && qty > 0) {
      if (editingIndex !== null) {
        setItems((prevItems) =>
          prevItems.map((item, index) =>
            index === editingIndex
              ? { ...item, name: newItem, unitPrice, price: unitPrice * qty, quantity: qty }
              : item
          )
        );
        setEditingIndex(null);
      } else {
        setItems([...items, { name: newItem, unitPrice, price: unitPrice * qty, quantity: qty }]);
      }
      resetInputs();
    }
  }

  function removeItem(index) {
    setItems(items.filter((_, i) => i !== index));
  }

  function startEditItem(index) {
    const item = items[index];
    setNewItem(item.name);
    setItemPrice(item.unitPrice);
    setQuantity(item.quantity);
    setEditingIndex(index);
  }

  function confirmBill() {
    setIsConfirmed(true);
    setIsEditingEvent(false); // Disable editing for the event title
  }

  function editBill() {
    setIsConfirmed(false);
    setSplitOption(null);
    setIsEditingEvent(true); // Re-enable editing
  }

  function handleSplitOption(option) {
    setSplitOption(option);
    if (option === 'equal') {
      const splitAmount = total / people.length;
      setPeople(people.map((p) => ({ ...p, amount: splitAmount })));
    }
  }

  function handlePersonChange(index, field, value) {
    const updatedPeople = [...people];
    updatedPeople[index][field] = field === 'amount' ? parseFloat(value) : value;
    setPeople(updatedPeople);
  }

  function addPerson() {
    setPeople([...people, { name: '', amount: 0 }]);
  }

  function resetInputs() {
    setNewItem('');
    setItemPrice('');
    setQuantity('');
  }

  return (
    <div className={`bill-container ${isConfirmed ? 'confirmed' : ''}`}>
      {/* Left Panel - Keeps event name & items */}
      <div className={`bill-panel ${isConfirmed ? 'shrunk' : ''}`}>
        <EventDetails
          event={event}
          eventDate={eventDate}
          setEvent={setEvent}
          setEventDate={setEventDate}
          isEditing={isEditingEvent && !isConfirmed}
          setIsEditing={setIsEditingEvent}
          isConfirmed={isConfirmed}
        />

        {/* ✅ Keep original format before confirming */}
        {!isConfirmed ? (
          <>
            <ItemInput
              newItem={newItem}
              itemPrice={itemPrice}
              quantity={quantity}
              editingIndex={editingIndex}
              handleItemInputChange={(e) => setNewItem(e.target.value)}
              handlePriceInputChange={(e) => setItemPrice(e.target.value)}
              handleQuantityInputChange={(e) => setQuantity(e.target.value)}
              addItem={addItem}
              cancelEdit={resetInputs}
            />
            {editingIndex === null && (
              <ItemList items={items} startEditItem={startEditItem} removeItem={removeItem} />
            )}
            <h3 className="total-display">Total: ${total.toFixed(2)}</h3>
            <button className="bill-confirm-btn" onClick={confirmBill}>Confirm Bill</button>
          </>
        ) : (
          // ✅ After confirming, show only event name and clean item list
          <div className="confirmed-items">
            <h3>Items:</h3>
            <ItemList items={items} startEditItem={() => {}} removeItem={() => {}} hideButtons={true} />
            <h3>Total: ${total}</h3>
          </div>
        )}
      </div>

      {/* Right Panel - Only for split options */}
      {isConfirmed && (
        <div className="right-panel">
          <ActionPanel editBill={editBill} handleSplitOption={handleSplitOption} />
          {splitOption === 'custom' && (
            <SplitPanel people={people} handlePersonChange={handlePersonChange} addPerson={addPerson} />
          )}
        </div>
      )}
    </div>
  );
}
