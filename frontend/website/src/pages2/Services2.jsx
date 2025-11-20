import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/Services.css";
import Chatbot from "../components/Chatbot";

const servicesData = Array(12).fill({
  title: "Lorem Ipsum Dolor",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris et elit vel libero aliquam placerat.",
  date: "February 5, 2025",
});

export default function Services() {
  return (
    <div>
      <div className="container py-5">
        <h2 className="title-center mb-4">
          Our <span className="title-primary">Services</span>
        </h2>

        {/* Top placeholder cards */}
        <div className="d-flex flex-wrap justify-content-center gap-3 mb-4">
          <div className="bg-light rounded" style={{ width: "300px", height: "200px" }}></div>
          <div className="bg-light rounded" style={{ width: "300px", height: "200px" }}></div>
          <div className="bg-light rounded" style={{ width: "300px", height: "200px" }}></div>
        </div>

        {/* Search Bar */}
        <div className="d-flex justify-content-center mb-4">
          <input
            type="text"
            placeholder="Search"
            className="form-control rounded-start"
            style={{ maxWidth: "250px" }}
          />
          <button className="btn btn-primary rounded-end">Search</button>
        </div>

        {/* Services Grid */}
        <div className="row g-4">
          {servicesData.map((service, index) => (
            <div key={index} className="col-12 col-md-6 col-lg-4">
              <div className="service-card bg-light p-3 rounded-4 shadow-sm d-flex align-items-center flex-column flex-md-row text-center text-md-start">
                <div
                  className="service-image bg-white rounded-4 mb-3 mb-md-0"
                  style={{ width: "120px", height: "120px" }}
                ></div>
                <div className="ms-md-3">
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <p className="text-muted small">{service.date}</p>
                  <a href="#" className="btn btn-primary btn-sm">
                    Read More
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <Chatbot />
      </div>
    </div>
  );
}
