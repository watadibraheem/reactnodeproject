import React from "react";
import { Link } from "react-router-dom";
import "../App.css";
import Logo from "../assets/logo_header_V2.webp";

function Header() {
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
        </ul>
      </nav>
    </header>
  );
}

export default Header;