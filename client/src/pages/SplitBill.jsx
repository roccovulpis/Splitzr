import React from 'react'
import BillForm from '../components/BillForm'
import '../styles/SplitBill.css'

export default function SplitBill() {
  return (
    <div>
      <div id='panels-container'>
        <div id='entry-panel'>
            <h1>Enter Details</h1>
            <BillForm />
        </div>
      </div>
    </div>
  )
}
