import React from 'react'
import StoredBillsDisplay from '../components/StoredBillsDisplay'
import '../styles/MyBills.css'

export default function MyBills() {
  return (
    <div className='my-bills-container'>
      <h1 className='my-bills-heading'>My Bills</h1>
      <StoredBillsDisplay />
    </div>
    
  )
}
