import React from 'react'
import EventForm from '../components/EventForm'
import '../styles/SplitBill.css'

export default function SplitBill() {
  return (
    <div>
      <div id='panels-container'>
        <div id='entry-panel'>
            <h1>Enter Details</h1>
            <EventForm />
        </div>
        
        <div id='review-panel'>
            <h1>Review</h1>
        </div>
      </div>
      
    
      <button>Split New Bill</button>
    </div>
  )
}
