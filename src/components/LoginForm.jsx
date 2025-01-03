import React from 'react'
import '../styles/Login.css'
import { Link } from 'react-router-dom'
import { FaLock } from "react-icons/fa";

export default function LoginForm() {
    return (
        <div className='form'>
            <form className="login-form">
                <h1>Login</h1>
                <input type="text" placeholder="Username" /><br />
                <input  className="pass-input" type="password" placeholder="Password" /><br />
                <span className='login-span'>
                    <input type="checkbox" className='remember' name='remember' />
                    <label className='remember-label' htmlFor="remember">Remember Me</label>
                    <a className='forgot' href="#">Forgot Password?</a>
                </span>
                <button id="login-btn">Login</button>
                <p className="message">Not registered? <Link to={"/register"}>Create an account</Link></p>
            </form>
        </div>
    )
}
