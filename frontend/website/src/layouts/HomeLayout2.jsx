// frontend/website/src/pages2/HomeLayout2.jsx
import React from "react";
import "../css/HomeLayout2.css";     // Create this file next

import heroImg from "../public/service1.png";
import service1 from "../public/service1.png";
import service2 from "../public/service2.png";
import service3 from "../public/service3.png";

export default function HomeLayout2() {
  return (
    <div className="layout2-home">

      {/* HERO SECTION */}
      <section className="layout2-hero">
        <div className="hero-overlay"></div>
        <img src={heroImg} alt="Hospital" className="hero-bg" />

        <div className="hero-content">
          <h1>Your Health Our Priority</h1>
          <p>
            We provide accessible and expertly crafted healthcare services.  
            Trust our medical team to guide you toward a healthier future.
          </p>

          <div className="hero-buttons">
            <button className="btn-primary">Find a Doctor</button>
            <button className="btn-outline">Book Appointment</button>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="layout2-services">
        <h2>Provide Our Best Services</h2>
        <p className="services-desc">
          Comprehensive medical care with state-of-the-art facilities and expert healthcare professionals dedicated to your well-being.
        </p>

        <div className="services-grid">
          <ServiceCard
            icon={service1}
            title="Cardiology"
            desc="Expert heart care services"
            count="1500+ patients"
          />

          <ServiceCard
            icon={service2}
            title="Pulmonology"
            desc="Lung and respiratory care"
            count="1200+ patients"
          />

          <ServiceCard
            icon={service3}
            title="Psychiatry"
            desc="Mental wellness programs"
            count="1600+ patients"
          />
        </div>
      </section>

      {/* ANNOUNCEMENTS */}
      <section className="layout2-announcements">
        <h2>Latest Updates and Announcements</h2>

        <div className="ann-banner">
          <div className="ann-text">
            <h3>
              Major Breakthrough: MediSync Pioneers  
              <span>CRISPR Gene Therapy</span> for Blood Disorders
            </h3>

            <p className="ann-desc">
              MediSync has successfully conducted the first CRISPR-based treatment trial, 
              marking a major step forward in genetic medicine.
            </p>

            <button className="btn-primary">Read More</button>
          </div>
        </div>

        <div className="ann-categories">
          <span className="cat">Announcements</span>
          <span className="cat">Research</span>
          <span className="cat">Medical</span>
        </div>
      </section>

      {/* WELCOME */}
      <section className="layout2-welcome">
        <div className="welcome-box">
          <h4>WELCOME TO MEDISYNC</h4>
          <h2>A Great Place to Receive Care</h2>

          <p>
            Learn more about our center, community engagement, outstanding patient care,  
            and the exceptional medical professionals who serve our patients daily.
          </p>

          <button className="btn-primary">Learn More About Us</button>
        </div>
      </section>

      {/* CONTACT */}
      <section className="layout2-contact">
        <h2>Connect With Us</h2>

        <div className="contact-grid">
          <div className="contact-box">
            <h4>Phone</h4>
            <p>0917-250-8749</p>
          </div>

          <div className="contact-box">
            <h4>Location</h4>
            <p>Makati City, Manila Area</p>
          </div>

          <div className="contact-box">
            <h4>Email</h4>
            <p>info@medisync.com</p>
          </div>
        </div>
      </section>

    </div>
  );
}


// ----------------------------
// SERVICE CARD (OOP modular)
// ----------------------------
function ServiceCard({ icon, title, desc, count }) {
  return (
    <div className="service-card">
      <img src={icon} alt={title} className="service-icon" />
      <h3>{title}</h3>
      <p>{desc}</p>
      <span className="service-count">{count}</span>
    </div>
  );
}
