import { useEffect, useRef, useState } from "react";
import Quill from "quill";
import Swal from "sweetalert2";
import "../css/News.css";
import "quill/dist/quill.snow.css";
import { IoMdCreate } from "react-icons/io";

export default function AnnouncementAdmin() {
  const quillRef = useRef(null);
  const [shortTitle, setShortTitle] = useState("");
  const [fullTitle, setFullTitle] = useState("");
  const [tags, setTags] = useState("");

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
            ["link", "image", "code-block"],
            ["clean"],
          ],
        },
      });
      quillRef.current.__quill = quill;
    }
  }, []);

  const handleSubmit = async (status) => {
    const quill = quillRef.current.__quill;
    const description = quill.root.innerHTML;

    if (!shortTitle.trim() || !fullTitle.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Missing fields",
        text: "Please fill out the short and full title fields.",
      });
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/announcements", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          short_title: shortTitle,
          full_title: fullTitle,
          topic_tags: tags,
          description,
          status,
          author: 1, // default author
        }),
      });

      const result = await response.json();

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title:
            status === "draft"
              ? "Announcement saved as draft!"
              : "Announcement published successfully!",
          timer: 2000,
          showConfirmButton: false,
        });

        setShortTitle("");
        setFullTitle("");
        setTags("");
        quill.root.innerHTML = "";
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: result.message || "Something went wrong.",
        });
      }
    } catch (err) {
      console.error("Error saving announcement:", err);
      Swal.fire({
        icon: "error",
        title: "Server Error",
        text: "Failed to connect to the backend.",
      });
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
              Post
            </button>
          </div>
        </div>
      </div>

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

          <div className="cms-form-group">
            <label>Description Box</label>
            <div ref={quillRef} className="cms-quill-editor"></div>
          </div>
        </form>
      </div>
    </div>
  );
}
