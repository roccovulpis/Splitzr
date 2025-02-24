import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import billIcon from '../assets/bill.png';
import '../styles/Navbar.css';

export default function Navbar({ isAuthenticated, handleLogout }) {
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  return (
    <nav>
      <Link to="/">
        <img src={billIcon} alt="bill" id="nav-logo" />
      </Link>

      <span id="nav-title">
        <Link to="/">Splitzr</Link>
      </span>

      <ul id="nav-list">
        <li><Link to="/create-bill">Split Bill</Link></li>

        {isAuthenticated && (
          <li><Link to="/my-bills">My Bills</Link></li>
        )}

        {!isAuthenticated ? (
          <>
            <li><Link to="/login">Login</Link></li>
            <li className='register-li'><Link to="/register">Sign Up</Link></li>
          </>
        ) : (
          <li>
            <button id="logout-btn" onClick={() => setShowLogoutConfirm(true)}>Logout</button>
          </li>
        )}
      </ul>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="logout-modal">
          <p>Are you sure you want to log out?</p>
          <button className="confirm-btn" onClick={handleLogout}>Yes</button>
          <button className="cancel-btn" onClick={() => setShowLogoutConfirm(false)}>No</button>
        </div>
      )}
    </nav>
  );
}
