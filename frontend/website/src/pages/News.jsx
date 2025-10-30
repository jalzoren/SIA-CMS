import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../components/components-css/ComponentNews.css";

const News = () => {
  const articles = [
    {
      id: 1,
      title: "Hope at Home: The Medical City Champions Accessible Liver Transplantation for Filipinos",
      image: "https://via.placeholder.com/600x300?text=Liver+Transplantation",
      date: "February 18, 2025",
      description:
        "The Medical City continues to lead in providing life-saving liver transplantation accessible to more Filipino patients.",
    },
    {
      id: 2,
      title: "The Medical City Leads Breakthrough in Cancer Care for Filipinos",
      image: "https://via.placeholder.com/600x300?text=Cancer+Care",
      date: "March 12, 2025",
      description:
        "A groundbreaking advancement in cancer treatment through precision medicine and targeted therapy, enhancing survival rates.",
    },
    {
      id: 3,
      title: "TMC Expands Pediatric Services for the Next Generation",
      image: "https://via.placeholder.com/600x300?text=Pediatrics",
      date: "April 2, 2025",
      description:
        "The Medical City expands its pediatric services, offering a holistic environment for children and their families.",
    },
  ];

  return (
    <div className="news-section container py-5">
      {/* ✨ Updated Title Style */}
      <h2 className="title-center mb-4">
        Latest <span className="title-primary">News and Health Tips</span>
      </h2>

      <p className="intro-text text-center mb-5">
        Stay updated with the latest health news, innovations, and inspiring stories from The Medical City.
      </p>

      <div className="row g-4">
        {articles.map((article) => (
          <div key={article.id} className="col-12 col-md-6 col-lg-4">
            <div className="news-card card h-100 shadow-sm">
              <div
                className="news-img rounded-top"
                style={{
                  backgroundImage: `url(${article.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  height: "200px",
                }}
              ></div>

              <div className="card-body text-center d-flex flex-column justify-content-between">
                <div>
                  <h5 className="card-title fw-bold text-primary">{article.title}</h5>
                  <p className="text-muted small mb-2">{article.date}</p>
                  <p className="card-text text-secondary small">{article.description}</p>
                </div>
                <Link
                  to={`/news/${article.id}`}
                  className="btn btn-primary mt-3 align-self-center"
                >
                  See More →
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default News;
