import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/Login.css';

export default function LoginForm({ setIsAuthenticated }) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // ✅ Set API URL for local & production
  const API_URL = "http://localhost:5000/api/auth";  // ✅ Make sure this matches backend

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");
    setLoading(true);

    console.log("🔵 Sending login request:", formData);

    try {
      const response = await axios.post(`${API_URL}/login`, formData);
      
      console.log("🟢 Login Response:", response.data);

      if (!response.data.token) {
        throw new Error("Token missing in response");
      }

      // Save token to local storage
      localStorage.setItem("token", response.data.token);

      // Update authentication state
      if (typeof setIsAuthenticated === "function") {
        setIsAuthenticated(true);
      } else {
        console.error("🔴 setIsAuthenticated is not a function");
      }

      window.dispatchEvent(new Event("storage"));

      setSuccessMessage("Login successful! Redirecting...");

      // Wait 1 second before redirecting
      setTimeout(() => {
        navigate("/");
      }, 1000);

    } catch (error) {
      console.error("🔴 Login error:", error);

      if (error.response) {
        console.error("🔴 Server responded with:", error.response.data);
        setError(error.response.data.message || "Login failed");
      } else if (error.request) {
        console.error("🔴 No response from server:", error.request);
        setError("Server is not responding. Try again later.");
      } else {
        console.error("🔴 Error setting up request:", error.message);
        setError("Unexpected error occurred. Try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='form'>
      <form className="login-form" onSubmit={handleSubmit}>
        <h1>Login</h1>

        {/* Success & Error Messages */}
        {successMessage && <p className="success-message">{successMessage}</p>}
        {error && <p className="error-message">{error}</p>}

        <input 
          type="text" 
          name="email" 
          placeholder="Email" 
          value={formData.email} 
          onChange={handleChange} 
          required
        /><br />
        
        <input  
          className="pass-input" 
          type="password" 
          name="password" 
          placeholder="Password" 
          value={formData.password} 
          onChange={handleChange} 
          required
        /><br />
        
        <span className='login-span'>
          <input type="checkbox" className='remember' name='remember' />
          <label className='remember-label' htmlFor="remember">Remember Me</label>
          <a className='forgot' href="#">Forgot Password?</a>
        </span>
        
        <button id="login-btn" type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
        
        <p className="message">Not registered? <Link to={"/register"}>Create an account</Link></p>
      </form>
    </div>
  );
}
