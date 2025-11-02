import { useState, useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import "../css/Navbar.css";
import { IoMdArrowDropdown } from "react-icons/io";
import "boxicons/css/boxicons.min.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // ✅ Scroll to top smoothly on route change
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [location.pathname]);

  const isNewsActive =
    location.pathname.startsWith("/news") ||
    location.pathname.startsWith("/announcements");

  // ✅ Close menu after navigating (for mobile)
  const handleNavClick = (path) => {
    navigate(path);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
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
        <div
          className="brand"
          onClick={() => handleNavClick("/")}
          style={{ cursor: "pointer" }}
        >
          <i className="bx bx-plus-medical icon"></i>
          <span>HospitalED</span>
        </div>

        {/* Hamburger (mobile) */}
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
            <NavLink to="/" end onClick={() => setMenuOpen(false)}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/services" onClick={() => setMenuOpen(false)}>
              Services
            </NavLink>
          </li>
          <li>
            <NavLink to="/doctors" onClick={() => setMenuOpen(false)}>
              Doctors
            </NavLink>
          </li>

          {/* Dropdown */}
          <li className={`dropdown ${isNewsActive ? "active" : ""}`}>
            <span>
              News <IoMdArrowDropdown />
            </span>
            <div className="dropdown-content">
              <NavLink to="/news" onClick={() => setMenuOpen(false)}>
                Latest News
              </NavLink>
              <NavLink to="/announcements" onClick={() => setMenuOpen(false)}>
                Announcements
              </NavLink>
            </div>
          </li>

          <li>
            <NavLink to="/careers" onClick={() => setMenuOpen(false)}>
              Careers
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" onClick={() => setMenuOpen(false)}>
              About
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact" onClick={() => setMenuOpen(false)}>
              Contact
            </NavLink>
          </li>
        </ul>

        <button className="book-btn" onClick={() => handleNavClick("/contact")}>
          Book an Appointment
        </button>
      </nav>
    </div>
  );
}

export default Navbar;
