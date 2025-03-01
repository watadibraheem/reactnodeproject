import React from "react";
import { Link, useNavigate} from "react-router-dom";
import "../App.css";
import Logo from "../assets/logo_header_V2.webp";
import axios from "axios";

function Header({user, setUser}) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:8801/users/logout",
        {},
        { withCredentials: true }
      );
      setUser(null);
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  return (
    <header className="main-header">
      <div className="header-logo">
        <img src={Logo} alt="Logo" /> {/* Replace with your actual logo */}
        <h1>Fuel Management System</h1>
      </div>
      <nav>
        <ul className="nav-list">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
          {user ? (
            <>
              <li>
                <button className="header-btn" onClick={handleLogout}>
                  Logout
                </button>
              </li>
              {user && user.role === "admin" && (
                <li>
                  <Link to="/admin-dashboard">Admin Dashboard</Link>
                </li>
              )}
              {user && (
                <li>
                  <Link to="/edit-profile">Edit Profile</Link>
                </li>
              )}
            </>
          ) : (
            <li>
              <Link to="/login">Login</Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;