import React from 'react'
import '../styles/EventForm.css'

export default function ItemList() {
  return (
    <div className='event-form-container'>
      <form action="">
        <div className='event-details-container'>
          <label htmlFor="event-name">Event</label>
          <input type="text" id='event-name' name='event-name' />
          <label htmlFor="date">Date</label>
          <input type="date" id='date' name='date' /><br />
        </div>
        <div className='event-items-container'>
          <input 
            type="text" 
            id='item-name' 
            name='item-name' 
            placeholder='Item' 
          />
          <input type="number" 
            id='item-quantity' 
            name='item-quantity' 
            placeholder='0' 
          />
          <input type="text" 
            id='item-total' 
            name='item-total' 
            placeholder='0.00' 
          />
          <button className='addBtn'>
            ✔️
          </button>
          <button className='removeBtn'>
            ❌
          </button>
          <button>
            
          </button>
        </div>

        
      </form>
    </div>
  )
}
