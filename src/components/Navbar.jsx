import React from 'react';
import { Link } from 'react-router-dom';
import billIcon from '../assets/bill.png'; 
import '../styles/Navbar.css'

export default function Navbar() {
  return (
    <nav>
      <Link to="/">
        <img src={billIcon} alt="bill" id="nav-logo" />
      </Link>

      <span id="nav-title">
        <Link to="/">Splitzr</Link>
      </span>

      <ul id="nav-list">
        <li><Link to="/split-bill">Split Bill</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/register">Sign Up</Link></li>
      </ul>
    </nav>
  );
}
