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

  function editBill() {
    setIsConfirmed(false);
    setSplitOption(null);
    setIsEditingEvent(true); // Re-enable editing and show the pencil
  }


  return (
    <div className={`bill-container ${isConfirmed ? 'confirmed' : ''}`}>
      <h1>Under Construction</h1>
      <button onClick={editBill}></button>
    </div>
  );
}
