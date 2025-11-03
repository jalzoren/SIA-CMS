import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../components/components-css/ComponentNews.css";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const NewsArticle = () => {
  const { id } = useParams(); // get the article id from the URL
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

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

  return (
    <div className="container py-5">
      <div className="mb-4">
        <Link to="/news" className="btn btn-outline-primary mb-3">
          ← Back to News
        </Link>
      </div>

      <div className="news-article">
        <h2 className="fw-bold text-primary mb-3">{article.full_title}</h2>
        <p className="text-muted small">
          Published: {new Date(article.created_at).toLocaleDateString()}
        </p>

        {/* You can display tags if they exist */}
        {article.topic_tags && (
          <p className="text-secondary small mb-4">
            <strong>Tags:</strong> {article.topic_tags}
          </p>
        )}

        {/* Quill description output */}
        <div
          className="article-content"
          dangerouslySetInnerHTML={{ __html: article.description }}
        ></div>
      </div>
    </div>
  );
};

export default NewsArticle;
