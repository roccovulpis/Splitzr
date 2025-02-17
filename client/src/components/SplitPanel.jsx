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
  const [items, setItems] = useState([]);
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

  function confirmBill() {
    setIsConfirmed(true);
    setIsEditingEvent(false); // Disable editing for the event title and hide the pencil
  }

  function editBill() {
    setIsConfirmed(false);
    setSplitOption(null);
    setIsEditingEvent(true); // Re-enable editing and show the pencil
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

  return (
    <div className={`bill-container ${isConfirmed ? 'confirmed' : ''}`}>
      <div className="bill-panel">
        <EventDetails
          event={event}
          eventDate={eventDate}
          setEvent={setEvent}
          setEventDate={setEventDate}
          isEditing={isEditingEvent && !isConfirmed}
          setIsEditing={setIsEditingEvent}
          isConfirmed={isConfirmed} // Pass this to control edit button visibility
        />

        {!isConfirmed && (
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
              cancelEdit={() => setEditingIndex(null)}
            />
            {editingIndex === null && (
              <ItemList items={items} startEditItem={setEditingIndex} removeItem={removeItem} />
            )}
            <h3 className="total-display">Total: ${total.toFixed(2)}</h3>
            <button className="confirm-btn" onClick={confirmBill}>Confirm Bill</button>
          </>
        )}
      </div>

      {/* Keep the right panel visible after confirming */}
      {isConfirmed && (
        <>
          <ActionPanel editBill={editBill} handleSplitOption={handleSplitOption} />
          
          {/* ✅ Now showing ItemList inside the right panel after confirmation */}
          <div className="confirmed-items">
            <h3>Confirmed Items:</h3>
            <ItemList items={items} startEditItem={() => {}} removeItem={() => {}} />
          </div>

          {splitOption === 'custom' && (
            <SplitPanel people={people} handlePersonChange={handlePersonChange} addPerson={addPerson} />
          )}
        </>
      )}
    </div>
  );
}
