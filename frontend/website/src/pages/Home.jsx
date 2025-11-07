import { useState, useEffect } from "react";
import "../css/Home.css";
import {
  MdLocalHospital,
  MdAddBox,
  MdOutlineArrowForward,
  MdOutlineBookmarkBorder,
} from "react-icons/md";
import { FaHeart, FaChild } from "react-icons/fa";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Chatbot from "../components/Chatbot";

function Home() {
  const slides = [
    { title: "Emergency Care", image: "doc.jpg" },
    { title: "24/7 Support", image: "doc.jpg" },
    { title: "Qualified Doctors", image: "doc.jpg" },
  ];

  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [slides.length]);

  // Simulate content loading
  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timeout);
  }, []);

  const services = [
    {
      icon: <MdLocalHospital className="service-icon" />,
      title: "Emergency Care",
      text: "24/7 emergency services with rapid response teams and advanced life support systems.",
      stat: "Available 24/7",
    },
    {
      icon: <FaHeart className="service-icon" />,
      title: "Cardiology",
      text: "Expert heart care including diagnostics, treatments, and cardiac rehabilitation programs.",
      stat: "1500+ Patients",
    },
    {
      icon: <FaChild className="service-icon" />,
      title: "Pediatrics",
      text: "Compassionate care for infants, children, and adolescents with specialized pediatric services.",
      stat: "500+ Newborns",
    },
    {
      icon: <MdAddBox className="service-icon" />,
      title: "Surgery",
      text: "Advanced surgical procedures with cutting-edge technology and minimally invasive techniques.",
      stat: "98% Success",
    },
  ];

  return (
    <div>
      {/* --- Section 1: Home --- */}
      <section className="home-section py-lg-5 py-1">
        <div className="container py-lg-4 py-3">
          <div className="row align-items-center justify-content-between bg-white g-lg-5 g-3">
            {/* LEFT COLUMN */}
            <div className="col-lg-6 col-md-12 home-left text-center text-lg-start px-lg-5 px-3">
              {loading ? (
                <>
                  <Skeleton height={50} width={250} />
                  <Skeleton count={3} />
                  <Skeleton width={150} height={40} />
                </>
              ) : (
                <>
                  <h1 className="display-4 fw-bold mb-4">
                    <em>Your Health, Our Priority.</em>
                  </h1>
                  <p className="fs-5 text-secondary mb-4">
                    We unite innovation and empathy to redefine healthcare —
                    blending modern medical expertise with heartfelt human
                    connection to help you heal, recover, and thrive.
                  </p>
                  <button className="home-btn">
                    Book Appointment <MdOutlineBookmarkBorder />
                  </button>
                </>
              )}
            </div>

            {/* RIGHT COLUMN (Carousel) */}
            <div className="col-lg-6 col-md-12 home-right text-center px-lg-5 px-3">
              {loading ? (
                <Skeleton height={350} borderRadius={20} />
              ) : (
                <>
                  <div className="carousel-slide mx-auto">
                    <img
                      src={slides[current].image}
                      alt={slides[current].title}
                      className="carousel-image"
                    />
                    <div className="carousel-overlay">
                      <h3>{slides[current].title}</h3>
                    </div>
                  </div>

                  <div className="carousel-dots mt-3">
                    {slides.map((_, index) => (
                      <span
                        key={index}
                        className={`dot ${index === current ? "active" : ""}`}
                        onClick={() => setCurrent(index)}
                      ></span>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* --- Section 2: Hero --- */}
      <section className="hero-section text-center py-5">
        <div className="container">
          {loading ? (
            <Skeleton count={5} height={20} />
          ) : (
            <>
              <div className="mx-auto" style={{ maxWidth: "800px" }}>
                <p className="welcome-text text-uppercase fw-semibold mb-2">
                  Welcome to Hospitaled
                </p>
                <h1 className="hero-title mb-3">
                  A Great Place to Receive Care
                </h1>
                <p className="hero-desc mb-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Quisque placerat scelerisque tortor ornare.
                </p>
                <button className="hero-btn">
                  See More <MdOutlineArrowForward />
                </button>
              </div>

              <div className="carousel-container mt-5">
                <img
                  src={slides[current].image}
                  alt={slides[current].title}
                  className="hero-image mx-auto d-block"
                />
              </div>
            </>
          )}
        </div>
      </section>

      {/* --- Section 3: News --- */}
      <section className="news-section py-5">
        <div className="container">
          <h2 className="news-title text-center mb-5">
            <span className="highlight text-primary">Latest</span> Updates and
            Announcements
          </h2>

          <div className="news-grid row flex-nowrap overflow-auto pb-3 px-2 px-lg-0">
            {loading
              ? Array(4)
                  .fill()
                  .map((_, i) => (
                    <div
                      className="col-lg-3 col-md-6 col-sm-8 flex-shrink-0"
                      key={i}
                      style={{ minWidth: "260px" }}
                    >
                      <Skeleton height={220} borderRadius={20} />
                    </div>
                  ))
              : [
                  {
                    title:
                      "Online Mother's Breastfeeding Class: From Overwhelmed...",
                    date: "Oct 07, 2025",
                  },
                  {
                    title: "Palliative Lay Forum: Achieving the Miracle...",
                    date: "Oct 04, 2025",
                  },
                  {
                    title:
                      "CARMI Reunion 2025: Growing Forward: 15 Years...",
                    date: "Oct 18, 2025",
                  },
                  {
                    title: "Brain Connects 2025",
                    date: "Oct 06–12, 2025",
                  },
                ].map((item, i) => (
                  <div
                    className="col-lg-3 col-md-6 col-sm-8 flex-shrink-0"
                    key={i}
                    style={{ minWidth: "260px" }}
                  >
                    <div className="news-card bg-white rounded-4 shadow-sm h-100 d-flex flex-column">
                      <div
                        className="news-image bg-light d-flex align-items-center justify-content-center rounded-top-4"
                        style={{ height: "180px" }}
                      >
                        <span className="text-secondary fw-semibold">
                          Event {i + 1}
                        </span>
                      </div>

                      <div className="news-content p-3 flex-grow-1">
                        <h5 className="news-heading mb-2 text-primary">
                          {item.title}
                        </h5>
                        <p className="news-date text-muted small mb-0">
                          {item.date}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
          </div>

          {!loading && (
            <div className="text-center mt-4">
              <button className="news-btn">
                View All Announcements <MdOutlineArrowForward />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* --- Section 4: Services --- */}
      <section className="services-section py-5">
        <div className="container text-center">
          <div className="services-header mb-5">
            <h2 className="fw-bold">
              Provide our <span className="text-primary2">Best Services</span>
            </h2>
            <p className="text">
              Comprehensive medical care with state-of-the-art facilities and
              expert healthcare professionals dedicated to your well-being.
            </p>
          </div>

          <div className="row g-4 justify-content-center">
            {loading
              ? Array(4)
                  .fill()
                  .map((_, i) => (
                    <div className="col-lg-3 col-md-6 col-sm-10" key={i}>
                      <Skeleton height={250} borderRadius={20} />
                    </div>
                  ))
              : services.map((service, i) => (
                  <div className="col-lg-3 col-md-6 col-sm-10" key={i}>
                    <div className="service-card bg-white rounded-4 shadow-sm p-4 h-100">
                      {service.icon}
                      <h3 className="service-title mt-3">{service.title}</h3>
                      <p className="service-text">{service.text}</p>
                      <strong className="service-stat text-primary2">
                        {service.stat}
                      </strong>
                    </div>
                  </div>
                ))}
          </div>

          {!loading && (
            <div className="services-footer text-center mt-5">
              <button className="view-services-btn">
                View All Services <MdOutlineArrowForward />
              </button>
            </div>
          )}
        </div>
      </section>

       <section className="news-section py-5">
        <div className="container">
          <h2 className="news-title text-center mb-5">
            <span className="highlight text-primary">Latest</span> News
          </h2>

          <div className="news-grid row flex-nowrap overflow-auto pb-3 px-2 px-lg-0">
            {loading
              ? Array(4)
                  .fill()
                  .map((_, i) => (
                    <div
                      className="col-lg-3 col-md-6 col-sm-8 flex-shrink-0"
                      key={i}
                      style={{ minWidth: "260px" }}
                    >
                      <Skeleton height={220} borderRadius={20} />
                    </div>
                  ))
              : [
                  {
                    title:
                      "Online Mother's Breastfeeding Class: From Overwhelmed...",
                    date: "Oct 07, 2025",
                  },
                  {
                    title: "Palliative Lay Forum: Achieving the Miracle...",
                    date: "Oct 04, 2025",
                  },
                  {
                    title:
                      "CARMI Reunion 2025: Growing Forward: 15 Years...",
                    date: "Oct 18, 2025",
                  },
                  {
                    title: "Brain Connects 2025",
                    date: "Oct 06–12, 2025",
                  },
                ].map((item, i) => (
                  <div
                    className="col-lg-3 col-md-6 col-sm-8 flex-shrink-0"
                    key={i}
                    style={{ minWidth: "260px" }}
                  >
                    <div className="news-card bg-white rounded-4 shadow-sm h-100 d-flex flex-column">
                      <div
                        className="news-image bg-light d-flex align-items-center justify-content-center rounded-top-4"
                        style={{ height: "180px" }}
                      >
                        <span className="text-secondary fw-semibold">
                          Event {i + 1}
                        </span>
                      </div>

                      <div className="news-content p-3 flex-grow-1">
                        <h5 className="news-heading mb-2 text-primary">
                          {item.title}
                        </h5>
                        <p className="news-date text-muted small mb-0">
                          {item.date}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
          </div>

          {!loading && (
            <div className="text-center mt-4">
              <button className="news-btn">
                View All News <MdOutlineArrowForward />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* --- Section 5: Contact --- */}
      <section className="contact-section py-5 bg-light">
        <div className="container">
          <div className="row g-4 align-items-stretch">
            <div className="col-lg-5 col-md-6">
              <div className="contact-info bg-white shadow-sm rounded-4 p-4 h-100">
                {loading ? (
                  <Skeleton count={6} height={20} />
                ) : (
                  <>
                    <h2 className="fw-bold mb-4">
                      <span className="text-primary2">Contact</span>{" "}
                      Information
                    </h2>
                    <div className="info-item mb-3">
                      <h5 className="fw-semibold">Address:</h5>
                      <p className="text-muted mb-0">
                        Kapasigan, Pasig City, Metro Manila
                      </p>
                    </div>
                    <div className="info-item mb-3">
                      <h5 className="fw-semibold">Phone:</h5>
                      <p className="text-muted mb-0">+63 912 345 6789</p>
                    </div>
                    <div className="info-item mb-3">
                      <h5 className="fw-semibold">Email:</h5>
                      <p className="text-muted mb-0">info@example.com</p>
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="col-lg-7 col-md-6">
              {loading ? (
                <Skeleton height={350} borderRadius={20} />
              ) : (
                <div className="map-container rounded-4 overflow-hidden shadow-sm h-100">
                  <iframe
                    title="Pasig Map"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3859.843023830412!2d121.0747!3d14.5670!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397b833ad9e7f43%3A0x4a6a9436f8b7a5b5!2sPasig%2C%20Metro%20Manila!5e0!3m2!1sen!2sph!4v1690000000000!5m2!1sen!2sph"
                    allowFullScreen
                    loading="lazy"
                  ></iframe>
                </div>
              )}
            </div>

            <Chatbot />
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
