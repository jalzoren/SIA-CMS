import { useEffect, useRef, useState } from "react";
import Quill from "quill";
import Swal from "sweetalert2";

import "../css/about.css";
import "quill/dist/quill.snow.css";
import { IoMdCreate } from "react-icons/io";

import GeneralSettings from "../components/settings/General";

export default function Hospital() {
  const quillRef = useRef(null);
  const fileInputRef = useRef(null);
  const [quillInstance, setQuillInstance] = useState(null);
  const [fileInfo, setFileInfo] = useState(null);
  const [activeTab, setActiveTab] = useState("general");

  const [aboutForm, setAboutForm] = useState({
    aboutHospital: "",
    mission: "",
    vision: "",
    qualityPolicy: "",
    coreValues: "",
    ourHistory: "",
    privacyPolicy: "",
  });

  // Form states for Contact tab
  const [contactForm, setContactForm] = useState({
    contactUs: "",
    contactInfo: "",
    mobileNumbers: "",
  });

  // Form states for Services tab
  const [servicesForm, setServicesForm] = useState({
    shortTitle: "",
    fullTitle: "",
    topicTags: "",
  });

  // Initialize Quill editor
  useEffect(() => {
    if (activeTab === "services" && quillRef.current && !quillRef.current.__quill) {
      const q = new Quill(quillRef.current, {
        theme: "snow",
        placeholder: "Write your service description here...",
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
      quillRef.current.__quill = q;
      setQuillInstance(q);
    }
  }, [activeTab]);

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

  // About form
  const handleAboutFormChange = (field, value) => {
    setAboutForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Contact form
  const handleContactFormChange = (field, value) => {
    setContactForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Services form
  const handleServicesFormChange = (field, value) => {
    setServicesForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Submit Handler
  const handleSubmit = (status) => {
    const mode = status === "draft" ? "Draft Saved" : "Published";
    let content;

    if (activeTab === "general") {
      content = "General Settings Updated"; // Your component handles its own data
    } else if (activeTab === "about") {
      content = aboutForm;
    } else if (activeTab === "contact") {
      content = contactForm;
    } else if (activeTab === "services") {
      const description = quillRef.current?.__quill?.root.innerHTML || "";
      content = {
        ...servicesForm,
        description,
        fileInfo,
      };
    }

    Swal.fire({
      icon: "success",
      title: `${mode} Successfully!`,
      text: `Your content has been ${status}.`,
      confirmButtonColor: "#043873",
    });

    console.log({
      tab: activeTab,
      content,
      status,
    });
  };

  return (
    <div className="cms-announcement-page">
      {/* Page Header */}
      <h2 className="title">Hospital CMS Management</h2>
      <ul className="breadcrumbs">
        <li>CMS</li>
        <li className="divider">/</li>
        <li>Admin Panel</li>
      </ul>

      {/* Tabs Section */}
      <div className="cms-tabs">
        <div
          className={`cms-tab-item ${activeTab === "general" ? "active" : ""}`}
          onClick={() => setActiveTab("general")}
        >
          General Settings
        </div>

        <div
          className={`cms-tab-item ${activeTab === "about" ? "active" : ""}`}
          onClick={() => setActiveTab("about")}
        >
          About Hospital
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
            {activeTab === "general" && "General Settings Update"}
            {activeTab === "about" && "About Hospital Update"}
            {activeTab === "services" && "Services Update"}
            {activeTab === "contact" && "Contact Update"}
          </h3>

          <div className="announcement-actions">
            <button className="btn draft" type="button" onClick={() => handleSubmit("draft")}>
              Draft
            </button>
            <button className="btn submit" type="button" onClick={() => handleSubmit("published")}>
              Publish
            </button>
          </div>
        </div>
      </div>

      {/* Form Area */}
      <div className="cms-card cms-form-card">
        <form className="cms-form" onSubmit={(e) => e.preventDefault()}>

          {/* GENERAL SETTINGS TAB */}
          {activeTab === "general" && (
            <div className="general-settings-wrapper">
              <GeneralSettings />
            </div>
          )}

          {/* ABOUT TAB */}
          {activeTab === "about" && (
            <div className="about-form-container">
              <div className="about-form-row">
                <div className="about-form-group">
                  <label>About Hospital Description</label>
                  <input
                    type="text"
                    value={aboutForm.aboutHospital}
                    placeholder="Enter About Hospital Description"
                    onChange={(e) => handleAboutFormChange("aboutHospital", e.target.value)}
                  />
                </div>

                <div className="about-form-group">
                  <label>Mission Description</label>
                  <input
                    type="text"
                    value={aboutForm.mission}
                    placeholder="Enter Mission Description"
                    onChange={(e) => handleAboutFormChange("mission", e.target.value)}
                  />
                </div>

                <div className="about-form-group">
                  <label>Vision Description</label>
                  <input
                    type="text"
                    value={aboutForm.vision}
                    placeholder="Enter Vision Description"
                    onChange={(e) => handleAboutFormChange("vision", e.target.value)}
                  />
                </div>
              </div>
            </div>
          )}

          {/* CONTACT TAB */}
          {activeTab === "contact" && (
            <div className="about-form-container">
              <div className="about-form-row">
                <div className="about-form-group">
                  <label>Contact Us Description</label>
                  <input
                    type="text"
                    value={contactForm.contactUs}
                    placeholder="Enter Contact Us Description"
                    onChange={(e) => handleContactFormChange("contactUs", e.target.value)}
                  />
                </div>

                <div className="about-form-group">
                  <label>Contact Information</label>
                  <input
                    type="text"
                    value={contactForm.contactInfo}
                    placeholder="Enter Contact Information"
                    onChange={(e) => handleContactFormChange("contactInfo", e.target.value)}
                  />
                </div>

                <div className="about-form-group">
                  <label>Mobile Numbers</label>
                  <input
                    type="text"
                    value={contactForm.mobileNumbers}
                    placeholder="Enter Mobile Numbers"
                    onChange={(e) => handleContactFormChange("mobileNumbers", e.target.value)}
                  />
                </div>
              </div>
            </div>
          )}

          {/* SERVICES TAB */}
          {activeTab === "services" && (
            <>
              <div className="cms-form-row">
                <div className="cms-form-group">
                  <label>Short Title</label>
                  <input
                    type="text"
                    value={servicesForm.shortTitle}
                    placeholder="Enter Short Title"
                    onChange={(e) => handleServicesFormChange("shortTitle", e.target.value)}
                  />
                </div>

                <div className="cms-form-group">
                  <label>Full Title</label>
                  <input
                    type="text"
                    value={servicesForm.fullTitle}
                    placeholder="Enter Full Title"
                    onChange={(e) => handleServicesFormChange("fullTitle", e.target.value)}
                  />
                </div>

                <div className="cms-form-group">
                  <label>Topic Tags</label>
                  <input
                    type="text"
                    value={servicesForm.topicTags}
                    placeholder="Enter Topic Tags"
                    onChange={(e) => handleServicesFormChange("topicTags", e.target.value)}
                  />
                </div>
              </div>

              <div className="cms-form-row" style={{ alignItems: "flex-start" }}>
                <div className="cms-form-group" style={{ flex: 2 }}>
                  <label>Description Box</label>
                  <div ref={quillRef} className="cms-quill-editor"></div>
                </div>

                <div className="cms-form-group" style={{ flex: 1 }}>
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
                      <IoMdCreate /> Choose Image
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
            </>
          )}
        </form>
      </div>
    </div>
  );
}
