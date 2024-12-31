import React, { useState } from 'react'
import '../styles/BillForm.css'

export default function BillForm() {

  const [items, setItems] = useState(["Steak", "Pepsi"]);
  const [newItem, setNewItem] = useState("");
  const [itemPrice, setItemPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);

  function handleItemInputChange(event) {
    setNewItem(event.target.value);
  }

  function handlePriceInputChange(event) {
    setItemPrice(event.target.value);
  }

  function addItem() {
    if (newItem.trim() !== "") {
      setItems(i => [...i, newItem]);
      setNewItem("");
    }
  }

  // function addQuantity() {
  //   if (newItem.trim() !== "") {
  //     setItems(i => [...i, newItem]);
  //     setNewItem("");
  //   }
  // }

  function removeItem(index) {

  }


  return (
    <div className='event-form-container'>
     
        <div className='event-details-container'>
          <input 
            type="text" 
            id='event-name' 
            placeholder='Event Name' 
          />
          <input 
            type="date" 
            id='date' 
            placeholder='date' /><br />
        </div>

        <div className='event-items-container'>
          <input
            id='item-input'
            type="text"
            placeholder='Item'
            value={newItem}
            onChange={handleItemInputChange}
          />
          <input
            id='price-input'
            type="text"
            placeholder='Price'
            value={itemPrice}
            onChange={handlePriceInputChange}
          />
          <input
            id='quantity-input'
            type="number"
            placeholder='Quantity'
          />
          {/* <input type="text" 
            id='item-total' 
            name='item-total' 
            placeholder='0.00' 
          /> */}
          <button
          className='add-btn'
          onClick={addItem}
        >
          ✔️
        </button>

        </div>
   


      <ol>
        {items.map((item, index) =>
          <li key={index}>
            <span className='text'>{quantity} {item} {itemPrice}</span>
            <button
              className='remove-btn'
              onClick={() => removeItem(index)}
            >
              ❌
            </button>
          </li>
        )}
      </ol>

    </div>
  )
}
