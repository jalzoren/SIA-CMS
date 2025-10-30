import React, { useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaTag } from "react-icons/fa";
import "../components/components-css/ComponentNews.css";

const ComponentAnnouncement = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  const announcements = {
    1: {
      shortTitle: "New Hospital Wing",
      title: "New Hospital Wing Opening",
      date: "March 2, 2025",
      author: "The Medical City",
      tags: ["Infrastructure", "Patient Care", "Innovation"],
      description:
        "We’re thrilled to announce the grand opening of our new hospital wing — a major step in enhancing our capacity to serve more patients comfortably and efficiently.",
      content: `
        The new hospital wing is equipped with state-of-the-art facilities and modern patient rooms.
        This milestone expansion strengthens our mission to deliver world-class healthcare
        to every Filipino family.
      `,
    },
    2: {
      shortTitle: "Free Flu Shots",
      title: "Free Flu Vaccination Drive",
      date: "February 10, 2025",
      author: "Public Health Department",
      tags: ["Community Health", "Vaccination", "Wellness"],
      description:
        "Join our hospital’s free flu vaccination campaign, open to all members of the community — because prevention is better than cure!",
      content: `
        Protect yourself and your loved ones this flu season.
        Our vaccination drive will be held at the hospital main lobby from 9 AM to 5 PM.
      `,
    },
  };

  const announcement = announcements[id] || announcements[1];

  return (
    <div className="news-container">
      <button className="back-btn" onClick={() => navigate("/announcements")}>
        <FaArrowLeft className="back-icon" /> Back
      </button>

      <div className="breadcrumb">
        <Link to="/announcements">Latest Announcements</Link>
        <span>/</span>
        <span className="active">{announcement.shortTitle}</span>
      </div>

      <h2 className="news-section-title">ANNOUNCEMENT</h2>

      <div className="news-layout">
        {/* MAIN ARTICLE */}
        <div className="news-main">
          <h4 className="news-short-title">{announcement.shortTitle}</h4>
          <h3 className="news-title">{announcement.title}</h3>

          <div className="news-tags">
            {announcement.tags.map((tag, index) => (
              <span key={index} className="tag">
                <FaTag className="tag-icon" /> {tag}
              </span>
            ))}
          </div>

          <p className="news-description">{announcement.description}</p>
          <p className="news-date">{announcement.date}</p>
          <hr />

          <div className="news-image"></div>
          <p className="photo-credit">Photo by: {announcement.author}</p>

          <div className="news-body">
            <p>{announcement.content}</p>
          </div>
        </div>

        {/* SIDEBAR */}
        <aside className="news-sidebar">
          <div className="sidebar-box">
            <h4 className="sidebar-title">More Announcements</h4>
            <ul className="sidebar-list">
              <li className="sidebar-item">
                <Link to="/announcements/1" className="sidebar-link">
                  <h5>New Hospital Wing Opening</h5>
                  <p className="sidebar-date">March 2, 2025</p>
                </Link>
              </li>
              <li className="sidebar-item">
                <Link to="/announcements/2" className="sidebar-link">
                  <h5>Free Flu Vaccination Drive</h5>
                  <p className="sidebar-date">February 10, 2025</p>
                </Link>
              </li>
              <li className="sidebar-item">
                <a href="#" className="sidebar-link">
                  <h5>Updated Visitor Guidelines</h5>
                  <p className="sidebar-date">May 5, 2025</p>
                </a>
              </li>
              <li className="sidebar-item">
                <a href="#" className="sidebar-link">
                  <h5>New Parking Area Available</h5>
                  <p className="sidebar-date">April 28, 2025</p>
                </a>
              </li>
              <li className="sidebar-item">
                <a href="#" className="sidebar-link">
                  <h5>Health Awareness Week Activities</h5>
                  <p className="sidebar-date">January 14, 2025</p>
                </a>
              </li>
            </ul>
          </div>

          <div className="ad-box">
            <h4 className="ad-title">Sponsored</h4>
            <div className="ad-placeholder">Ad Space</div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default ComponentAnnouncement;
