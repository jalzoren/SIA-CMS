import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "../css/Contact.css"; 
import Chatbot from "../components/Chatbot";

const Contact = () => {
  const [loading, setLoading] = useState(true);

  // Simulate data loading
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="contact-section container py-5">
      {/* Title */}
      <div className="text-center mb-5">
        {loading ? (
          <>
            <Skeleton height={40} width={300} className="mx-auto mb-3" />
            <Skeleton height={20} width={200} className="mx-auto" />
          </>
        ) : (
          <h2 className="title-center mb-5">
            Contact <span className="title-primary">Us</span>
          </h2>
        )}
      </div>

      <div className="row g-5">
        {/* Left Column: Form */}
        <div className="col-12 col-lg-6">
          {loading ? (
            <div className="card shadow-sm p-5 contact-card">
              <Skeleton height={30} width="50%" className="mx-auto mb-4" />
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} height={45} className="mb-3" />
              ))}
              <Skeleton height={45} width="50%" className="mt-3 mx-auto rounded-pill" />
            </div>
          ) : (
            <div className="card shadow-sm p-5 contact-card">
              <h4 className="mb-4 text-center">Send Us a Message</h4>
              <form>
                <div className="mb-3">
                  <input type="text" className="form-control" placeholder="Full Name" required />
                </div>
                <div className="mb-3">
                  <input type="text" className="form-control" placeholder="Mobile Number" required />
                </div>
                <div className="mb-3">
                  <input type="text" className="form-control" placeholder="Subject" required />
                </div>
                <div className="mb-3">
                  <input type="email" className="form-control" placeholder="Email" required />
                </div>
                <div className="mb-3">
                  <textarea className="form-control" rows="5" placeholder="Your Message" required></textarea>
                </div>
                <div className="text-center">
                  <button type="submit" className="btn btn-primary px-5">Send Message</button>
                </div>
              </form>
            </div>
          )}
        </div>

        {/* Right Column: Contact Info */}
        <div className="col-12 col-lg-6">
          {loading ? (
            <div className="contact-info p-4">
              {[...Array(6)].map((_, i) => (
                <Skeleton key={i} height={25} className="mb-3" />
              ))}
            </div>
          ) : (
            <div className="contact-info p-4">
              <h4 className="mb-3">Get in Touch</h4>
              <p>We value your feedback and are happy to assist you with inquiries about our hospital services.</p>

              <div className="mb-4">
                <h5><FaMapMarkerAlt className="me-2 text-primary"/>Hospital Address</h5>
                <p>123 Health Avenue, Kapasigan, Pasig City, Philippines</p>
              </div>

              <div className="mb-4">
                <h5><FaPhoneAlt className="me-2 text-primary"/>Telephone</h5>
                <p>Tel: (+632) 123-4567</p>
              </div>

              <div className="mb-4">
                <h5><FaPhoneAlt className="me-2 text-primary"/>Mobile Numbers</h5>
                <ul className="list-unstyled">
                  <li>Admitting Section: +63 900-111-2222</li>
                  <li>Sales and Marketing: +63 900-333-4444</li>
                  <li>Emergency Department: +63 900-555-6666</li>
                  <li>Outpatient Department: +63 900-777-8888</li>
                  <li>Radiology Department (calls only): +63 900-999-0000</li>
                </ul>
              </div>

              <div>
                <h5><FaEnvelope className="me-2 text-primary"/>Email</h5>
                <p>info@yourhospital.com</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <Chatbot />
    </div>
  );
};

export default Contact;
