import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

const Doctors = () => {
  const careerCards = Array(6).fill({});

  return (
    <div className="careers-section container py-5">
      {/* Section Title */}
      <h2 className="section-title text-center mb-4">
        Latest <span>Careers</span>
      </h2>

      {/* Intro Text */}
      <p className="intro-text text-center mb-5">
        Join our healthcare team and be part of an organization where you can make a meaningful impact on people's lives.
        As a valued member, you'll collaborate with dedicated professionals to provide compassionate, high-quality care to individuals from all walks of life.
      </p>

      {/* Why Choose Us */}
      <div className="why-choose-us mb-5">
        <h3>Why choose us?</h3>
        <ul>
          <li><strong>Commitment to excellence:</strong> We have a strong tradition of delivering trusted and effective healthcare services.</li>
          <li><strong>Supportive culture:</strong> Our workplace fosters collaboration, respect, and positivity.</li>
          <li><strong>Growth opportunities:</strong> We provide continuous learning and career development to help you reach your full potential.</li>
        </ul>
        <p>Be part of a team that makes a difference—start your journey with us today.</p>
      </div>

      {/* Careers Grid */}
      <div className="row g-4">
        {careerCards.map((_, index) => (
          <div key={index} className="col-12 col-md-6 col-lg-4">
            <div className="career-card card h-100 shadow-sm">
              <div className="career-img bg-secondary rounded-top" style={{height: '200px'}}></div>
              <div className="card-body text-center">
                <a href="#" className="btn btn-primary mt-3">See More →</a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Doctors;
