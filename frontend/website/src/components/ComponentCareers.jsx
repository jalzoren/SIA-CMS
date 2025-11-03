import React, { useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaTag } from "react-icons/fa";
import "../components/components-css/ComponentNews.css";

const ComponentCareers = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  const careers = {
    1: {
      shortTitle: "Registered Nurse",
      title: "Registered Nurse",
      date: "October 10, 2025",
      author: "HR Department",
      tags: ["Healthcare", "Patient Care", "Nursing"],
      description:
        "Provide quality nursing care and support to patients in a compassionate hospital environment.",
      content: `
        As a Registered Nurse, you’ll be part of a dedicated team providing
        patient-centered care and ensuring the highest standards of safety
        and professionalism. You’ll assist physicians, administer medications,
        and monitor patient progress to promote recovery and wellness.
      `,
    },
    2: {
      shortTitle: "Medical Technologist",
      title: "Medical Technologist",
      date: "October 8, 2025",
      author: "Laboratory Department",
      tags: ["Diagnostics", "Medical Lab", "Testing"],
      description:
        "Perform diagnostic laboratory tests and assist in the early detection of diseases.",
      content: `
        As a Medical Technologist, you will conduct various clinical tests that
        aid in disease diagnosis and patient treatment. Attention to detail,
        precision, and a passion for medical science are key to this role.
      `,
    },
    3: {
      shortTitle: "Radiologic Technologist",
      title: "Radiologic Technologist",
      date: "October 5, 2025",
      author: "Imaging Department",
      tags: ["Radiology", "Diagnostics", "Technology"],
      description:
        "Operate imaging equipment and ensure safety and accuracy in radiologic procedures.",
      content: `
        This role involves capturing high-quality diagnostic images while ensuring
        patient safety. You will work closely with physicians and other healthcare
        professionals to aid in accurate diagnoses.
      `,
    },
  };

  const job = careers[id] || careers[1];

  return (
    <div className="news-container">
      {/* Back Button */}
      <button className="back-btn" onClick={() => navigate("/careers")}>
        <FaArrowLeft className="back-icon" /> Back
      </button>

      {/* Breadcrumb Navigation */}
      <div className="breadcrumb">
        <Link to="/careers">Career Opportunities</Link>
        <span>/</span>
        <span className="active">{job.shortTitle}</span>
      </div>

      {/* Section Header */}
      <h2 className="news-section-title">CAREER OPPORTUNITY & EVENTS</h2>

      <div className="news-layout">
        {/* MAIN CONTENT */}
        <div className="news-main">
          <h4 className="news-short-title">{job.shortTitle}</h4>
          <h3 className="news-title">{job.title}</h3>

          <div className="news-tags">
            {job.tags.map((tag, index) => (
              <span key={index} className="tag">
                <FaTag className="tag-icon" /> {tag}
              </span>
            ))}
          </div>

          <p className="news-description">{job.description}</p>
          <p className="news-date">{job.date}</p>
          <hr />

          <div className="news-image"></div>
          <p className="photo-credit">Posted by: {job.author}</p>

          <div className="news-body">
            <p>{job.content}</p>
          </div>
        </div>

        {/* SIDEBAR */}
        <aside className="news-sidebar">
          <div className="sidebar-box">
            <h4 className="sidebar-title">More Job Openings</h4>
            <ul
              className="sidebar-list"
              style={{
                maxHeight: "400px",
                overflowY: "auto",
                scrollbarWidth: "thin",
                paddingRight: "8px",
              }}
            >
              <li className="sidebar-item">
                <Link to="/careers/1" className="sidebar-link">
                  <h5>Registered Nurse</h5>
                  <p className="sidebar-date">October 10, 2025</p>
                </Link>
              </li>
              <li className="sidebar-item">
                <Link to="/careers/2" className="sidebar-link">
                  <h5>Medical Technologist</h5>
                  <p className="sidebar-date">October 8, 2025</p>
                </Link>
              </li>
              <li className="sidebar-item">
                <Link to="/careers/3" className="sidebar-link">
                  <h5>Radiologic Technologist</h5>
                  <p className="sidebar-date">October 5, 2025</p>
                </Link>
              </li>
              <li className="sidebar-item">
                <a href="#" className="sidebar-link">
                  <h5>Pharmacist</h5>
                  <p className="sidebar-date">October 3, 2025</p>
                </a>
              </li>
              <li className="sidebar-item">
                <a href="#" className="sidebar-link">
                  <h5>Front Desk Officer</h5>
                  <p className="sidebar-date">October 1, 2025</p>
                </a>
              </li>
              <li className="sidebar-item">
                <a href="#" className="sidebar-link">
                  <h5>HR Assistant</h5>
                  <p className="sidebar-date">September 25, 2025</p>
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

export default ComponentCareers;
