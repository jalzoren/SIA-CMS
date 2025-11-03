import { useEffect, useRef, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import Swal from "sweetalert2";
import "../css/Health.css";
import { IoMdCreate } from "react-icons/io";
import { IoMdInformationCircleOutline } from "react-icons/io";

export default function Health() {
  const quillRef = useRef(null);
  const fileInputRef = useRef(null);
  const [fileInfo, setFileInfo] = useState(null);

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
            ["link", "", "code-block"],
            ["clean"],
          ],
        },
      });
      quillRef.current.__quill = quill;
    }
  }, []);

  // Handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const isImage = file.type.startsWith("image/");
    if (isImage) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setFileInfo({
          name: file.name,
          preview: ev.target?.result,
          isImage: true,
        });
      };
      reader.readAsDataURL(file);
    } else {
      setFileInfo({
        name: file.name,
        isImage: false,
      });
    }
  };

  // Show disclaimer popup when clicked
  const handleDisclaimerClick = async () => {
    await Swal.fire({
      title: "Medical Disclaimer & Privacy Policy",
      html: `
        <p style="text-align:left; font-size:14px; color:#333;">
          By agreeing to this disclaimer, you acknowledge that the medical advice,
          articles, and health tips shared here are for educational purposes only.
          They do not replace professional consultation, diagnosis, or treatment.
          Always seek advice from a qualified healthcare provider.
        </p>
      `,
      icon: "info",
      confirmButtonText: "I Agree",
      confirmButtonColor: "#043873",
    });
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
          <h3 className="announcement-title">Create a Health Tips Article</h3>
          <div className="announcement-actions">
            <button className="btn draft">Draft</button>
            <button className="btn submit">Post</button>
          </div>
        </div>
      </div>

      {/* FORM BODY */}

      <div className="cms-card cms-form-card">
        <form className="cms-form">
          <span
            className="link-text"
            style={{
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: "4px",
            }}
            onClick={handleDisclaimerClick}
          >
            <IoMdInformationCircleOutline />
            Medical Disclaimer
          </span>
          {/* TITLE ROW */}
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

          {/* DESCRIPTION + FILE UPLOAD ROW */}
          <div className="cms-form-row" style={{ alignItems: "flex-start" }}>
            {/* Description Box */}
            <div className="cms-form-group" style={{ flex: 2 }}>
              <label>Description Box</label>
              <div ref={quillRef} className="cms-quill-editor"></div>
            </div>

            {/* Upload Box */}
            <div
              className="cms-form-group"
              style={{ flex: 1, minWidth: "250px" }}
            >
              <label>Upload Image</label>
              <div
                className="file-upload-container"
                onClick={() => fileInputRef.current?.click()}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="file-input-hidden"
                />
                <label className="upload-label">
                  <IoMdCreate style={{ marginRight: "8px" }} />
                  Choose Image
                </label>

                <div className="file-preview-area">
                  {fileInfo ? (
                    fileInfo.isImage && fileInfo.preview ? (
                      <img
                        src={fileInfo.preview}
                        alt="preview"
                        className="file-preview-img"
                      />
                    ) : (
                      <p className="file-name">{fileInfo.name}</p>
                    )
                  ) : (
                    <p className="file-placeholder">No image chosen</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
