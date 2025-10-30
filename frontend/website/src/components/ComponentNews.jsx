import React from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaTag } from "react-icons/fa";
import "../components/components-css/ComponentNews.css";

const ComponentNews = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const articles = {
    1: {
      shortTitle: "Accessible Liver Transplantation",
      title:
        "Hope at Home: The Medical City Champions Accessible Liver Transplantation for Filipinos",
      date: "February 18, 2025",
      author: "CMS",
      tags: ["Transplant", "Accessibility", "Health Innovation"],
      description:
        "The Medical City takes a leap forward in making liver transplantation more accessible and affordable for Filipinos nationwide.",
      content: `
        The Medical City champions accessibility by offering cost-efficient liver transplantation options.
        This initiative bridges the gap between innovation and inclusivity, ensuring every Filipino
        has a chance at life-saving medical care.
      `,
    },
    2: {
      shortTitle: "Breakthrough in Cancer Care",
      title: "The Medical City Leads Breakthrough in Cancer Care for Filipinos",
      date: "March 12, 2025",
      author: "Health Desk",
      tags: ["Cancer", "Medical Research", "Wellness"],
      description:
        "A major advancement in cancer care brings new hope for patients, enhancing survival and recovery through precision medicine.",
      content: `
        The Medical City announces a groundbreaking advancement in cancer treatment through precision medicine and targeted therapy.
        This innovation enhances survival rates and improves patient recovery experiences.
      `,
    },
    3: {
      shortTitle: "Expanding Pediatric Care",
      title: "TMC Expands Pediatric Services for the Next Generation",
      date: "April 2, 2025",
      author: "TMC Communications",
      tags: ["Pediatrics", "Child Health", "Community Care"],
      description:
        "The Medical City strengthens its family-centered care approach with expanded pediatric services and specialized facilities.",
      content: `
        The Medical City continues its commitment to family-centered care by expanding its pediatric services.
        The new wing provides a holistic environment for children and their families.
      `,
    },
  };

  const article = articles[id] || articles[1];

  return (
    <div className="news-container">
      {/* Back Button */}
      <button className="back-btn" onClick={() => navigate("/news")}>
        <FaArrowLeft className="back-icon" /> Back
      </button>

      {/* Breadcrumb */}
      <div className="breadcrumb">
        <Link to="/news">Latest News and Health Tips</Link>
        <span>/</span>
        <span className="active">{article.shortTitle}</span>
      </div>

      <h2 className="news-section-title">NEWS</h2>

      <div className="news-layout">
        {/* MAIN ARTICLE */}
        <div className="news-main">
          <h4 className="news-short-title">{article.shortTitle}</h4>
          <h3 className="news-title">{article.title}</h3>

          <div className="news-tags">
            {article.tags.map((tag, index) => (
              <span key={index} className="tag">
                <FaTag className="tag-icon" /> {tag}
              </span>
            ))}
          </div>

          <p className="news-description">{article.description}</p>
          <p className="news-date">{article.date}</p>
          <hr />

          <div className="news-image"></div>
          <p className="photo-credit">Photo by: {article.author}</p>

          <div className="news-body">
            <p>{article.content}</p>
          </div>
        </div>

        {/* SIDEBAR */}
        <aside className="news-sidebar">
          <div className="sidebar-box">
            <h4 className="sidebar-title">More News</h4>

            {/* SCROLLABLE HARD-CODED SECTION */}
            <div className="sidebar-scroll">
              <ul className="sidebar-list">
                <li className="sidebar-item">
                  <Link to="/news/2" className="sidebar-link">
                    <h5>Breakthrough in Cancer Care</h5>
                    <p className="sidebar-date">March 12, 2025</p>
                  </Link>
                </li>
                <li className="sidebar-item">
                  <Link to="/news/3" className="sidebar-link">
                    <h5>Expanding Pediatric Care</h5>
                    <p className="sidebar-date">April 2, 2025</p>
                  </Link>
                </li>
                <li className="sidebar-item">
                  <Link to="/news/1" className="sidebar-link">
                    <h5>Accessible Liver Transplantation</h5>
                    <p className="sidebar-date">February 18, 2025</p>
                  </Link>
                </li>
                <li className="sidebar-item">
                  <a href="#" className="sidebar-link">
                    <h5>Wellness Tips for Summer</h5>
                    <p className="sidebar-date">May 10, 2025</p>
                  </a>
                </li>
                <li className="sidebar-item">
                  <a href="#" className="sidebar-link">
                    <h5>Emergency Response Upgrades</h5>
                    <p className="sidebar-date">May 20, 2025</p>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="ad-box">
            <h4 className="ad-title">Sponsored</h4>
            <div className="ad-placeholder">
              💙 I MISS YOU HANNI & NEW JEANS 💙
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default ComponentNews;
