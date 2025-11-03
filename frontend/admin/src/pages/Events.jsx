import { useEffect, useRef, useState } from "react";
import Quill from "quill";
import "../css/Events.css";
import "quill/dist/quill.snow.css";

export default function Events() {
  const quillRef = useRef(null);
  const fileInputRef = useRef(null);
  const [fileInfo, setFileInfo] = useState(null); // Plain JS state

  useEffect(() => {
    if (quillRef.current && !quillRef.current.__quill) {
      const quill = new Quill(quillRef.current, {
        theme: "snow",
        placeholder: "Write your event or career description here...",
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

  // SUBMIT HANDLER
  const handleSubmit = async (status) => {
    const quillEditor = quillRef.current.__quill;
    const description = quillEditor.root.innerHTML;

    const postData = {
      post_type: document.querySelector('input[name="postType"]:checked').value,
      short_title: document.getElementById("cms-short-title").value,
      full_title: document.getElementById("cms-full-title").value,
      tags: document.getElementById("cms-tags").value,
      description,
      status, // "draft" or "posted"
    };

    try {
      const res = await fetch("http://localhost:5000/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(postData),
      });
      const data = await res.json();
      if (data.success) {
        alert(`Post ${status} successfully!`);
      } else {
        alert("Error saving post.");
      }
    } catch (err) {
      console.error(err);
      alert("Server error.");
    }
  };

  return (
    <div className="cms-announcement-page">
      {/* PAGE HEADER */}
      <h2 className="title">Events and Careers</h2>
      <ul className="breadcrumbs">
        <li>Events and Careers</li>
        <li className="divider">/</li>
        <li>Admin Panel</li>
      </ul>

      {/* CREATE POST HEADER CARD */}
      <div className="card announcement-card">
        <div className="head">
          <h3 className="announcement-title">Create an Events and Career Post</h3>
          <div className="announcement-actions">
            <button className="btn draft" onClick={() => handleSubmit("draft")}>
              Draft
            </button>
            <button className="btn submit" onClick={() => handleSubmit("posted")}>
              Post
            </button>
          </div>
        </div>
      </div>

      {/* FORM BODY */}
      <div className="cms-card cms-form-card">
        <label htmlFor="cms-post-type">Post Type</label>
        <div className="cms-radio-group">
          <label className="cms-radio-option">
            <input type="radio" name="postType" value="event" defaultChecked />
            Event
          </label>
          <label className="cms-radio-option">
            <input type="radio" name="postType" value="career" />
            Career
          </label>
        </div>
        <br />
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
                placeholder="e.g. Workshop, Job, Internship"
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
            <div className="cms-form-group" style={{ flex: 1, minWidth: "250px" }}>
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