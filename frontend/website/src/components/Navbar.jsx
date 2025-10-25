import React from "react";
import { NavLink } from "react-router-dom";
import "../css/Navbar.css";

const Navbar = () => {
  return (
    <>
      <div className="top-bar">
        For emergency concerns, please call our ER at <strong>0000000</strong> local{" "}
        <strong>000000</strong>, or our mobile number at <strong>000000000000</strong>
      </div>

      {/* Main navbar */}
      <nav className="navbar">
        <div className="nav-container">
          {/* Logo */}
          <div className="logo">
            <img
              alt="hospital logo"
              className="logo-img"
            />
            <span className="logo-text">hospitaled</span>
          </div>

          {/* Nav links */}
          <ul className="nav-links">
            <li>
              <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>
                Home
              </NavLink>
            </li>
            <li className="dropdown">
              <NavLink to="/services" className={({ isActive }) => (isActive ? "active" : "")}>
                Our Services
              </NavLink>
            </li>
            <li className="dropdown">
              <NavLink to="/doctors" className={({ isActive }) => (isActive ? "active" : "")}>
                Our Doctors
              </NavLink>
            </li>
            <li>
              <NavLink to="/news" className={({ isActive }) => (isActive ? "active" : "")}>
                News
              </NavLink>
            </li>
            <li>
              <NavLink to="/careers" className={({ isActive }) => (isActive ? "active" : "")}>
                Careers
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" className={({ isActive }) => (isActive ? "active" : "")}>
                About Us
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" className={({ isActive }) => (isActive ? "active" : "")}>
                Contact Us
              </NavLink>
            </li>
          </ul>

          {/* Appointment button */}
          <NavLink to="/appointment" className="appointment-btn">
            Book an Appointment
          </NavLink>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
