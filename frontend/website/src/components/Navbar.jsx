import { useState } from "react";
import { Link } from "react-router-dom";
import "../css/Navbar.css";
import { IoMdArrowDropdown } from "react-icons/io";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* Not sticky */}
      <div className="top-bar">
        For emergency concerns, please call our ER at 000-000-0000 or mobile at
        000-000-0000
      </div>

      {/* Sticky */}
      <nav className="navbar">
        <div className="logo">Hospitaled</div>

        <button
          className="hamburger d-lg-none"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
        >
          ☰
        </button>

        <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
          <li>
            <Link to="/" className="active">
              Home
            </Link>
          </li>
          <li>
            <Link to="/services">Services</Link>
          </li>
          <li>
            <Link to="/doctors">Doctors</Link>
          </li>
          <li className="dropdown">
            <a href="#news">
              News <IoMdArrowDropdown />
            </a>
            <div className="dropdown-content">
              <Link to="/news">Latest News</Link>
              <Link to="/announcements">Announcements</Link>
            </div>
          </li>
          <li>
            <Link to="/careers">Careers</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>

        <button className="book-btn">Book an Appointment</button>
      </nav>
    </>
  );
}

export default Navbar;
