import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../components/components-css/ComponentNews.css";
import Chatbot from "../components/Chatbot";

const Announcements = () => {
  const announcements = [
    {
      id: 1,
      title: "New Hospital Wing Opening",
      image: "https://via.placeholder.com/600x300?text=New+Wing",
      date: "March 2, 2025",
      description:
        "We’re thrilled to announce the opening of our new hospital wing, designed to expand patient capacity and provide top-notch care.",
    },
    {
      id: 2,
      title: "Free Flu Vaccination Drive",
      image: "https://via.placeholder.com/600x300?text=Flu+Vaccination",
      date: "February 18, 2025",
      description:
        "Join our community health campaign offering free flu shots for all — keeping our community healthy this season!",
    },
    {
      id: 3,
      title: "24/7 Emergency Services Expansion",
      image: "https://via.placeholder.com/600x300?text=Emergency+Expansion",
      date: "January 10, 2025",
      description:
        "We are proud to announce that our emergency department now operates 24/7 with more doctors and advanced facilities.",
    },
    {
      id: 4,
      title: "New Specialist Doctors Joined",
      image: "https://via.placeholder.com/600x300?text=New+Doctors",
      date: "December 20, 2024",
      description:
        "We welcome new specialists to our growing team, expanding our expertise in cardiology, neurology, and pediatrics.",
    },
    {
      id: 5,
      title: "Hospital Accreditation Achieved",
      image: "https://via.placeholder.com/600x300?text=Accreditation",
      date: "November 15, 2024",
      description:
        "We are officially accredited by national health authorities, ensuring quality and safety in all our services.",
    },
    {
      id: 6,
      title: "Blood Donation Campaign",
      image: "https://via.placeholder.com/600x300?text=Blood+Donation",
      date: "October 5, 2024",
      description:
        "Be a hero! Join our blood donation campaign and help save lives in our community.",
    },
  ];

  return (
    <div className="news-section container py-5">
      {/* ✨ Updated Title Style */}
      <h2 className="title-center mb-4">
        Latest <span className="title-primary">Updates & Announcements</span>
      </h2>

      <p className="intro-text text-center mb-5">
        Stay informed with our latest hospital updates, important advisories, and community initiatives.
      </p>

      <div className="row g-4">
        {announcements.map((item) => (
          <div key={item.id} className="col-12 col-md-6 col-lg-4">
            <div className="news-card card h-100 shadow-sm">
              <div
                className="news-img rounded-top"
                style={{
                  backgroundImage: `url(${item.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  height: "200px",
                }}
              ></div>

              <div className="card-body text-center d-flex flex-column justify-content-between">
                <div>
                  <h5 className="card-title fw-bold text-primary">{item.title}</h5>
                  <p className="text-muted small mb-2">{item.date}</p>
                  <p className="card-text text-secondary small">{item.description}</p>
                </div>
                <Link
                  to={`/announcements/${item.id}`}
                  className="btn btn-primary mt-3 align-self-center"
                >
                  Read More →
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
              <Chatbot />

    </div>
  );
};

export default Announcements;
