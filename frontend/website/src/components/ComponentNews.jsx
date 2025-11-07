import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaTag } from "react-icons/fa";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "../components/components-css/ComponentNews.css";

const ComponentNews = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [article, setArticle] = useState(null);
  const [allNews, setAllNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sidebarLoading, setSidebarLoading] = useState(true);

  // Fetch single article
  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/news/${id}`);
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

  // Fetch all articles for sidebar
  useEffect(() => {
    const fetchAllNews = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/news`);
        const data = await res.json();
        setAllNews(data);
      } catch (error) {
        console.error("Error fetching news list:", error);
      } finally {
        setSidebarLoading(false);
      }
    };

    fetchAllNews();
  }, []);

  // --- LOADING STATES ---
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
        <Link to="/news" className="btn btn-primary mt-3">
          Back to News
        </Link>
      </div>
    );
  }

  // --- MAIN RENDER ---
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
        <span className="active">
          {article.short_title || article.full_title}
        </span>
      </div>

      <h2 className="news-section-title">NEWS</h2>

      <div className="news-layout">
        {/* MAIN ARTICLE */}
        <div className="news-main">
          <h4 className="news-short-title">{article.short_title}</h4>
          <h3 className="news-title">{article.full_title}</h3>

          {/* Tags */}
          {article.topic_tags && (
            <div className="news-tags">
              {article.topic_tags.split(",").map((tag, index) => (
                <span key={index} className="tag">
                  <FaTag className="tag-icon" /> {tag.trim()}
                </span>
              ))}
            </div>
          )}

          <p className="news-description">{article.short_description}</p>
          <p className="news-date">
            Published: {new Date(article.created_at).toLocaleDateString()}
          </p>
          <hr />

          {/* Image Placeholder */}
          {article.image_url && (
            <div className="news-image">
              <img src={article.image_url} alt={article.full_title} />
            </div>
          )}
          <p className="photo-credit">
            Author: {article.author || "TMC News Desk"}
          </p>

          {/* Rich HTML content */}
          <div
            className="news-body"
            dangerouslySetInnerHTML={{ __html: article.description }}
          ></div>
        </div>

        {/* SIDEBAR */}
        <aside className="news-sidebar">
          <div className="sidebar-box">
            <h4 className="sidebar-title">More News</h4>

            <div className="sidebar-scroll">
              {sidebarLoading ? (
                <Skeleton count={5} height={60} className="mb-2" />
              ) : (
                <ul className="sidebar-list">
                  {allNews
                    .filter((news) => news._id !== article._id) // exclude current article
                    .slice(0, 6) // limit number shown
                    .map((news) => (
                      <li key={news._id} className="sidebar-item">
                        <Link to={`/news/${news._id}`} className="sidebar-link">
                          <h5>{news.short_title || news.full_title}</h5>
                          <p className="sidebar-date">
                            {new Date(news.created_at).toLocaleDateString()}
                          </p>
                        </Link>
                      </li>
                    ))}
                </ul>
              )}
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
