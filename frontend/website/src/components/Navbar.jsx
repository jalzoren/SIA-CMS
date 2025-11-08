import { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import "../css/Navbar.css";
import { IoMdArrowDropdown } from "react-icons/io";
import "boxicons/css/boxicons.min.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isNewsActive =
    location.pathname.startsWith("/news") ||
    location.pathname.startsWith("/announcements");
    location.pathname.startsWith("/health");

  // ✅ Universal scroll + navigate function
  const handleNavClick = (e, path) => {
    e.preventDefault();

    if (location.pathname === path) {
      // If already on the page, scroll to top
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      // Otherwise, navigate normally
      navigate(path);
    }

    // Close mobile menu after clicking
    setMenuOpen(false);
  };

  return (
    <div className="sticky-header">
      {/* Top Bar */}
      <div className="top-bar">
        For emergency concerns, please call our ER at 000-000-0000 or mobile at
        000-000-0000
      </div>

      {/* Navbar */}
      <nav className="navbar">
        <div to="/dashboard" className="brand">
          <i className="bx bx-plus-medical icon"></i>
          <span>HospitalED</span>
        </div>

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
            <NavLink to="/" end onClick={(e) => handleNavClick(e, "/")}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/services" onClick={(e) => handleNavClick(e, "/services")}>
              Services
            </NavLink>
          </li>
          <li>
            <NavLink to="/doctors" onClick={(e) => handleNavClick(e, "/doctors")}>
              Doctors
            </NavLink>
          </li>

          {/* Dropdown */}
          <li className={`dropdown ${isNewsActive ? "active" : ""}`}>
            <span>
              News <IoMdArrowDropdown />
            </span>
            <div className="dropdown-content">
              <NavLink
                to="/news"
                onClick={(e) => handleNavClick(e, "/news")}
              >
                Latest News
              </NavLink>
              <NavLink
                to="/announcements"
                onClick={(e) => handleNavClick(e, "/announcements")}
              >
                Announcements
              </NavLink>
              <NavLink
                to="/health"
                onClick={(e) => handleNavClick(e, "/health")}
              >
                Health Tips
              </NavLink>
            </div>
          </li>

          <li>
            <NavLink to="/careers" onClick={(e) => handleNavClick(e, "/careers")}>
              Careers
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" onClick={(e) => handleNavClick(e, "/about")}>
              About
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact" onClick={(e) => handleNavClick(e, "/contact")}>
              Contact
            </NavLink>
          </li>
        </ul>

        <button className="book-btn">Book an Appointment</button>
      </nav>
    </div>
  );
}

export default Navbar;
