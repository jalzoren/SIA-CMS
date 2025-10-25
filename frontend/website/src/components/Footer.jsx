import React from "react";
import "../css//Footer.css";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaGlobe } from "react-icons/fa";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* === TOP SECTION === */}
        <div className="footer-top">
          {/* Left Logo & Text */}
          <div className="footer-logo">
            <div className="logo-wrapper">
              <img
                src="/images/hospital-logo.png"
                alt="Hospital Logo"
                className="logo-img"
              />
              <span className="logo-text">hospitaled</span>
            </div>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse.
            </p>
          </div>

          {/* Middle Links */}
          <div className="footer-links">
            <div className="footer-column">
              <h4>Home</h4>
              <a href="#">Events</a>
              <a href="#">Our Doctors</a>
              <a href="#">Mission and Vision</a>
            </div>

            <div className="footer-column">
              <h4>Our Services</h4>
              <a href="#">Departments</a>
              <a href="#">Emergency Care</a>
              <a href="#">Help Center</a>
            </div>

            <div className="footer-column">
              <h4>About</h4>
              <a href="#">About hospitaled</a>
              <a href="#">Careers</a>
              <a href="#">Events and News</a>
              <a href="#">Privacy Policy</a>
            </div>
          </div>

          {/* Book Appointment */}
          <div className="appointment">
            <h4>Book an Appointment</h4>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse.
            </p>
            <button className="doctor-btn">Book and Appointment →</button>
          </div>
        </div>

        {/* === BOTTOM SECTION === */}
        <div className="footer-bottom">
          <div className="left-bottom">
            <span>
              <FaGlobe /> English ▼
            </span>
            <a href="#">Terms & Conditions</a>
            <a href="#">Privacy Policy</a>
            <p>©2025 hospitaled.</p>
          </div>

          <div className="social-icons">
            <a href="#"><FaFacebookF /></a>
            <a href="#"><FaTwitter /></a>
            <a href="#"><FaLinkedinIn /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
