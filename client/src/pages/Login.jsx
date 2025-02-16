import React from "react";
import { Link } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import "../styles/Login.css";

export default function Login({ setIsAuthenticated }) {
  return <LoginForm setIsAuthenticated={setIsAuthenticated} />;
}
