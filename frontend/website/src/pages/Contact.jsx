import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../css/Contact.css"; 

const Contact = () => {
  return (
    <div className="contact-section container py-5">
      <h2 className="title-center mb-5">
        Contact <span className="title-primary">Us</span>
      </h2>

      <div className="row g-4">
        {/* Left Column: Form */}
        <div className="col-12 col-lg-6 center">
          <div className="card shadow-sm p-4">
            <h4 className="mb-4 text-center">Send us an Email</h4>
            <form>
              <div className="mb-3">
                <input type="text" className="form-control" placeholder="Full Name" />
              </div>
              <div className="mb-3">
                <input type="text" className="form-control" placeholder="Mobile Number" />
              </div>
              <div className="mb-3">
                <input type="text" className="form-control" placeholder="Subject" />
              </div>
              <div className="mb-3">
                <input type="email" className="form-control" placeholder="Email" />
              </div>
              <div className="mb-3">
                <textarea className="form-control" rows="5" placeholder="Send a Message"></textarea>
              </div>
              <div className="text-center">
                <button type="submit" className="btn btn-primary px-4">Submit</button>
              </div>
            </form>
          </div>
        </div>

        {/* Right Column: Contact Info */}
        <div className="col-12 col-lg-6">
          <h4>Contact Us</h4>
          <p>We love to hear from you, give us feedback.</p>

          <h5>Contact Information</h5>
          <p>
            000 Kapasigan Street, Pasig City, Philippines <br />
            Tel: (+632) 00000000
          </p>

          <h5>Mobile Numbers</h5>
          <ul className="list-unstyled">
            <li>Admitting Section: +63 9000000000</li>
            <li>Sales and Marketing: +63 9000000000</li>
            <li>Emergency Department: +63 9000000000</li>
            <li>Outpatient Department: +63 9000000000</li>
            <li>Radiology Department (calls only): +63 9000000000</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Contact;
