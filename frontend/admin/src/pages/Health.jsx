import { useEffect, useRef, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import Swal from "sweetalert2";
import "../css/Health.css";
import { IoChevronDown, IoChevronUp } from "react-icons/io5";

export default function Health() {
  const quillRef = useRef(null);
  const [showAuthorInfo, setShowAuthorInfo] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const [doctorList] = useState([
    { name: "Dr. Maria Santos", department: "Pediatrics" },
    { name: "Dr. Jose Dela Cruz", department: "Cardiology" },
    { name: "Dr. Angela Reyes", department: "Dermatology" },
    { name: "Dr. Michael Tan", department: "Orthopedics" },
  ]);

  // Initialize Quill editor
  useEffect(() => {
    if (quillRef.current && !quillRef.current.__quill) {
      const quill = new Quill(quillRef.current, {
        theme: "snow",
        placeholder: "Write your health tip article here...",
        modules: {
          toolbar: [
            [{ header: [1, 2, false] }],
            ["bold", "italic", "underline", "strike"],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link", "image", "code-block"],
            ["clean"],
          ],
        },
      });
      quillRef.current.__quill = quill;
    }
  }, []);

  // Checkbox with disclaimer modal
  const handleCheckboxClick = async () => {
    if (!isChecked) {
      const result = await Swal.fire({
        title: "Medical Disclaimer & Privacy Policy",
        html: `
          <p style="text-align:left; font-size:14px; color:#333;">
            By agreeing to this disclaimer, you acknowledge that the medical advice, articles,
            and health tips shared here are for educational purposes only.
            They do not replace professional consultation, diagnosis, or treatment.
            Always seek advice from a qualified healthcare provider.
          </p>
          <p style="text-align:left; font-size:14px; color:#333;">
            Your submission implies consent to share accurate and respectful health information
            following our privacy and ethical guidelines.
          </p>
        `,
        icon: "info",
        confirmButtonText: "I Agree",
        confirmButtonColor: "#043873",
        showCancelButton: true,
        cancelButtonText: "Cancel",
      });

      if (result.isConfirmed) {
        setIsChecked(true);
        Swal.fire({
          icon: "success",
          title: "Thank you!",
          text: "You have agreed to the medical disclaimer.",
          confirmButtonColor: "#043873",
        });
      }
    } else {
      setIsChecked(false);
    }
  };

  return (
    <div className="cms-announcement-page">
      {/* PAGE HEADER */}
      <h2 className="title">Health Tips</h2>
      <ul className="breadcrumbs">
        <li>Health Tips</li>
        <li className="divider">/</li>
        <li>Admin Dashboard</li>
      </ul>

      {/* CREATE POST HEADER CARD */}
      <div className="card announcement-card">
        <div className="head">
          <h3 className="announcement">Create a Health Tips Article</h3>
          <div className="announcement-actions">
            <button className="btn draft">Draft</button>
               <button className="btn submit">
              Post
            </button>
          </div>
        </div>
      </div>

      {/* FORM BODY */}
      <div className="cms-card cms-form-card">
        <form className="cms-form">
          <div className="cms-form-row">
            <div className="cms-form-group">
              <label htmlFor="cms-short-title">Short Title</label>
              <input
                type="text"
                id="cms-short-title"
                placeholder="Enter short title"
              />
            </div>

            <div className="cms-form-group">
              <label htmlFor="cms-full-title">Full Title</label>
              <input
                type="text"
                id="cms-full-title"
                placeholder="Enter full title"
              />
            </div>

            <div className="cms-form-group">
              <label htmlFor="cms-tags">Topic Tags</label>
              <input
                type="text"
                id="cms-tags"
                placeholder="e.g. Nutrition, Wellness, Exercise"
              />
            </div>
          </div>

          {/* Quill Editor */}
          <div className="cms-form-group">
            <label>Description Box</label>
            <div ref={quillRef} className="cms-quill-editor"></div>
          </div>

          {/* AUTHOR + DISCLAIMER SECTION */}
          <div className="cms-row-inline">
            {/* Author Dropdown */}
            <div className="dropdown-wrapper">
              <div
                className="dropdown-section"
                onClick={() => setShowAuthorInfo((prev) => !prev)}
              >
                <label className="dropdown-label">
                  Author Information{" "}
                  {showAuthorInfo ? <IoChevronUp /> : <IoChevronDown />}
                </label>

                {selectedDoctor && (
                  <span className="selected-doctor">
                    {selectedDoctor.name} — {selectedDoctor.department}
                  </span>
                )}
              </div>

              {showAuthorInfo && (
                <ul className="author-dropdown-list">
                  {doctorList.map((doctor, index) => (
                    <li
                      key={index}
                      onClick={() => {
                        setSelectedDoctor(doctor);
                        setShowAuthorInfo(false);
                      }}
                    >
                      <strong>{doctor.name}</strong>
                      <span className="dept"> — {doctor.department}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Checkbox Section */}
            <div className="checkbox-section">
              <input
                type="checkbox"
                id="disclaimer"
                checked={isChecked}
                onChange={handleCheckboxClick}
              />
              <label htmlFor="disclaimer" className="disclaimer-label">
                I agree to the{" "}
                <span className="link-text">Medical Disclaimer</span>
              </label>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
