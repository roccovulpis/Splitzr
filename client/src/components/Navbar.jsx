import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import billIcon from '../assets/bill.png';
import '../styles/Navbar.css';

const Navbar = ({ isAuthenticated, handleLogout }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handleNavigation = (to, e) => {
    if (location.pathname === '/create-bill' && to !== '/create-bill') {
      const confirmLeave = window.confirm(
        "Leaving this page will lose your unsaved split bill information. Are you sure you want to leave?"
      );
      if (!confirmLeave) {
        e.preventDefault();
        return;
      }
    }
    navigate(to);
  };

  return (
    <nav>
      <Link to="/" onClick={(e) => handleNavigation('/', e)}>
        <img src={billIcon} alt="bill" id="nav-logo" />
      </Link>

      <span id="nav-title">
        <Link to="/" onClick={(e) => handleNavigation('/', e)}>Splitzr</Link>
      </span>

      <ul id="nav-list">
        <li>
          <Link to="/create-bill" onClick={(e) => handleNavigation('/create-bill', e)}>
            Split Bill
          </Link>
        </li>

        {isAuthenticated && (
          <li>
            <a href="/my-bills" onClick={(e) => handleNavigation('/my-bills', e)}>
              My Bills
            </a>
          </li>
        )}

        {!isAuthenticated ? (
          <>
            <li>
              <a href="/login" onClick={(e) => handleNavigation('/login', e)}>
                Login
              </a>
            </li>
            <li className="register-li">
              <a href="/register" onClick={(e) => handleNavigation('/register', e)}>
                Sign Up
              </a>
            </li>
          </>
        ) : (
          <li>
            <button id="logout-btn" onClick={() => setShowLogoutConfirm(true)}>
              Logout
            </button>
          </li>
        )}
      </ul>

      {showLogoutConfirm && (
        <div className="logout-modal">
          <p>Are you sure you want to log out?</p>
          <button className="confirm-btn" onClick={handleLogout}>
            Yes
          </button>
          <button className="cancel-btn" onClick={() => setShowLogoutConfirm(false)}>
            No
          </button>
        </div>
      )}
    </nav>
  );
};

export default React.memo(Navbar);