import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../components/components-css/ComponentNews.css";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Chatbot from "../components/Chatbot";

const Careers = () => {
  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [jobField, setJobField] = useState("");
  const [location, setLocation] = useState("");
  const [filteredJobs, setFilteredJobs] = useState([]);

  // Fetch jobs from backend
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/jobs"); // adjust endpoint if needed
        const data = await res.json();
        setJobs(data.jobs || []);
      } catch (err) {
        console.error("Error fetching jobs:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  // Filter jobs based on all inputs
  useEffect(() => {
    const results = jobs.filter((job) => {
      const matchesKeyword = keyword === "" || job.job_title.toLowerCase().includes(keyword.toLowerCase());
      const matchesField = jobField === "" || job.department === jobField;
      const matchesLocation = location === "" || job.location === location;
      return matchesKeyword && matchesField && matchesLocation;
    });
    setFilteredJobs(results);
  }, [keyword, jobField, location, jobs]);

  return (
    <div className="news-section container py-5">
      {/* Title */}
      {loading ? (
        <div className="text-center mb-5">
          <Skeleton height={40} width={350} className="mx-auto mb-3" />
          <Skeleton height={20} width={500} className="mx-auto" />
        </div>
      ) : (
        <>
          <h2 className="title-center mb-4 text-primary">
            Latest <span className="title-primary">Careers</span>
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
          <h3 className="text-primary">Why choose us?</h3>
          <ul>
            <li><strong>Commitment to excellence:</strong> We have a strong tradition of delivering trusted and effective healthcare services.</li>
            <li><strong>Supportive culture:</strong> Our workplace fosters collaboration, respect, and positivity.</li>
            <li><strong>Growth opportunities:</strong> We provide continuous learning and career development to help you reach your full potential.</li>
          </ul>
          <p>Be part of a team that makes a difference—start your journey with us today.</p>
        </div>
      )}

      {/* Search Filters */}
      {!loading && (
        <div className="mb-5">
          <h4 className="mb-3 text-primary">Search for Job Openings</h4>
          <div className="row g-3">
            <div className="col-md-4">
              <input
                type="text"
                className="form-control"
                placeholder="Search by keyword"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />
            </div>
            <div className="col-md-4">
              <select className="form-select" value={jobField} onChange={(e) => setJobField(e.target.value)}>
                <option value="">All Departments</option>
                {/* Dynamically populate departments from jobs */}
                {[...new Set(jobs.map((job) => job.department))].map((dept, idx) => (
                  <option key={idx} value={dept}>{dept}</option>
                ))}
              </select>
            </div>
            <div className="col-md-4">
              <select className="form-select" value={location} onChange={(e) => setLocation(e.target.value)}>
                <option value="">All Locations</option>
                {[...new Set(jobs.map((job) => job.location))].map((loc, idx) => (
                  <option key={idx} value={loc}>{loc}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Job Grid */}
      <div className="career-scroll row g-4">
        {loading
          ? Array(6).fill().map((_, i) => (
              <div key={i} className="col-12 col-md-6 col-lg-4">
                <div className="news-card card h-100 shadow-sm">
                  <Skeleton height={200} borderRadius={8} />
                  <div className="card-body text-center">
                    <Skeleton height={25} width={200} className="mx-auto mb-2" />
                    <Skeleton height={15} width={100} className="mx-auto mb-2" />
                    <Skeleton count={3} height={10} width={`80%`} className="mx-auto" />
                    <Skeleton height={35} width={120} className="mt-3 mx-auto rounded-pill" />
                  </div>
                </div>
              </div>
            ))
          : filteredJobs.map((job) => (
              <div key={job.id} className="col-12 col-md-6 col-lg-4">
                <div className="news-card card h-100 shadow-sm">
                  <div
                    className="news-img rounded-top"
                    style={{
                      backgroundImage: `url(${job.image ? `http://localhost:5000/uploads/jobs/${job.image}` : "https://via.placeholder.com/600x300"})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      height: "200px",
                    }}
                  ></div>
                  <div className="card-body text-center d-flex flex-column justify-content-between">
                    <div>
                      <h5 className="card-title fw-bold text-primary">{job.job_title}</h5>
                      <p className="text-muted small mb-2">{new Date(job.application_deadline).toLocaleDateString()}</p>
                      <p className="card-text text-secondary small" dangerouslySetInnerHTML={{ __html: job.description }}></p>
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
