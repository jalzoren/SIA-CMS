import React, { useState, useEffect } from "react";
import "../css/Home.css";
import Hospi from "../assets/images/img1.jpg";

const Home = () => {
  const images = [
    "https://plus.unsplash.com/premium_photo-1658506671316-0b293df7c72b?auto=format&fit=crop&q=80&w=1170",
    "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=1170",
    "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&q=80&w=1332",
  ];

  const [current, setCurrent] = useState(0);
  const nextImage = () => setCurrent((prev) => (prev + 1) % images.length);
  const prevImage = () =>
    setCurrent((prev) => (prev - 1 + images.length) % images.length);

  useEffect(() => {
    const interval = setInterval(nextImage, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="home-page">
      {/* ===== Hero Section ===== */}
      <section className="home-hero">
        <div className="home-content">
          <div className="home-text">
            <h1>
              <span className="italic">Your Health</span> Is Our Priority
            </h1>
            <p>
              At <strong>Hospitaled</strong>, we provide world-class healthcare
              services with compassion and professionalism. From emergency care
              to specialist treatments, our dedicated team ensures your
              well-being is always first.
            </p>
            <button className="learn-more-btn">Learn More</button>
          </div>

          <div className="home-image">
            <button className="nav-btn left" onClick={prevImage}>
              ❮
            </button>
            <img src={images[current]} alt="Hospital staff and patients" />
            <button className="nav-btn right" onClick={nextImage}>
              ❯
            </button>
          </div>
        </div>
      </section>

      {/* ===== Welcome Section ===== */}
      <section className="welcome-section">
        <h4>WELCOME TO HOSPITALED</h4>
        <h2>
          A <span>Great Place</span> to Receive Care
        </h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
          placerat scelerisque tortor ornare ornare. Convallis felis vitae
          tortor augue. Velit nascetur proin massa in. Consequat faucibus
          porttitor enim et.
        </p>
        <button className="see-more-btn">See More →</button>
        <div className="welcome-image">
          <img src={Hospi} alt="Hospital team" />
        </div>
      </section>

      {/* ===== Services Section ===== */}
      <section className="services-section">
        <div className="services-header">
          <h2>
            Provide our <span>Best Services</span>
          </h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
            placerat scelerisque tortor ornare ornare. Velit nascetur proin
            massa in. Consequat faucibus porttitor enim et.
          </p>
        </div>

        <div className="services-grid">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="service-card"></div>
          ))}
        </div>

        <div className="services-footer">
          <button className="view-services-btn">View all Services →</button>
        </div>
      </section>

      {/* ===== Latest Updates Section ===== */}
      <section className="latest-updates">
        <h2>
          Latest <span>Updates</span>
        </h2>
        <div className="updates-grid">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="update-card">
              <div className="update-img"></div>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              <a href="#">Learn More →</a>
            </div>
          ))}
        </div>
        <button className="view-news-btn">View All News →</button>
      </section>

      {/* ===== Contact & Map Section ===== */}
      <section className="contact-section">
        <div className="contact-content">
          <div className="contact-info">
            <h2>
              Contact <span>Information</span>
            </h2>
            <ul>
              <li>
                <strong>Address:</strong> 123 Medical Center, City, Country
              </li>
              <li>
                <strong>Phone:</strong> +1 234 567 890
              </li>
              <li>
                <strong>Email:</strong> contact@hospitaled.com
              </li>
            </ul>
          </div>

          <div className="contact-map">
            <iframe
              title="PLP Pasig Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3870.123456789!2d121.0721751!3d14.5620941!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397c87941df8e2b%3A0xc7cd5073d3d73742!2zUGF tYW50YXNhbiBuZyBMdW5nY2vkbiBuZyBQYXNpZywgUGFz aWcsIFBob3lsaW5lcywgUGhpbGlwcGluZXMgQmF5!5e0!3m2!1sen!2s!4v1686508911844!5m2!1sen!2s"
              width="100%"
              height="300"
              style={{ border: 0, borderRadius: "10px" }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
