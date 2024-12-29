import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import '../index.css'

export default function Navbar() {
  return (
    <nav>
        <a href="/"><img src="/src/assets/bill.png" alt="bill" id="nav-logo" /></a>
        <span id="nav-title"><a href="/">Splitzr</a></span>
        <ul id="nav-list">
            <li><a href="">Split Bill</a></li>
            <li><a href="">Login</a></li>
            <li><a href="">Sign Up</a></li>
        </ul>
    </nav>
  )
}
