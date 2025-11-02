import { useState, useEffect } from "react";
import "../css/Home.css";
import {
  MdLocalHospital,
  MdAddBox,
  MdOutlineArrowForward,
  MdOutlineBookmarkBorder,
  MdClose,
} from "react-icons/md";
import { FaHeart, FaChild, FaComments } from "react-icons/fa";

function Home() {
  const slides = [
    { title: "Emergency Care", image: "doc.jpg" },
    { title: "24/7 Support", image: "doc.jpg" },
    { title: "Qualified Doctors", image: "doc.jpg" },
  ];

  const [current, setCurrent] = useState(0);
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "👋 Hi! I'm Lunax — your Healthcare Companion." },
  ]);
  const [input, setInput] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const handleSend = () => {
    if (!input.trim()) return;
    const newMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, newMessage]);
    setInput("");

    // Simulated bot response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "Thanks for reaching out! 💬 A representative will assist you soon.",
        },
      ]);
    }, 1000);
  };

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
            </div>

            {/* RIGHT COLUMN (Carousel) */}
            <div className="col-lg-6 col-md-12 home-right text-center px-lg-5 px-3">
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
            </div>
          </div>
        </div>
      </section>

      {/* --- Section 2: Hero --- */}
      <section className="hero-section text-center py-5">
        <div className="container">
          <div className="mx-auto" style={{ maxWidth: "800px" }}>
            <p className="welcome-text text-uppercase fw-semibold mb-2">
              Welcome to Hospitaled
            </p>
            <h1 className="hero-title mb-3">A Great Place to Receive Care</h1>
            <p className="hero-desc mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
              placerat scelerisque tortor ornare. Convallis felis vitae tortor
              augue. Velit nascetur proin massa in. Consequat faucibus porttitor
              enim et.
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
        </div>
      </section>

      {/* --- Section 3: Updates --- */}
      <section className="news-section py-5">
        <div className="container">
          <h2 className="news-title text-center mb-5">
            <span className="highlight text-primary">Latest</span> Updates and
            Announcements
          </h2>

          <div className="news-grid row flex-nowrap overflow-auto pb-3 px-2 px-lg-0">
            {[
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
                title: "CARMI Reunion 2025: Growing Forward: 15 Years...",
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

          <div className="text-center mt-4">
            <button className="news-btn">
              View All Announcements <MdOutlineArrowForward />
            </button>
          </div>
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
            {services.map((service, i) => (
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

          <div className="services-footer text-center mt-5">
            <button className="view-services-btn">
              View All Services <MdOutlineArrowForward />
            </button>
          </div>
        </div>
      </section>

      {/* --- Section 5: News and Health Tips --- */}
      <section className="news-section py-5">
        <div className="container">
          <h2 className="news-title text-center mb-5">
            <span className="highlight text-primary">Latest</span> News and
            Health Tips
          </h2>

          <div className="news-grid row flex-nowrap overflow-auto pb-3 px-2 px-lg-0">
            {[
              {
                title: "Healthy Living Tips for 2025",
                date: "Oct 07, 2025",
              },
              {
                title: "Nutrition Week: Eat Smart, Live Strong",
                date: "Oct 04, 2025",
              },
              {
                title: "Mental Health Awareness Month",
                date: "Oct 18, 2025",
              },
              {
                title: "Heart Care: Preventive Tips",
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
                      Article {i + 1}
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

          <div className="text-center mt-4">
            <button className="news-btn">
              View All News <MdOutlineArrowForward />
            </button>
          </div>
        </div>
      </section>

      {/* --- Section 6: Contact --- */}
      <section className="contact-section py-5 bg-light">
        <div className="container">
          <div className="row g-4 align-items-stretch">
            {/* CONTACT INFO */}
            <div className="col-lg-5 col-md-6">
              <div className="contact-info bg-white shadow-sm rounded-4 p-4 h-100">
                <h2 className="fw-bold mb-4">
                  <span className="text-primary2">Contact</span> Information
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
              </div>
            </div>

            {/* MAP */}
            <div className="col-lg-7 col-md-6">
              <div className="map-container rounded-4 overflow-hidden shadow-sm h-100">
                <iframe
                  title="Pasig Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3859.843023830412!2d121.0747!3d14.5670!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397b833ad9e7f43%3A0x4a6a9436f8b7a5b5!2sPasig%2C%20Metro%20Manila!5e0!3m2!1sen!2sph!4v1690000000000!5m2!1sen!2sph"
                  allowFullScreen
                  loading="lazy"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Floating Chatbot --- */}
      <div className="chatbot-container">
        <div className={`chatbot-popup-wrapper ${showChat ? "show" : ""}`}>
          {showChat && (
            <div className="chatbot-popup">
              <div className="chatbot-header">
                <div className="chatbot-info">
                  <img
                    src="lunax-avatar.png"
                    alt="Lunax"
                    className="chatbot-avatar"
                  />
                  <div>
                    <h5 className="mb-0">
                      Hi! I'm <span className="text-highlight">Lunax</span>
                    </h5>
                    <p className="mb-0 small text-white">Your Healthcare Companion</p>
                  </div>
                </div>
              </div>

              <div className="chatbot-messages">
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`chat-message ${
                      msg.sender === "user" ? "user-msg" : "bot-msg"
                    }`}
                  >
                    {msg.text}
                  </div>
                ))}
              </div>

              <div className="chatbot-input">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type a message..."
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                />
                <button onClick={handleSend}>➤</button>
              </div>
            </div>
          )}
        </div>

        <button
          className="chatbot-btn"
          onClick={() => setShowChat((prev) => !prev)}
        >
          {showChat ? <MdClose /> : <FaComments />}
        </button>
      </div>
    </div>
  );
}

export default Home;
