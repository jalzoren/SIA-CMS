import { useEffect, useRef, useState } from "react";
import Quill from "quill";
import Swal from "sweetalert2";
import "../css/News.css";
import "quill/dist/quill.snow.css";
import { IoMdCreate } from "react-icons/io";

export default function News() {
  const quillRef = useRef(null);
  const fileInputRef = useRef(null);

  const user = JSON.parse(localStorage.getItem("user")); 
  if (!user) {
    alert("Please log in first!");
    return null;
  }

  const [shortTitle, setShortTitle] = useState("");
  const [fullTitle, setFullTitle] = useState("");
  const [tags, setTags] = useState("");
  const [fileInfo, setFileInfo] = useState(null);

  // Initialize Quill editor
  useEffect(() => {
    if (quillRef.current && !quillRef.current.__quill) {
      const quill = new Quill(quillRef.current, {
        theme: "snow",
        placeholder: "Write your news article here...",
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

  // Handle image selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const isImage = file.type.startsWith("image/");
    const preview = isImage ? URL.createObjectURL(file) : null;

    setFileInfo({ file, name: file.name, isImage, preview });
  };

  // Submit news post
  const handleSubmit = async (status) => {
    const description = quillRef.current.__quill.root.innerHTML;

    const formData = new FormData();
    formData.append("short_title", shortTitle);
    formData.append("full_title", fullTitle);
    formData.append("topic_tags", tags);
    formData.append("description", description);
    formData.append("status", status);
    formData.append("author", user.id); // logged-in author

    if (fileInfo?.file) formData.append("image", fileInfo.file);

    try {
      const res = await fetch("http://localhost:5000/api/news", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (data.success) {
        Swal.fire({
          icon: "success",
          title: `News ${status} successfully!`,
          timer: 2000,
          showConfirmButton: false,
        });
        setShortTitle("");
        setFullTitle("");
        setTags("");
        quillRef.current.__quill.setContents([]);
        setFileInfo(null);
      } else {
        Swal.fire({ icon: "error", title: "Error", text: data.message || "Something went wrong" });
      }
    } catch (err) {
      console.error(err);
      Swal.fire({ icon: "error", title: "Server Error", text: "Failed to connect to backend." });
    }
  };

  return (
    <div className="cms-announcement-page">
      <h2 className="title">News</h2>
      <ul className="breadcrumbs">
        <li>News</li>
        <li className="divider">/</li>
        <li>Admin Panel</li>
      </ul>

      {/* CREATE POST HEADER CARD */}
      <div className="card announcement-card">
        <div className="head">
          <h3 className="announcement-title">
            <IoMdCreate style={{ marginRight: "6px" }} />
            Create a News Article
          </h3>
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
        <form className="cms-form" onSubmit={(e) => e.preventDefault()}>
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
                placeholder="e.g. Event, Reminder, Holiday"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
              />
            </div>
          </div>

          {/* DESCRIPTION + FILE UPLOAD ROW */}
          <div className="cms-form-row" style={{ alignItems: "flex-start" }}>
            <div className="cms-form-group" style={{ flex: 2 }}>
              <label>Description Box</label>
              <div ref={quillRef} className="cms-quill-editor"></div>
            </div>

            <div className="cms-form-group" style={{ flex: 1, minWidth: "250px" }}>
              <label>Upload Image</label>
              <div className="file-upload-container" onClick={() => fileInputRef.current?.click()}>
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
                      <img src={fileInfo.preview} alt="preview" className="file-preview-img" />
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
