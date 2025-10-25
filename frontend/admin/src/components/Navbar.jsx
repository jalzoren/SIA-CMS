import React from "react";
import { BsList, BsPersonCircle } from "react-icons/bs";
import "../css/Navbar.css";

const Navbar = ({ onToggleSidebar }) => {
  return (
    <nav id="navbar">
      <div className="navbar-left">
        <button className="toggle-sidebar-btn" onClick={onToggleSidebar}>
          <BsList />
        </button>
        <h1 className="welcome-text">Welcome, Admin Lorem!</h1>
      </div>
      <div className="navbar-right">
        <span className="username">Username</span>
        <BsPersonCircle className="user-icon" />
      </div>
    </nav>
  );
};

export default Navbar;
