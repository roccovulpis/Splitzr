import React from 'react'
import '../styles/SplitBill.css'

export default function SplitBill() {
  return (
    <div>
      <div id='panels-container'>
        <div id='entry-panel'>
            <h1>Enter Details</h1>
            <form action="">
                <label htmlFor="event-name">Event</label>
                <input type="text" id='event-name' name='event-name' /><br />
                <label htmlFor="date">Date</label>
                <input type="date" id='date' name='date'/><br />
                <label htmlFor="total">Total</label>
                <input type="number" name="total" id="total" />
            </form>
        </div>
        <div id='review-panel'>
            <h1>Review</h1>
        </div>
      </div>
      
    
      <button>Split New Bill</button>
    </div>
  )
}
