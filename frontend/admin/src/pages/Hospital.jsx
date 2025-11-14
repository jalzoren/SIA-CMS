import { useEffect, useRef, useState } from "react";
import Quill from "quill";
import Swal from "sweetalert2";
import "../css/News.css"; // your existing shared CMS style
import "quill/dist/quill.snow.css";
import { IoMdCreate } from "react-icons/io";

export default function Adminabout() {
  const quillRef = useRef(null);
  const fileInputRef = useRef(null);
  const [quillInstance, setQuillInstance] = useState(null);
  const [shortTitle, setShortTitle] = useState("");
  const [fullTitle, setFullTitle] = useState("");
  const [tags, setTags] = useState("");
  const [fileInfo, setFileInfo] = useState(null);
  const [activeTab, setActiveTab] = useState("about");

  // Initialize Quill editor
  useEffect(() => {
    if (quillRef.current && !quillInstance) {
      const q = new Quill(quillRef.current, {
        theme: "snow",
        placeholder: "Write something about the hospital...",
        modules: {
          toolbar: [
            ["bold", "italic", "underline"],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link", ""],
            ["clean"],
          ],
        },
      });
      setQuillInstance(q);
    }
  }, [quillInstance]);

  // Handle file input
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const isImage = file.type.startsWith("image/");
      const preview = isImage ? URL.createObjectURL(file) : null;
      setFileInfo({
        name: file.name,
        type: file.type,
        preview,
        isImage,
      });
    }
  };

  // Handle submit (draft/publish)
  const handleSubmit = (status) => {
    const description = quillInstance?.root.innerHTML;
    const mode = status === "draft" ? "Draft Saved" : "Published";

    Swal.fire({
      icon: "success",
      title: `${mode} Successfully!`,
      text: `Your "About Hospital" content has been ${status}.`,
      confirmButtonColor: "#043873",
    });

    // Optional: Add API call here to save content
    console.log({
      shortTitle,
      fullTitle,
      tags,
      description,
      fileInfo,
      status,
    });
  };

  return (
    <div className="cms-announcement-page">
      {/* Page Header */}
      <h2 className="title">About Hospital</h2>
      <ul className="breadcrumbs">
        <li>About Hospital</li>
        <li className="divider">/</li>
        <li>Admin Panel</li>
      </ul>

      {/* Tabs Section */}
      <div className="cms-tabs">
        <div
          className={`cms-tab-item ${activeTab === "about" ? "active" : ""}`}
          onClick={() => setActiveTab("about")}
        >
          About Hospital
        </div>
        <div
          className={`cms-tab-item ${activeTab === "privacy" ? "active" : ""}`}
          onClick={() => setActiveTab("privacy")}
        >
          Privacy
        </div>
        <div
          className={`cms-tab-item ${activeTab === "services" ? "active" : ""}`}
          onClick={() => setActiveTab("services")}
        >
          Services
        </div>
        <div
          className={`cms-tab-item ${activeTab === "contact" ? "active" : ""}`}
          onClick={() => setActiveTab("contact")}
        >
          Contact
        </div>
      </div>

      {/* Top Card */}
      <div className="card announcement-card">
        <div className="head">
          <h3 className="announcement-title">
            {activeTab === "about" && "About Hospital Update"}
            {activeTab === "privacy" && "Privacy Update"}
            {activeTab === "services" && "Services Update"}
            {activeTab === "contact" && "Contact Update"}
          </h3>
          <div className="announcement-actions">
            <button
              className="btn draft"
              type="button"
              onClick={() => handleSubmit("draft")}
            >
              Draft
            </button>
            <button
              className="btn submit"
              type="button"
              onClick={() => handleSubmit("published")}
            >
              Publish
            </button>
          </div>
        </div>
      </div>

      {/* Form Area */}
      <div className="cms-card cms-form-card">
        <form className="cms-form" onSubmit={(e) => e.preventDefault()}>
          {/* Basic Info */}
          <div className="cms-form-row">
            <div className="cms-form-group">
              <label htmlFor="cms-short-title">Short Title</label>
              <input
                type="text"
                id="cms-short-title"
                placeholder="Enter short title"
                value={shortTitle}
                onChange={(e) => setShortTitle(e.target.value)}
              />
            </div>
            <div className="cms-form-group">
              <label htmlFor="cms-full-title">Full Title</label>
              <input
                type="text"
                id="cms-full-title"
                placeholder="Enter full title"
                value={fullTitle}
                onChange={(e) => setFullTitle(e.target.value)}
              />
            </div>
            <div className="cms-form-group">
              <label htmlFor="cms-tags">Topic Tags</label>
              <input
                type="text"
                id="cms-tags"
                placeholder="e.g. Mission, Vision, Services"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
              />
            </div>
          </div>

          {/* Description and Image Upload */}
          <div className="cms-form-row" style={{ alignItems: "flex-start" }}>
            {/* Quill Editor */}
            <div className="cms-form-group" style={{ flex: 2 }}>
              <label>Description Box</label>
              <div ref={quillRef} className="cms-quill-editor"></div>
            </div>

            {/* Image Upload */}
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
                  <IoMdCreate style={{ marginRight: "8px" }} /> Choose Image
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