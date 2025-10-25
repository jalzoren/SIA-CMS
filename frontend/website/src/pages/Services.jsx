import React from "react";
import "../css/Services.css";
import {
  FaStethoscope,
  FaUserMd,
  FaAmbulance,
  FaHeartbeat,
  FaMicroscope,
  FaHospital,
  FaSearch,
} from "react-icons/fa";

function Services() {
  const services = [
    {
      icon: <FaStethoscope />,
      title: "General Consultation",
      desc: "Comprehensive checkups and preventive care tailored to your needs.",
    },
    {
      icon: <FaUserMd />,
      title: "Specialized Doctors",
      desc: "Access to certified specialists across multiple medical disciplines.",
    },
    {
      icon: <FaAmbulance />,
      title: "Emergency Care",
      desc: "24/7 emergency response and rapid treatment when every second counts.",
    },
    {
      icon: <FaHeartbeat />,
      title: "Cardiology",
      desc: "Advanced heart care, diagnostics, and life-saving procedures.",
    },
    {
      icon: <FaMicroscope />,
      title: "Laboratory Services",
      desc: "Accurate testing with state-of-the-art medical laboratory facilities.",
    },
    {
      icon: <FaHospital />,
      title: "Inpatient Care",
      desc: "Modern wards designed for comfort, safety, and efficient recovery.",
    },
  ];

  return (
    <section className="services-container">
      {/* ===== Header Section ===== */}
      <div className="services-title">
        <h2>
          Our <span>Services</span>
        </h2>
        <div className="title-underline"></div>
        <p className="subtitle">
          Explore a full range of healthcare services designed for your
          well-being and comfort.
        </p>
      </div>

      {/* ===== Featured Section ===== */}
      <div className="featured-services">
        {[1, 2, 3].map((item) => (
          <div className="featured-card" key={item}>
            <div className="featured-img"></div>
            <div className="featured-info"></div>
          </div>
        ))}
      </div>

      {/* ===== Search Bar ===== */}
      <div className="services-search">
        <input type="text" placeholder="Search services..." />
        <button>
          <FaSearch /> Search
        </button>
      </div>

      {/* ===== Services Grid ===== */}
      <div className="services-list">
        {services.map((service, index) => (
          <div className="service-item" key={index}>
            <div className="service-icon">{service.icon}</div>
            <div className="service-content">
              <h3>{service.title}</h3>
              <p>{service.desc}</p>
              <button className="read-more">Read More →</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Services;
