import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SplitBill from "./pages/SplitBill";
import MyBills from "./pages/MyBills";
import Navbar from "./components/Navbar";


// Protected Route Component
const PrivateRoute = ({ element }) => {
  const token = localStorage.getItem("token");
  return token ? element : <Navigate to="/login" />;
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"));

  useEffect(() => {
    const checkAuth = () => setIsAuthenticated(!!localStorage.getItem("token"));
    window.addEventListener("storage", checkAuth);
    return () => window.removeEventListener("storage", checkAuth);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    window.location.href = "/login";
  };

  return (
    <Router>
      <div id="app-container"> {/* Full Page Wrapper */}
        <Navbar isAuthenticated={isAuthenticated} handleLogout={handleLogout} />
        
        <div id="content"> {/* This grows and keeps footer at bottom */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
            <Route path="/register" element={<Register setIsAuthenticated={setIsAuthenticated} />} />
            <Route path="/split-bill" element={<PrivateRoute element={<SplitBill />} />} />
            <Route path="/my-bills" element={<PrivateRoute element={<MyBills />} />} />
          </Routes>
        </div>

      </div>
    </Router>
  );
}

export default App;

