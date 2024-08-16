import React, { useEffect, useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar.jsx";
import Homepage from "./pages/Homepage.jsx";
import Login from "./pages/Login.jsx";
import ProductDetailsPage from "./pages/ProductDetails.jsx";
import Register from "./pages/Register";
import UserProfile from "./pages/UserProfile";
import VerifyEmail from "./pages/VerifyEmail.jsx";
import AdminDashboard from "./pages/admin/AdminDashboard.jsx";
import AdminRoutes from "./protected_routes/AdminRoutes.jsx";
import UserRoutes from "./protected_routes/UserRoutes.jsx";



function App() {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData && userData.isAdmin) {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }, [localStorage.getItem("user")]);

  return (
    <Router>
      <Navbar isAdmin={isAdmin} />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/user/:id/verify/:token" element={<VerifyEmail />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route element={<UserRoutes/>}>
          <Route path="/profile" element={<h1>Profile</h1>} />
          <Route path="/product-details/:productId" element={<ProductDetailsPage />} />

        </Route>
        {isAdmin && (
          <Route element={<AdminRoutes />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />

          </Route>
        )}
      </Routes>
    </Router>
  );
}

export default App;
