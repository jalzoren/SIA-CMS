import { useEffect, useRef } from "react";
import Quill from "quill";
import "../css/Events.css";
import "quill/dist/quill.snow.css";
import { IoMdCreate } from "react-icons/io";

export default function Events() {
  const quillRef = useRef(null);

  useEffect(() => {
    // Prevent double initialization due to React StrictMode
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

  return (
    <div className="cms-announcement-page">
      {/* PAGE HEADER */}
      <h2 className="title">Events and Careers</h2>
      <ul className="breadcrumbs">
        <li>Events and Careers</li>
        <li className="divider">/</li>
        <li>Admin Dashboard</li>
      </ul>

      {/* CREATE POST HEADER CARD */}
      <div className="card announcement-card">
        <div className="head">
          <h3 className="announcement">Create an Events and Career Post</h3>
          <div className="announcement-actions">
            <button className="btn draft">Draft</button>
            <button className="btn submit">
              Submit
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
            <br></br>
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
                placeholder="e.g. Event, Reminder, Holiday"
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
