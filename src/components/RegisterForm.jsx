import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/Register.css'

export default function RegisterForm() {
  return (
    <div className='form'>
    <form className="register-form">
        <h1>Register</h1>
        <input type="text" placeholder="First Name" />
        <input type="text" placeholder="Last Name" />
        <input type="password" placeholder="Password" />
        <input type="text" placeholder="Email" />
        <button id='create-btn'>Create Account</button>
        <p className="message">Already registered? <Link to={"/login"}>Sign In</Link></p>
    </form>
</div>
  )
}
