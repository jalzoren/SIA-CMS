import React from "react";
import "../css/About.css";

function About() {
  return (
    <div className="about-wrapper">
      {/* --- About Section --- */}
      <section className="about-intro">
        <h2 className="title-center mb-4">
          About <span className="title-primary">Us</span>
        </h2>
        <div className="about-container">
          <div className="about-image">
            <img src="logo1.svg" alt="Hospital Hallway" />
          </div>
          <div className="about-text">
            <h2 className="about-title1 justify-content-center align-content-center d-flex">
              Medi <span className="title-primary1">Sync</span>
            </h2>{" "}
            <p>
              Welcome to our hospital — a trusted center of care, compassion,
              and medical excellence. We are committed to providing quality
              healthcare services that meet the needs of our patients and their
              families.
            </p>
            <p>
              Our hospital is staffed with a dedicated team of highly skilled
              and trained healthcare professionals who work hand in hand to
              deliver safe, effective, and patient-centered medical care. With
              modern facilities and advanced medical technology, we strive to
              ensure every patient receives the best possible treatment in a
              comfortable and caring environment.
            </p>
            <p>
              We believe that good health is the foundation of a better life —
              and we are here to serve our community with integrity, compassion,
              and excellence in all that we do.
            </p>
          </div>
        </div>
      </section>

      {/* --- Mission, Vision, Quality Policy --- */}
      <section className="about-trio">
        <div className="trio-card">
          <h2>Mission</h2>
          <p>
            To provide compassionate, high-quality, and patient-centered
            healthcare through excellence in medical service, continuous
            innovation, and a commitment to the well-being of every individual
            we serve.
          </p>
        </div>
        <div className="trio-card">
          <h2>Vision</h2>
          <p>
            To be a leading healthcare institution recognized for exceptional
            patient care, advanced medical technology, and a dedicated team that
            upholds integrity, compassion, and excellence in every aspect of
            service.
          </p>
        </div>
        <div className="trio-card">
          <h2>Quality Policy</h2>
          <p>
            To be a leading healthcare institution recognized for exceptional
            patient care, advanced medical technology, and a dedicated team that
            upholds integrity, compassion, and excellence in every aspect of
            service.
          </p>
        </div>
      </section>

      {/* --- Core Values --- */}
      <section className="about-core">
        <h2>Core Values</h2>
        <div className="core-content">
          <div className="core-card">
            <p>
              To provide compassionate, high-quality, and patient-centered
              healthcare through excellence in medical service, continuous
              innovation, and a commitment to the well-being of every individual
              we serve.
            </p>
          </div>
          <div className="core-card">
            <p>
              To be a leading healthcare institution recognized for exceptional
              patient care, advanced medical technology, and a dedicated team
              that upholds integrity, compassion, and excellence in every aspect
              of service.
            </p>
          </div>
          <div className="core-card">
            <p>
              To be a leading healthcare institution recognized for exceptional
              patient care, advanced medical technology, and a dedicated team
              that upholds integrity, compassion, and excellence in every aspect
              of service.
            </p>
          </div>
        </div>
      </section>

      {/* --- History Section --- */}
      <section className="about-history">
        <h2>Our History</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. In quis
          sapien quam. Pellentesque interdum, turpis sit amet sodales rutrum,
          justo massa bibendum mi, eu interdum mauris est nec diam. Praesent
          quis metus tortor. Suspendisse posuere justo at est maximus, luctus
          suscipit sapien auctor. Suspendisse sit amet efficitur neque. Sed
          viverra neque gravida elementum volutpat. Duis quis eros eget magna
          suscipit egestas. Aliquam iaculis feugiat euismod. Donec vitae quam
          placerat dui vulputate molestie nec eget libero.
        </p>
      </section>

      {/* --- Privacy Policy --- */}
      <section className="about-privacy">
        <h2>Privacy Policy</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. In quis
          sapien quam. Pellentesque interdum, turpis sit amet sodales rutrum,
          justo massa bibendum mi, eu interdum mauris est nec diam. Praesent
          quis metus tortor. Suspendisse posuere justo at est maximus, luctus
          suscipit sapien auctor. Suspendisse sit amet efficitur neque. Sed
          viverra neque gravida elementum volutpat. Duis quis eros eget magna
          suscipit egestas. Aliquam iaculis feugiat euismod. Donec vitae quam
          placerat dui vulputate molestie nec eget libero.
        </p>
      </section>
    </div>
  );
}

export default About;
