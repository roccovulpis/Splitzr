import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreateBill from "./pages/CreateBill";
import BillOverview from "./pages/BillOverview"; 
import MyBills from "./pages/MyBills";
import SplitBill from "./pages/SplitBill";
import Navbar from "./components/Navbar";

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
    localStorage.removeItem("bill");
    localStorage.removeItem("billFormState");
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
            <Route path="/split-bill" element={<SplitBill />} />
            <Route path="/create-bill" element={<CreateBill />} />
            <Route path="/bill-overview" element={<BillOverview />} />
            <Route
              path="/my-bills"
              element={
                <PrivateRoute isAuthenticated={isAuthenticated}>
                  <MyBills />
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
