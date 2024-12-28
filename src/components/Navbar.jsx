import React from 'react'
import '../index.css'

export default function Navbar() {
  return (
    <nav>
        <a href="/"><img src="/src/assets/bill.png" alt="bill" id="nav-logo" /></a>
        <span id="nav-title">Splitzr</span>
        <ul id="nav-list">
            <li><a href="">Split Bill</a></li>
            <li><a href="">Login</a></li>
            <li><a href="">Sign Up</a></li>
        </ul>
    </nav>
  )
}
