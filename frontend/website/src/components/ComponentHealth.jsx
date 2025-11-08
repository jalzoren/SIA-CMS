import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaTag } from "react-icons/fa";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "../components/components-css/ComponentNews.css";

const ComponentHealth = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [article, setArticle] = useState(null);
  const [allHealthTips, setAllHealthTips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sidebarLoading, setSidebarLoading] = useState(true);

  // Fetch single health tip article
  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/health-tips/${id}`);
        const data = await res.json();
        setArticle(data);
      } catch (error) {
        console.error("Error fetching article:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchArticle();
  }, [id]);

  // Fetch all health tips for sidebar
  useEffect(() => {
    const fetchAllHealthTips = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/health-tips`);
        const data = await res.json();
        setAllHealthTips(data);
      } catch (error) {
        console.error("Error fetching health tips list:", error);
      } finally {
        setSidebarLoading(false);
      }
    };
    fetchAllHealthTips();
  }, []);

  // Scroll to top on article change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  // Loading skeleton
  if (loading) {
    return (
      <div className="container py-5">
        <Skeleton height={40} width={300} className="mb-3" />
        <Skeleton height={20} width={200} className="mb-4" />
        <Skeleton height={400} />
      </div>
    );
  }

  if (!article) {
    return (
      <div className="container py-5 text-center">
        <h3>Article not found 😢</h3>
        <Link to="/health" className="btn btn-primary mt-3">
          Back to Health Tips
        </Link>
      </div>
    );
  }

  return (
    <div className="news-container">
      {/* Back Button */}
      <button className="back-btn" onClick={() => navigate("/health")}>
        <FaArrowLeft className="back-icon" /> Back
      </button>

      {/* Breadcrumb */}
      <div className="breadcrumb">
        <Link to="/health">Health Tips</Link>
        <span>/</span>
        <span className="active">{article.short_title || article.full_title}</span>
      </div>

      <h2 className="news-section-title">HEALTH TIPS</h2>

      <div className="news-layout">
        {/* MAIN ARTICLE */}
        <div className="news-main">
          <h4 className="news-short-title">{article.short_title}</h4>
          <h3 className="news-title">{article.full_title}</h3>

          {article.topic_tags && (
            <div className="news-tags">
              {article.topic_tags.split(",").map((tag, index) => (
                <span key={index} className="tag">
                  <FaTag className="tag-icon" /> {tag.trim()}
                </span>
              ))}
            </div>
          )}

          <p className="news-date">
            Published: {new Date(article.created_at).toLocaleDateString()}
          </p>
          <hr />

          {(article.image_url || article.image) && (
            <div className="news-image">
              <img
                src={article.image_url || article.image}
                alt={article.full_title}
              />
            </div>
          )}

          <p className="photo-credit">
            Author: {article.author || "TMC News Desk"}
          </p>

          <div
            className="news-body"
            dangerouslySetInnerHTML={{ __html: article.description }}
          ></div>
        </div>

        {/* SIDEBAR */}
        <aside className="news-sidebar">
          <div className="sidebar-box">
            <h4 className="sidebar-title">More Health Tips</h4>

            <div className="sidebar-scroll">
              {sidebarLoading ? (
                <Skeleton count={5} height={60} className="mb-3" />
              ) : (
                <ul className="sidebar-list">
                  {allHealthTips
                    .filter((tip) => tip.id !== article.id)
                    .slice(0, 6)
                    .map((tip) => (
                      <li key={tip.id} className="sidebar-item">
                        <Link to={`/health/${tip.id}`} className="sidebar-link">
                          <div className="sidebar-content">
                            <h5 className="sidebar-title-text">
                              {tip.full_title}
                            </h5>
                            <p className="sidebar-date">
                              {new Date(tip.created_at).toLocaleDateString()}
                            </p>
                          </div>
                        </Link>
                      </li>
                    ))}
                </ul>
              )}
            </div>
          </div>

          {/* Sponsor box */}
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

export default ComponentHealth;
