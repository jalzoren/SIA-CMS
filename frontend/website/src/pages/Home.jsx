import { useState, useEffect } from "react";
import "../css/Home.css";
import {
  MdOutlineBookmarkBorder,
  MdOutlineArrowForward,
  MdLocalHospital,
  MdAddBox,
} from "react-icons/md";
import { FaHeart, FaChild } from "react-icons/fa";

function Home() {
  const slides = [
    { title: "Emergency Care", image: "doc.jpg" },
    { title: "24/7 Support", image: "doc.jpg" },
    { title: "Qualified Doctors", image: "doc.jpg" },
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div>
      {/* --- HERO SLIDER SECTION --- */}
      <section className="home">
        <div className="home-left">
          <h1>
            <em>Your Health, Our Priority.</em>
          </h1>
          <p>
            We unite innovation and empathy to redefine healthcare — blending
            modern medical expertise with heartfelt human connection to help you
            heal, recover, and thrive.
          </p>
          <button className="home-btn">
            Book Appointment <MdOutlineBookmarkBorder />
          </button>
        </div>

        <div className="home-right">
          <div className="carousel-slide">
            <img
              src={slides[current].image}
              alt={slides[current].title}
              className="carousel-image"
            />
            <div className="carousel-overlay">
              <h3>{slides[current].title}</h3>
            </div>
          </div>

          <div className="carousel-dots">
            {slides.map((_, index) => (
              <span
                key={index}
                className={`dot ${index === current ? "active" : ""}`}
                onClick={() => setCurrent(index)}
              ></span>
            ))}
          </div>
        </div>
      </section>

      {/* --- INTRO SECTION --- */}
      <section className="hero-section text-center">
        <div className="container">
          <p className="welcome-text fw-semibold text-uppercase mb-2">
            Welcome to Hospitaled
          </p>

          <h1 className="hero-title mb-3">A Great Place to Receive Care</h1>

          <p className="hero-desc mx-auto mb-4">
            We provide top-quality healthcare services using modern facilities
            and compassionate medical professionals who are dedicated to your
            wellness.
          </p>

          <button className="hero-btn">
            See More <MdOutlineArrowForward />
          </button>

          <div className="carousel-container mt-5">
            <img
              src={slides[current].image}
              alt={slides[current].title}
              className="hero-image"
            />
          </div>
        </div>
      </section>

      {/* --- SERVICES SECTION --- */}
      <section className="services-section">
        <div className="services-header">
          <h2>
            Provide our <span>Best Services</span>
          </h2>
          <p>
            Comprehensive medical care with state-of-the-art facilities and
            expert healthcare professionals dedicated to your well-being.
          </p>
        </div>

        <div className="services-grid">
          <div className="service-card">
            <MdLocalHospital className="service-icon" />
            <h3>Emergency Care</h3>
            <p>
              24/7 emergency services with rapid response teams and advanced
              life support systems.
            </p>
            <strong>Available 24/7</strong>
          </div>

          <div className="service-card">
            <FaHeart className="service-icon" />
            <h3>Cardiology</h3>
            <p>
              Expert heart care including diagnostics, treatments, and cardiac
              rehabilitation programs.
            </p>
            <strong>1500+ Patients</strong>
          </div>

          <div className="service-card">
            <FaChild className="service-icon" />
            <h3>Pediatrics</h3>
            <p>
              Compassionate care for infants, children, and adolescents with
              specialized pediatric services.
            </p>
            <strong>500+ Newborns</strong>
          </div>

          <div className="service-card">
            <MdAddBox className="service-icon" />
            <h3>Surgery</h3>
            <p>
              Advanced surgical procedures with cutting-edge technology and
              minimally invasive techniques.
            </p>
            <strong>98% Success</strong>
          </div>
        </div>

        <div className="services-footer">
          <button className="view-services-btn">
            View All Services <MdOutlineArrowForward />
          </button>
        </div>
      </section>

      {/* --- NEWS SECTION --- */}
      <section className="news-section">
        <h2 className="news-title">
          <span className="highlight">Latest</span> News and Health Articles
        </h2>

        <div className="news-grid">
          {[
            {
              title: "Online Mother's Breastfeeding Class: From Overwhelmed...",
              date: "Oct 07, 2025",
            },
            {
              title: "Palliative Lay Forum: Achieving the Miracle...",
              date: "Oct 04, 2025",
            },
            {
              title: "CARMI Reunion 2025: Growing Forward: 15 Years...",
              date: "Oct 18, 2025",
            },
            {
              title: "Brain Connects 2025",
              date: "Oct 06–12, 2025",
            },
          ].map((item, i) => (
            <div className="news-card" key={i}>
              <div className="news-image">Event {i + 1}</div>
              <div className="news-content">
                <h3 className="news-heading">{item.title}</h3>
                <p className="news-date">{item.date}</p>
              </div>
            </div>
          ))}
        </div>

        <button className="news-btn">
          View All News <MdOutlineArrowForward />
        </button>
      </section>
    </div>
  );
}

export default Home;
