import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import "../css/Navbar.css";
import { IoMdArrowDropdown } from "react-icons/io";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const isNewsActive =
    location.pathname.startsWith("/news") ||
    location.pathname.startsWith("/announcements");

  return (
    <div className="sticky-header">
      {/* Top Bar */}
      <div className="top-bar">
        For emergency concerns, please call our ER at 000-000-0000 or mobile at
        000-000-0000
      </div>

      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">Hospitaled</div>

        {/* Hamburger */}
        <button
          className="hamburger d-lg-none"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
        >
          ☰
        </button>

        {/* Nav Links */}
        <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
          <li>
            <NavLink to="/" end>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/services">Services</NavLink>
          </li>
          <li>
            <NavLink to="/doctors">Doctors</NavLink>
          </li>

          {/* Dropdown */}
          <li className={`dropdown ${isNewsActive ? "active" : ""}`}>
            <span>
              News <IoMdArrowDropdown />
            </span>
            <div className="dropdown-content">
              <NavLink to="/news">Latest News</NavLink>
              <NavLink to="/announcements">Announcements</NavLink>
            </div>
          </li>

          <li>
            <NavLink to="/careers">Careers</NavLink>
          </li>
          <li>
            <NavLink to="/about">About</NavLink>
          </li>
          <li>
            <NavLink to="/contact">Contact</NavLink>
          </li>
        </ul>

        <button className="book-btn">Book an Appointment</button>
      </nav>
    </div>
  );
}

export default Navbar;
