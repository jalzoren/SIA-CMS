import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Home.css"; // <-- Updated CSS
import {
  MdLocalHospital,
  MdAddBox,
  MdOutlineArrowForward,
  MdOutlineBookmarkBorder,
} from "react-icons/md";
import { FaHeart, FaChild, FaChevronDown } from "react-icons/fa";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Chatbot from "../components/Chatbot";
import "bootstrap/dist/css/bootstrap.min.css";
import useAppearance from "../hooks/useAppearance";

function Home2() {
  const navigate = useNavigate();
  const { appearance, loading: appearanceLoading } = useAppearance();

  const slides = [
    { title: "Emergency Care", image: "doc.jpg" },
    { title: "24/7 Support", image: "doc.jpg" },
    { title: "Qualified Doctors", image: "doc.jpg" },
  ];

  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(true);
  const [announcements, setAnnouncements] = useState([]);
  const [newsLoading, setNewsLoading] = useState(true);
  const [news, setNews] = useState([]);
  const [newsSectionLoading, setNewsSectionLoading] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 1800);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/announcements");
        let data = await res.json();
        data = data.filter((item) => item.status === "published");
        setAnnouncements(data);
      } catch (err) {
        console.error(err);
      } finally {
        setNewsLoading(false);
      }
    };
    fetchAnnouncements();
  }, []);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/news");
        const data = await res.json();
        setNews(data);
      } catch (err) {
        console.error(err);
      } finally {
        setNewsSectionLoading(false);
      }
    };
    fetchNews();
  }, []);

  const services = [
    {
      icon: <MdLocalHospital className="svc-icon" />,
      title: "Emergency Care",
      text: "24/7 emergency services with rapid response teams and advanced life support systems.",
      stat: "Available 24/7",
    },
    {
      icon: <FaHeart className="svc-icon" />,
      title: "Cardiology",
      text: "Expert heart care including diagnostics, treatments, and cardiac rehabilitation programs.",
      stat: "1500+ Patients",
    },
    {
      icon: <FaChild className="svc-icon" />,
      title: "Pediatrics",
      text: "Compassionate care for infants, children, and adolescents with specialized pediatric services.",
      stat: "500+ Newborns",
    },
    {
      icon: <MdAddBox className="svc-icon" />,
      title: "Surgery",
      text: "Advanced surgical procedures with cutting-edge technology and minimally invasive techniques.",
      stat: "98% Success",
    },
  ];

  if (appearanceLoading) return <div className="loader">Loading appearance...</div>;

  return (
    <div
      className="new-home"
      style={{
        fontFamily: appearance.fontFamily,
        fontSize:
          appearance.fontSize === "Small"
            ? "14px"
            : appearance.fontSize === "Medium"
            ? "17px"
            : "20px",
        color: appearance.fontColor === "Header" ? "#111" : "#444",
        background:
          appearance.themeColor === "bg-primary"
            ? "#f0f7ff"
            : appearance.themeColor === "bg-info"
            ? "#e6f4ff"
            : "#fdfdfd",
      }}
    >
      {/* HERO - Full Width Gradient + Floating Card */}
      <section className="hero-v2">
        <div className="hero-bg"></div>
        <div className="container">
          <div className="hero-content">
            {loading ? (
              <div className="skeleton-hero">
                <Skeleton height={70} width="70%" />
                <Skeleton count={2} width="85%" />
                <Skeleton width={200} height={50} style={{ marginTop: 20 }} />
              </div>
            ) : (
              <>
                <h1 className="hero-title">
                  Your Health, <span>Our Priority</span>
                </h1>
                <p className="hero-desc">
                  We unite innovation and empathy to redefine healthcare —
                  blending modern medical expertise with heartfelt human
                  connection to help you heal, recover, and thrive.
                </p>
                <button className="hero-cta">
                  Book Appointment <MdOutlineBookmarkBorder />
                </button>
              </>
            )}
          </div>
          <div className="hero-image-card">
            {loading ? (
              <Skeleton height={380} borderRadius={24} />
            ) : (
              <div className="image-slider">
                <img
                  src={slides[current].image}
                  alt={slides[current].title}
                  className="slide-img"
                />
                <div className="slide-caption">{slides[current].title}</div>
              </div>
            )}
          </div>
        </div>
        <div className="scroll-hint">
          <FaChevronDown className="pulse" />
        </div>
      </section>

      {/* ANNOUNCEMENTS - Vertical Stacked */}
      <section className="section-pad">
        <div className="container">
          <h2 className="section-head">
            Latest <span>Announcements</span>
          </h2>
          <div className="announce-grid">
            {newsLoading
              ? Array(3)
                  .fill()
                  .map((_, i) => (
                    <div key={i} className="announce-card skeleton">
                      <Skeleton height={160} borderRadius={16} />
                      <Skeleton height={20} width="80%" style={{ marginTop: 12 }} />
                      <Skeleton height={16} width="50%" />
                    </div>
                  ))
              : announcements.slice(0, 3).map((item) => (
                  <div
                    key={item.id}
                    className="announce-card"
                    onClick={() => navigate(`/announcements/${item.id}`)}
                  >
                    <div className="announce-img">
                      {item.image ? (
                        <img src={item.image} alt={item.short_title} />
                      ) : (
                        <div className="no-img">No Image</div>
                      )}
                    </div>
                    <div className="announce-body">
                      <h4>{item.short_title}</h4>
                      <p className="date">
                        {new Date(item.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
          </div>
          {!newsLoading && announcements.length > 3 && (
            <div className="text-center">
              <button
                className="view-more-btn"
                onClick={() => navigate("/announcements")}
              >
                View All Announcements <MdOutlineArrowForward />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* NEWS & TIPS - Clean Vertical Feed */}
      <section className="section-pad bg-light">
        <div className="container">
          <h2 className="section-head">
            Health <span>News & Tips</span>
          </h2>
          <div className="news-feed">
            {newsSectionLoading
              ? Array(4)
                  .fill()
                  .map((_, i) => (
                    <div key={i} className="news-item skeleton">
                      <Skeleton height={100} width={100} circle />
                      <div style={{ flex: 1, marginLeft: 16 }}>
                        <Skeleton height={20} width="70%" />
                        <Skeleton height={16} width="40%" style={{ marginTop: 8 }} />
                      </div>
                    </div>
                  ))
              : news.slice(0, 4).map((item) => (
                  <div
                    key={item.id}
                    className="news-item"
                    onClick={() => navigate(`/news/${item.id}`)}
                  >
                    <div className="news-thumb">
                      {item.image_url ? (
                        <img src={item.image_url} alt={item.short_title} />
                      ) : (
                        <div className="no-img">No Image</div>
                      )}
                    </div>
                    <div className="news-info">
                      <h5>{item.short_title || item.full_title}</h5>
                      <p className="date">
                        {new Date(item.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
          </div>
          {!newsSectionLoading && news.length > 4 && (
            <div className="text-center">
              <button className="view-more-btn" onClick={() => navigate("/news")}>
                View All News <MdOutlineArrowForward />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* SERVICES - Icon Grid */}
      <section className="section-pad">
        <div className="container text-center">
          <h2 className="section-head">
            Our <span>Best Services</span>
          </h2>
          <p className="section-sub">
            Comprehensive medical care with state-of-the-art facilities and
            expert healthcare professionals.
          </p>
          <div className="services-grid">
            {loading
              ? Array(4)
                  .fill()
                  .map((_, i) => (
                    <div key={i} className="svc-card skeleton">
                      <Skeleton height={80} width={80} circle />
                      <Skeleton height={24} width="70%" style={{ marginTop: 16 }} />
                      <Skeleton count={2} />
                    </div>
                  ))
              : services.map((s, i) => (
                  <div key={i} className="svc-card">
                    <div className="svc-icon-circle">{s.icon}</div>
                    <h3>{s.title}</h3>
                    <p>{s.text}</p>
                    <strong className="stat">{s.stat}</strong>
                  </div>
                ))}
          </div>
          {!loading && (
            <button className="view-more-btn">
              View All Services <MdOutlineArrowForward />
            </button>
          )}
        </div>
      </section>

      {/* CONTACT + MAP - Split Glass */}
      <section className="section-pad bg-light">
        <div className="container">
          <div className="contact-split">
            <div className="contact-card glass">
              {loading ? (
                <Skeleton count={6} height={20} />
              ) : (
                <>
                  <h2>
                    Contact <span>Information</span>
                  </h2>
                  <div className="info-line">
                    <strong>Address:</strong>
                    <p>Kapasigan, Pasig City, Metro Manila</p>
                  </div>
                  <div className="info-line">
                    <strong>Phone:</strong>
                    <p>+63 912 345 6789</p>
                  </div>
                  <div className="info-line">
                    <strong>Email:</strong>
                    <p>info@example.com</p>
                  </div>
                </>
              )}
            </div>
            <div className="map-card glass">
              {loading ? (
                <Skeleton height={400} borderRadius={20} />
              ) : (
                <iframe
                  title="Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3859.843023830412!2d121.0747!3d14.5670!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397b833ad9e7f43%3A0x4a6a9436f8b7a5b5!2sPasig%2C%20Metro%20Manila!5e0!3m2!1sen!2sph!4v1690000000000!5m2!1sen!2sph"
                  allowFullScreen
                  loading="lazy"
                ></iframe>
              )}
            </div>
          </div>
          <Chatbot />
        </div>
      </section>
    </div>
  );
}

export default Home2;