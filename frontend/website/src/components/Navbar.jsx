import { useState } from "react";
import { Link } from "react-router-dom";
import "../css/Navbar.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* --- Not sticky --- */}
      <div className="emergency-bar">
        For emergency concerns, please call our ER at 000-000-0000 or mobile at
        000-000-0000
      </div>

      {/* --- Sticky navigation --- */}
      <header>
        <div className="logo">Hospitaled</div>

        <button
          className="hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
        >
          ☰
        </button>

        <nav className={`nav-menu ${menuOpen ? "open" : ""}`}>
          <ul>
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
              <a href="#news">News</a>
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
              <Link to="/contact" id="nav-book">
                Book Appointment
              </Link>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}

export default Navbar;
