import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SplitBill from "./pages/SplitBill";
import MyBills from "./pages/MyBills";
import Navbar from "./components/Navbar";

// ✅ Corrected PrivateRoute to Pass Props
const PrivateRoute = ({ children, isAuthenticated }) => {
  return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"));

  useEffect(() => {
    const checkAuth = () => {
      const token = !!localStorage.getItem("token");
      if (token !== isAuthenticated) {
        setIsAuthenticated(token); 
      }
    };
  
    window.addEventListener("storage", checkAuth);
    return () => window.removeEventListener("storage", checkAuth);
  }, [isAuthenticated]);
  

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    window.location.href = "/login";
  };

  return (
    <Router>
      <div id="app-container">
        <Navbar isAuthenticated={isAuthenticated} handleLogout={handleLogout} />

        <div id="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
            <Route path="/register" element={<Register setIsAuthenticated={setIsAuthenticated} />} />
            <Route
              path="/split-bill"
              element={
                <SplitBill />
                // <PrivateRoute isAuthenticated={isAuthenticated}>
                //   <SplitBill />
                // </PrivateRoute>
              }
            />

            <Route
              path="/my-bills"
              element={
                <PrivateRoute isAuthenticated={isAuthenticated}>
                  <MyBills setIsAuthenticated={setIsAuthenticated} />
                </PrivateRoute>
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
