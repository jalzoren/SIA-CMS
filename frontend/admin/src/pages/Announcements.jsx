import { useEffect, useRef, useState } from "react";
import Quill from "quill";
import Swal from "sweetalert2";
import "../css/News.css";
import "quill/dist/quill.snow.css";
import { IoMdCreate } from "react-icons/io";

export default function AnnouncementAdmin() {
  const quillRef = useRef(null);
  const fileInputRef = useRef(null); // ← for file input click
  const [fileInfo, setFileInfo] = useState(null); // ← store file info for preview
  const [shortTitle, setShortTitle] = useState("");
  const [fullTitle, setFullTitle] = useState("");
  const [tags, setTags] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (quillRef.current && !quillRef.current.__quill) {
      const quill = new Quill(quillRef.current, {
        theme: "snow",
        placeholder: "Write your announcement description here...",
        modules: {
          toolbar: [
            [{ header: [1, 2, false] }],
            ["bold", "italic", "underline", "strike"],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link", "code-block"],
            ["clean"],
          ],
        },
      });
      quillRef.current.__quill = quill;
    }
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const isImage = file.type.startsWith("image/");
    if (isImage) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setFileInfo({
          file,
          name: file.name,
          preview: ev.target?.result,
          isImage: true,
        });
      };
      reader.readAsDataURL(file);
    } else {
      setFileInfo({ file, name: file.name, isImage: false });
    }
  };

  const handleSubmit = async (status) => {
    const quill = quillRef.current.__quill;
    const description = quill.root.innerHTML;

    if (!shortTitle.trim() || !fullTitle.trim()) {
      Swal.fire({ icon: "warning", title: "Missing fields", text: "Please fill out all required fields." });
      return;
    }

    const formData = new FormData();
    formData.append("short_title", shortTitle);
    formData.append("full_title", fullTitle);
    formData.append("topic_tags", tags);
    formData.append("description", description);
    formData.append("status", status);
    // Dynamic author
    if (user && user.id) {
      formData.append("author", user.id); // <-- send the logged-in user ID
    }

    if (fileInfo?.file) formData.append("image", fileInfo.file);

    try {
      const res = await fetch("http://localhost:5000/api/announcements", {
        method: "POST",
        body: formData,
      });
      const result = await res.json();
      if (res.ok) {
        Swal.fire({ icon: "success", title: "Announcement saved!", timer: 2000, showConfirmButton: false });
        setShortTitle(""); setFullTitle(""); setTags(""); quill.root.innerHTML = ""; setFileInfo(null);
      } else {
        Swal.fire({ icon: "error", title: "Error", text: result.message || "Something went wrong" });
      }
    } catch (err) {
      Swal.fire({ icon: "error", title: "Server Error", text: "Failed to connect to backend." });
    }
  };

  return (
    <div className="cms-announcement-page">
      <h2 className="title">Announcements</h2>
      <ul className="breadcrumbs">
        <li>Announcements</li>
        <li className="divider">/</li>
        <li>Admin Panel</li>
      </ul>

      <div className="card announcement-card">
        <div className="head">
          <h3 className="announcement-title">
            <IoMdCreate style={{ marginRight: "6px" }} />
            Create an Announcement
          </h3>
          <div className="announcement-actions">
            <button className="btn draft" type="button" onClick={() => handleSubmit("draft")}>Draft</button>
            <button className="btn submit" type="button" onClick={() => handleSubmit("published")}>Post</button>
          </div>
        </div>
      </div>

      <div className="cms-card cms-form-card">
        <form className="cms-form" onSubmit={(e) => e.preventDefault()}>
          <div className="cms-form-row">
            <div className="cms-form-group">
              <label htmlFor="cms-short-title">Short Title</label>
              <input type="text" id="cms-short-title" placeholder="Enter short title"
                value={shortTitle} onChange={(e) => setShortTitle(e.target.value)} />
            </div>
            <div className="cms-form-group">
              <label htmlFor="cms-full-title">Full Title</label>
              <input type="text" id="cms-full-title" placeholder="Enter full title"
                value={fullTitle} onChange={(e) => setFullTitle(e.target.value)} />
            </div>
            <div className="cms-form-group">
              <label htmlFor="cms-tags">Topic Tags</label>
              <input type="text" id="cms-tags" placeholder="e.g. Event, Reminder, Holiday"
                value={tags} onChange={(e) => setTags(e.target.value)} />
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
              <div className="file-upload-container" onClick={() => fileInputRef.current?.click()}>
                <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} className="file-input-hidden" />
                <label className="upload-label">
                  <IoMdCreate style={{ marginRight: "8px" }} /> Choose Image
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
