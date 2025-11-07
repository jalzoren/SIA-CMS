import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../components/components-css/ComponentNews.css";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Chatbot from "../components/Chatbot";

const AnnouncementArticle = () => {
  const { id } = useParams(); // get the announcement id from URL
  const [announcement, setAnnouncement] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnnouncement = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/announcements/${id}`);
        const data = await res.json();
        setAnnouncement(data);
      } catch (error) {
        console.error("Error fetching announcement:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnnouncement();
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

  if (!announcement) {
    return (
      <div className="container py-5 text-center">
        <h3>Announcement not found 😢</h3>
        <Link to="/announcements" className="btn btn-primary mt-3">
          Back to Announcements
        </Link>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="mb-4">
        <Link to="/announcements" className="btn btn-outline-primary mb-3">
          ← Back to Announcements
        </Link>
      </div>

      <div className="announcement-article">
        <h2 className="fw-bold text-primary mb-3">{announcement.full_title}</h2>
        <p className="text-muted small">
          Published: {new Date(announcement.created_at).toLocaleDateString()}
        </p>

        {announcement.topic_tags && (
          <p className="text-secondary small mb-4">
            <strong>Tags:</strong> {announcement.topic_tags}
          </p>
        )}

        <div
          className="article-content mb-5"
          dangerouslySetInnerHTML={{ __html: announcement.description }}
        />
      </div>

      <Chatbot />
    </div>
  );
};

export default AnnouncementArticle;
