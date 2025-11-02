import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../components/components-css/ComponentNews.css";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Chatbot from "../components/Chatbot";

const Careers = () => {
  const [loading, setLoading] = useState(true);

  // Simulate API loading
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const jobs = [
    {
      id: 1,
      title: "Registered Nurse",
      image: "https://via.placeholder.com/600x300?text=Registered+Nurse",
      date: "October 10, 2025",
      description:
        "Provide quality nursing care and support to patients in a compassionate hospital environment.",
    },
    {
      id: 2,
      title: "Medical Technologist",
      image: "https://via.placeholder.com/600x300?text=Medical+Technologist",
      date: "October 8, 2025",
      description:
        "Perform diagnostic laboratory tests and assist in the early detection of diseases.",
    },
    {
      id: 3,
      title: "Radiologic Technologist",
      image: "https://via.placeholder.com/600x300?text=Radiologic+Technologist",
      date: "October 5, 2025",
      description:
        "Operate imaging equipment and ensure safety and accuracy in radiologic procedures.",
    },
    {
      id: 4,
      title: "Pharmacist",
      image: "https://via.placeholder.com/600x300?text=Pharmacist",
      date: "October 3, 2025",
      description:
        "Prepare, dispense, and review medications while maintaining compliance with medical standards.",
    },
    {
      id: 5,
      title: "Front Desk Officer",
      image: "https://via.placeholder.com/600x300?text=Front+Desk+Officer",
      date: "October 1, 2025",
      description:
        "Serve as the first point of contact for patients, providing excellent customer service.",
    },
    {
      id: 6,
      title: "HR Assistant",
      image: "https://via.placeholder.com/600x300?text=HR+Assistant",
      date: "September 25, 2025",
      description:
        "Assist in recruitment, employee engagement, and HR administrative tasks.",
    },
  ];

  return (
    <div className="news-section container py-5">
      {/* Title with Skeleton */}
      {loading ? (
        <div className="text-center mb-5">
          <Skeleton height={40} width={350} className="mx-auto mb-3" />
          <Skeleton height={20} width={500} className="mx-auto" />
        </div>
      ) : (
        <>
          <h2 className="title-center mb-4">
            Latest <span className="title-primary">Careers & Events</span>
          </h2>
          <p className="intro-text text-center mb-5">
            Join our healthcare team and be part of an organization where you can make a meaningful impact on people's lives.
            As a valued member, you'll collaborate with dedicated professionals to provide compassionate, high-quality care to individuals from all walks of life.
          </p>
        </>
      )}

      {/* Why Choose Us */}
      {!loading && (
        <div className="why-choose-us mb-5">
          <h3>Why choose us?</h3>
          <ul>
            <li><strong>Commitment to excellence:</strong> We have a strong tradition of delivering trusted and effective healthcare services.</li>
            <li><strong>Supportive culture:</strong> Our workplace fosters collaboration, respect, and positivity.</li>
            <li><strong>Growth opportunities:</strong> We provide continuous learning and career development to help you reach your full potential.</li>
          </ul>
          <p>Be part of a team that makes a difference—start your journey with us today.</p>
        </div>
      )}

      {/* Job Grid */}
      <div className="career-scroll row g-4">
        {loading
          ? // Skeleton Cards
            Array(6)
              .fill()
              .map((_, i) => (
                <div key={i} className="col-12 col-md-6 col-lg-4">
                  <div className="news-card card h-100 shadow-sm">
                    <Skeleton height={200} borderRadius={8} />
                    <div className="card-body text-center">
                      <Skeleton height={25} width={200} className="mx-auto mb-2" />
                      <Skeleton height={15} width={100} className="mx-auto mb-2" />
                      <Skeleton count={3} height={10} width={`80%`} className="mx-auto" />
                      <Skeleton
                        height={35}
                        width={120}
                        className="mt-3 mx-auto rounded-pill"
                      />
                    </div>
                  </div>
                </div>
              ))
          : // Real Job Cards
            jobs.map((job) => (
              <div key={job.id} className="col-12 col-md-6 col-lg-4">
                <div className="news-card card h-100 shadow-sm">
                  <div
                    className="news-img rounded-top"
                    style={{
                      backgroundImage: `url(${job.image})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      height: "200px",
                    }}
                  ></div>

                  <div className="card-body text-center d-flex flex-column justify-content-between">
                    <div>
                      <h5 className="card-title fw-bold text-primary">{job.title}</h5>
                      <p className="text-muted small mb-2">{job.date}</p>
                      <p className="card-text text-secondary small">{job.description}</p>
                    </div>
                    <Link
                      to={`/careers/${job.id}`}
                      className="btn btn-primary mt-3 align-self-center"
                    >
                      See More →
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

export default Careers;
