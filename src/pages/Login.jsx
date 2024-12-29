import React from 'react'
import '../styles/Login.css'

export default function Login() {
    return (
        <div>

            <div class="login-page">
                <div class="form">
                    {/* <form class="register-form">
                        <input type="text" placeholder="name" />
                        <input type="password" placeholder="password" />
                        <input type="text" placeholder="email address" />
                        <button>create</button>
                        <p class="message">Already registered? <a href="#">Sign In</a></p>
                    </form> */}
                    <form class="login-form">
                        <h1>Login</h1>
                        <input type="text" placeholder="username" /><br />
                        <input type="password" placeholder="password" /><br />
                        <span className='login-span'>
                            <input type="checkbox" className='remember' name='remember'/>
                            <label htmlFor="remember">Remember Me</label>
                            <a className='forgot' href="#">Forgot Password?</a>
                        </span>
                        <button id="login-btn">Login</button>
                        <p class="message">Not registered? <a href="#">Create an account</a></p>
                    </form>
                </div>
            </div>



        </div>
    )
}
