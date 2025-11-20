// frontend/website/src/pages2/Home2.jsx
import React from "react";
import { Link } from "react-router-dom";
import "../css2/Home2.css";

export default function Home2() {
  return (
    <div className="home2-container">

      {/* HERO SECTION */}
      <section className="home2-hero">
        <div className="home2-hero-overlay">
          <div className="home2-hero-content">
            <h1>Your Health, Our Priority</h1>
            <p>
              We’re committed to providing exceptional medical care using
              state-of-the-art technology and a patient-centered approach.
            </p>

            <div className="home2-hero-buttons">
              <Link to="/doctors" className="home2-btn primary">Find a Doctor</Link>
              <Link to="/contact" className="home2-btn secondary">Book Appointment</Link>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section className="home2-services">
        <h2>Provide Our Best Services</h2>

        <div className="home2-service-cards">

          <div className="home2-service-card">
            <h3>Cardiology</h3>
            <p>Expert care for heart-related conditions and long-term heart health.</p>
            <span className="count">1500+ patients</span>
          </div>

          <div className="home2-service-card">
            <h3>Pulmonology</h3>
            <p>Comprehensive lung and respiratory treatments from trusted specialists.</p>
            <span className="count">1200+ patients</span>
          </div>

          <div className="home2-service-card">
            <h3>Psychiatry</h3>
            <p>Mental wellness and behavioral care provided with compassion.</p>
            <span className="count">1000+ patients</span>
          </div>

        </div>
      </section>

      {/* UPDATES SECTION */}
      <section className="home2-updates">
        <h2>Latest Updates and Announcements</h2>

        <div className="home2-updates-box">
          <h3>
            Major Breakthrough: MediSync Pioneers{" "}
            <span className="highlight">CRISPR Gene Therapy</span> for blood disorders
          </h3>

          <p>
            Researchers at MediSync successfully conducted innovative gene editing
            treatments offering new hope to patients with hereditary blood diseases.
          </p>

          <Link to="/news" className="home2-btn primary">Read More</Link>

          <div className="home2-mini-cards">
            <div className="mini-card">Announcements</div>
            <div className="mini-card">Health Tips</div>
            <div className="mini-card">News</div>
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section className="home2-about">
        <h3>WELCOME TO MEDISYNC</h3>
        <h2>A Great Place to Receive Care</h2>
        <p>
          Learn more about our clinic, committed physicians, and exceptional approach
          to healthcare. Our mission is to provide outstanding medical attention that
          puts your well-being first.
        </p>

        <Link to="/about" className="home2-btn outline">Learn More About Us</Link>
      </section>

      {/* CONTACT SECTION */}
      <section className="home2-contact">
        <h2>Connect With Us</h2>

        <div className="home2-contact-grid">

          <div className="contact-card">
            <h4>Phone</h4>
            <p>+63 912 345 6789</p>
          </div>

          <div className="contact-card">
            <h4>Location</h4>
            <p>Makati City, Metro Manila</p>
          </div>

          <div className="contact-card">
            <h4>Email</h4>
            <p>info@medisync.com</p>
          </div>

          <div className="contact-map">
            <iframe
              title="map"
              src="https://maps.google.com/maps?q=Makati&t=&z=13&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>

        </div>
      </section>

    </div>
  );
}
