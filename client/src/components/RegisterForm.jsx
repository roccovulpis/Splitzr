import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/Register.css';

export default function RegisterForm({ setIsAuthenticated }) {
  const navigate = useNavigate(); // Hook for navigation

  // State for form data
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  // State for messages
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // ✅ Use environment variable for API base URL
  const API_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage(""); // Reset messages

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const userData = {
      name: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      password: formData.password,
    };

    console.log("🔵 Sending registration request to:", `${API_URL}/api/auth/register`);

    try {
      const response = await axios.post(`${API_URL}/api/auth/register`, userData, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true, 
      });

      console.log("🟢 Registration Response:", response.data);

      if (!response.data.token) {
        throw new Error("Token is missing from response"); // Handle missing token
      }

      // Save token to local storage
      localStorage.setItem("token", response.data.token);

      // Update global authentication state
      if (typeof setIsAuthenticated === "function") {
        setIsAuthenticated(true);
      } else {
        console.error("🔴 setIsAuthenticated is not a function");
      }

      window.dispatchEvent(new Event("storage"));

      setSuccessMessage("User registered successfully! Redirecting...");

      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
      });

      // Redirect to home page after delay
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      console.error("🔴 Registration error:", error);

      if (error.response) {
        console.error("🔴 Server responded with:", error.response.data);
        setError(error.response.data.message || "Registration failed");
      } else if (error.request) {
        console.error("🔴 No response received from server:", error.request);
        setError("Server is not responding. Try again later.");
      } else {
        console.error("🔴 Error setting up request:", error.message);
        setError("Unexpected error occurred. Try again.");
      }
    }
  };

  return (
    <div className='form'>
      <form className="register-form" onSubmit={handleSubmit}>
        <h1>Register</h1>

        {/* Success & Error Messages */}
        {successMessage && <p className="success-message">{successMessage}</p>}
        {error && <p className="error-message">{error}</p>}

        <div className='name-input'>
          <input 
            className='first-name-input' 
            type="text" 
            name="firstName" 
            placeholder="First Name" 
            value={formData.firstName} 
            onChange={handleChange} 
            required
          />
          <input 
            className='last-name-input' 
            type="text" 
            name="lastName" 
            placeholder="Last Name" 
            value={formData.lastName} 
            onChange={handleChange} 
            required
          />
        </div>
        <input 
          type="email" 
          name="email" 
          placeholder="Email" 
          value={formData.email} 
          onChange={handleChange} 
          required
        />
        <input 
          type="password" 
          name="password" 
          placeholder="Password" 
          value={formData.password} 
          onChange={handleChange} 
          required
        />
        <input 
          type="password" 
          name="confirmPassword" 
          placeholder="Confirm Password" 
          value={formData.confirmPassword} 
          onChange={handleChange} 
          required
        />
        <button id='create-btn' type="submit">Create Account</button>
        <p className="message">Already registered? <Link to={"/login"}>Sign In</Link></p>
      </form>
    </div>
  );
}
