import React from 'react'
import RegisterForm from '../components/RegisterForm'
import "../styles/Register.css"

export default function Register({ setIsAuthenticated }) {
    return (
       <RegisterForm setIsAuthenticated={setIsAuthenticated} />
    )
}
