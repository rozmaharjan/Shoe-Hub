import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Api from "../apis/api";

const Navbar = () => {
  const [activePage, setActivePage] = useState("home");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleItemClick = (itemName) => {
    setActivePage(itemName);
  };

  const handleLogout = async () => {
    try {
      const response = await Api.post('/api/user/logout');

      if (response.data.success) {
        localStorage.removeItem("user");
        setUser(null);
        navigate("/login");
      } else {
        throw new Error('Logout failed');
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const handleRegister = () => {
    navigate("/register");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
      <div className="container-fluid">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <span style={{ fontWeight: "bold", fontSize: "1.5rem" }}>Shoe Hub</span>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                to="/"
                className={`nav-link ${activePage === "home" ? "active" : ""}`}
                onClick={() => handleItemClick("home")}
                style={{ fontWeight: activePage === "home" ? "bold" : "normal", color: activePage === "home" ? "#ffffff" : "inherit" }}
              >
                Home
              </Link>
            </li>
            {/* Add more navigation items if needed */}
          </ul>
          <div className="d-flex gap-3">
            {user ? (
              <div className="dropdown">
                <button
                  className="btn btn-outline-light dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Welcome, {user.firstName}!
                </button>
                <ul className="dropdown-menu dropdown-menu-end bg-dark text-light" aria-labelledby="dropdownMenuButton">
                  <li>
                    <Link className="dropdown-item text-light" to="/profile">
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item text-light" to="/reset-password">
                      Change password
                    </Link>
                  </li>
                  <li>
                    <button onClick={handleLogout} className="dropdown-item text-light">
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <>
                <button
                  onClick={handleLogin}
                  className="btn btn-outline-light rounded-pill"
                  type="button"
                  style={{ borderColor: "#ffffff", color: "#ffffff" }}
                >
                  Login
                </button>
                <button
                  onClick={handleRegister}
                  className="btn btn-light rounded-pill text-primary"
                  type="button"
                >
                  Register
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
