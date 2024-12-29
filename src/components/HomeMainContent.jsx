import React from 'react'
import tableImg from '../assets/people-at-table.jpg'
import '../index.css'

export default function HomeMainContent() {
  return (
    <div id="home-main-container">
        <div id="home-header-container">
            <h1 id="home-header">Splitzr</h1>
            <h2 id="home-header-desc">Splitting Your Tabs Just Became Effortless With Splitzr!</h2>
            <button id="home-split-btn">Start Splitting Now</button>
        </div>
        <div id="home-img-container">
            <img src={tableImg} alt="People sitting at the table" />
        </div>
    </div>
  )
}
