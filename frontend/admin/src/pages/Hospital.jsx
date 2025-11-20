import { useEffect, useRef, useState } from "react";
import Quill from "quill";
import Swal from "sweetalert2";
import "../css/about.css";
import "quill/dist/quill.snow.css";
import { IoMdCreate } from "react-icons/io";

export default function Adminabout() {
  const quillRef = useRef(null);
  const fileInputRef = useRef(null);
  const [quillInstance, setQuillInstance] = useState(null);
  const [fileInfo, setFileInfo] = useState(null);
  const [activeTab, setActiveTab] = useState("about");
  const isQuillInitialized = useRef(false);

  // Form states for About Hospital tab
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

  // Initialize Quill editor (only for services tab)
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

  // Handle about form input change
  const handleAboutFormChange = (field, value) => {
    setAboutForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Handle contact form input change
  const handleContactFormChange = (field, value) => {
    setContactForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Handle services form input change
  const handleServicesFormChange = (field, value) => {
    setServicesForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Handle submit (draft/publish)
  const handleSubmit = (status) => {
    const mode = status === "draft" ? "Draft Saved" : "Published";
    let content;

    if (activeTab === "about") {
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
          {/* About Hospital Tab - Multiple Text Inputs */}
          {activeTab === "about" && (
            <div className="about-form-container">
              {/* Row 1: About Hospital, Mission, Vision */}
              <div className="about-form-row">
                <div className="about-form-group">
                  <label>About Hospital Description</label>
                  <input
                    type="text"
                    placeholder="Enter About Hospital Description"
                    value={aboutForm.aboutHospital}
                    onChange={(e) => handleAboutFormChange("aboutHospital", e.target.value)}
                  />
                </div>
                <div className="about-form-group">
                  <label>Mission Description</label>
                  <input
                    type="text"
                    placeholder="Enter Mission Description"
                    value={aboutForm.mission}
                    onChange={(e) => handleAboutFormChange("mission", e.target.value)}
                  />
                </div>
                <div className="about-form-group">
                  <label>Vision Description</label>
                  <input
                    type="text"
                    placeholder="Enter Vision Description"
                    value={aboutForm.vision}
                    onChange={(e) => handleAboutFormChange("vision", e.target.value)}
                  />
                </div>
              </div>

              {/* Row 2: Quality Policy, Core Values, Our History */}
              <div className="about-form-row">
                <div className="about-form-group">
                  <label>Quality Policy Description</label>
                  <input
                    type="text"
                    placeholder="Enter Quality Policy Description"
                    value={aboutForm.qualityPolicy}
                    onChange={(e) => handleAboutFormChange("qualityPolicy", e.target.value)}
                  />
                </div>
                <div className="about-form-group">
                  <label>Core Values Description</label>
                  <input
                    type="text"
                    placeholder="Enter Core Values Description"
                    value={aboutForm.coreValues}
                    onChange={(e) => handleAboutFormChange("coreValues", e.target.value)}
                  />
                </div>
                <div className="about-form-group">
                  <label>Our History Description</label>
                  <input
                    type="text"
                    placeholder="Enter Our History Description"
                    value={aboutForm.ourHistory}
                    onChange={(e) => handleAboutFormChange("ourHistory", e.target.value)}
                  />
                </div>
              </div>

              {/* Row 3: Privacy Policy (full width) */}
              <div className="about-form-row">
                <div className="about-form-group full-width">
                  <label>Privacy Policy Description</label>
                  <input
                    type="text"
                    placeholder="Enter Privacy Policy Description"
                    value={aboutForm.privacyPolicy}
                    onChange={(e) => handleAboutFormChange("privacyPolicy", e.target.value)}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Contact Tab - Multiple Text Inputs */}
          {activeTab === "contact" && (
            <div className="about-form-container">
              {/* Row 1: Contact Us, Contact Information, Mobile Numbers */}
              <div className="about-form-row">
                <div className="about-form-group">
                  <label>Contact Us Description</label>
                  <input
                    type="text"
                    placeholder="Enter Contact Us Description"
                    value={contactForm.contactUs}
                    onChange={(e) => handleContactFormChange("contactUs", e.target.value)}
                  />
                </div>
                <div className="about-form-group">
                  <label>Contact Information</label>
                  <input
                    type="text"
                    placeholder="Enter Contact Information"
                    value={contactForm.contactInfo}
                    onChange={(e) => handleContactFormChange("contactInfo", e.target.value)}
                  />
                </div>
                <div className="about-form-group">
                  <label>Mobile Numbers</label>
                  <input
                    type="text"
                    placeholder="Enter Mobile Numbers"
                    value={contactForm.mobileNumbers}
                    onChange={(e) => handleContactFormChange("mobileNumbers", e.target.value)}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Services Tab - News-style Layout */}
          {activeTab === "services" && (
            <>
              {/* Row 1: Short Title, Full Title, Topic Tags */}
              <div className="cms-form-row">
                <div className="cms-form-group">
                  <label>Short Title</label>
                  <input
                    type="text"
                    placeholder="Enter Short Title"
                    value={servicesForm.shortTitle}
                    onChange={(e) => handleServicesFormChange("shortTitle", e.target.value)}
                  />
                </div>
                <div className="cms-form-group">
                  <label>Full Title</label>
                  <input
                    type="text"
                    placeholder="Enter Full Title"
                    value={servicesForm.fullTitle}
                    onChange={(e) => handleServicesFormChange("fullTitle", e.target.value)}
                  />
                </div>
                <div className="cms-form-group">
                  <label>Topic Tags</label>
                  <input
                    type="text"
                    placeholder="Enter Topic Tags"
                    value={servicesForm.topicTags}
                    onChange={(e) => handleServicesFormChange("topicTags", e.target.value)}
                  />
                </div>
              </div>

              {/* Row 2: Description Box + Image Upload */}
              <div className="cms-form-row" style={{ alignItems: "flex-start" }}>
                <div className="cms-form-group" style={{ flex: 2 }}>
                  <label>Description Box</label>
                  <div ref={quillRef} className="cms-quill-editor"></div>
                </div>
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
            </>
          )}
        </form>
      </div>
    </div>
  );
}