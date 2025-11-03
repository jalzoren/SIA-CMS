import React from "react";
import "../css/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-column">
          <h3>HOSPITALED</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        </div>

        <div className="footer-column">
          <h3>HOME</h3>
          <ul>
            <li><a href="#">Events</a></li>
            <li><a href="#">Our Doctors</a></li>
            <li><a href="#">Mission and Vision</a></li>
          </ul>
        </div>

        <div className="footer-column">
          <h3>OUR SERVICES</h3>
          <ul>
            <li><a href="#">Departments</a></li>
            <li><a href="#">Emergency Care</a></li>
            <li><a href="#">Help Center</a></li>
          </ul>
        </div>

        <div className="footer-column">
          <h3>ABOUT</h3>
          <ul>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Careers</a></li>
            <li><a href="#">Events and News</a></li>
            <li><a href="#">Privacy Policy</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2025 Hospitaled. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
