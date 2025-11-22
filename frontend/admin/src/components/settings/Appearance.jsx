// frontend/admin/src/components/settings/Appearance.jsx
import { useState, useEffect } from "react";
import axios from "axios";
import { FaCheckCircle, FaInfoCircle } from "react-icons/fa";

function Appearance() {
  const [selectedLayout, setSelectedLayout] = useState("classic");
  const [fontFamily, setFontFamily] = useState("Poppins");
  const [fontSize, setFontSize] = useState("Medium");
  const [fontColor, setFontColor] = useState("Header");
  const [previewText, setPreviewText] = useState("");
  const [themeColor, setThemeColor] = useState("bg-primary");
  
  // Loading and status states
  const [loading, setLoading] = useState(false);
  const [fetchingLayout, setFetchingLayout] = useState(true);
  const [message, setMessage] = useState({ type: "", text: "" });

  // Fetch current layout from backend on mount
  useEffect(() => {
    fetchCurrentLayout();
  }, []);

  const fetchCurrentLayout = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/layout");
      if (res.data.layout) {
        setSelectedLayout(res.data.layout);
        console.log("✓ Current layout fetched:", res.data.layout);
      }
    } catch (err) {
      console.error("Failed to fetch layout:", err);
      showMessage("error", "Failed to load current layout settings");
    } finally {
      setFetchingLayout(false);
    }
  };

  // Update body class whenever selectedLayout changes (for preview)
  useEffect(() => {
    document.body.classList.remove("classic", "modern", "compact");
    document.body.classList.add(selectedLayout);
  }, [selectedLayout]);

  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: "", text: "" }), 5000);
  };

  // Save layout to backend
  const handleSave = async () => {
    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      const res = await axios.post("http://localhost:5000/api/layout", {
        layout: selectedLayout,
      });

      if (res.data.success) {
        showMessage("success", `✓ Layout "${selectedLayout}" saved successfully!`);
        console.log("Layout saved:", res.data);
        
        // Optional: Show notification that website will reflect changes
        setTimeout(() => {
          if (window.confirm("Layout saved! Would you like to preview it on the website?")) {
            window.open("/", "_blank");
          }
        }, 1000);
      }
    } catch (err) {
      console.error("Error saving layout:", err);
      showMessage("error", `✗ Failed to save layout: ${err.response?.data?.message || err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    // Reset to initial/fetched values
    fetchCurrentLayout();
    setFontFamily("Poppins");
    setFontSize("Medium");
    setFontColor("Header");
    setPreviewText("");
    setThemeColor("bg-primary");
    showMessage("info", "Changes discarded");
  };

  // Layout descriptions for better UX
  const layoutInfo = {
    classic: {
      title: "Classic Layout",
      description: "Traditional medical website design with professional blue aesthetics",
      features: ["Standard section order", "Professional appearance", "Texture Blue color scheme"],
      preview: " Home → Welcome → Services → Announcements → Contact"
    },
    modern: {
      title: "Modern Layout",
      description: "Contemporary design with gradient backgrounds and dynamic reordering",
      features: ["Gradient backgrounds", "Reordered sections", "Glass-morphism effects"],
      preview: " Home → Services → Announcements → Welcome → Contact"
    }
  };

  return (
    <div className="cms-card">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="cms-section-title mb-0">Appearance Settings</h3>
        {fetchingLayout && (
          <span className="badge bg-secondary">Loading current settings...</span>
        )}
      </div>

      {/* Status Message */}
      {message.text && (
        <div 
          className={`alert alert-${
            message.type === "success" ? "success" : 
            message.type === "error" ? "danger" : "info"
          } d-flex align-items-center`}
          role="alert"
        >
          <FaInfoCircle className="me-2" />
          {message.text}
        </div>
      )}

      <div className="row">
        {/* Font Family */}
        <div className="col-md-4 mb-3">
          <label className="form-label fw-semibold">Font Family</label>
          <select 
            className="form-select"
            value={fontFamily} 
            onChange={(e) => setFontFamily(e.target.value)}
          >
            <option>Poppins</option>
            <option>Roboto</option>
            <option>Inter</option>
            <option>Arial</option>
          </select>
        </div>

        {/* Font Size */}
        <div className="col-md-4 mb-3">
          <label className="form-label fw-semibold">Font Size</label>
          <select 
            className="form-select"
            value={fontSize} 
            onChange={(e) => setFontSize(e.target.value)}
          >
            <option>Small</option>
            <option>Medium</option>
            <option>Large</option>
          </select>
        </div>

        {/* Font Color */}
        <div className="col-md-4 mb-3">
          <label className="form-label fw-semibold">Font Color</label>
          <select 
            className="form-select"
            value={fontColor} 
            onChange={(e) => setFontColor(e.target.value)}
          >
            <option>Header</option>
            <option>Body</option>
          </select>
        </div>

        {/* Preview Text */}
        <div className="col-md-12 mb-4">
          <label className="form-label fw-semibold">Text Preview</label>
          <input
            type="text"
            className="form-control"
            placeholder="Type to preview font styling..."
            value={previewText}
            onChange={(e) => setPreviewText(e.target.value)}
          />
          <div 
            className="mt-3 p-3 bg-light rounded"
            style={{
              fontFamily,
              fontSize: fontSize === "Small" ? "14px" : fontSize === "Medium" ? "18px" : "22px",
              color: fontColor === "Header" ? "#000" : "#555",
              minHeight: "60px",
              display: "flex",
              alignItems: "center"
            }}
          >
            {previewText || "Your preview text will appear here..."}
          </div>
        </div>

        {/* Theme Colors */}
        <div className="col-md-12 mb-4">
          <h6 className="fw-semibold mb-3">Theme Colors</h6>
          <div className="d-flex gap-3">
            {[
              { color: "bg-primary", name: "Primary Blue" },
              { color: "bg-info", name: "Info Cyan" },
              { color: "bg-light", name: "Light Gray" }
            ].map((theme) => (
              <div key={theme.color} className="text-center">
                <div
                  className={`theme-box ${theme.color} rounded`}
                  onClick={() => setThemeColor(theme.color)}
                  style={{
                    width: "60px",
                    height: "60px",
                    cursor: "pointer",
                    border: themeColor === theme.color ? "3px solid #000" : "2px solid #dee2e6",
                    position: "relative",
                    transition: "all 0.3s ease"
                  }}
                >
                  {themeColor === theme.color && (
                    <div 
                      className="position-absolute top-50 start-50 translate-middle"
                      style={{ background: "white", borderRadius: "50%", padding: "4px" }}
                    >
                      <FaCheckCircle size={20} color="#000" />
                    </div>
                  )}
                </div>
                <small className="d-block mt-1">{theme.name}</small>
              </div>
            ))}
          </div>
        </div>

        {/* Website Layout - Enhanced */}
        <div className="col-md-12 mt-4">
          <h5 className="fw-bold mb-3">Website Layout</h5>
          <p className="text-muted small mb-4">
            Choose how your website sections are displayed to visitors. Changes take effect immediately.
          </p>

          <div className="row g-3">
            {["classic", "modern"].map((layout) => (
              <div key={layout} className="col-md-6">
                <div
                  className={`card h-100 ${selectedLayout === layout ? "border-primary border-3" : ""}`}
                  onClick={() => setSelectedLayout(layout)}
                  style={{
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    position: "relative"
                  }}
                >
                  {selectedLayout === layout && (
                    <div 
                      className="position-absolute top-0 end-0 m-2"
                      style={{
                        background: "#10b981",
                        color: "white",
                        padding: "4px 12px",
                        borderRadius: "12px",
                        fontSize: "12px",
                        fontWeight: "bold"
                      }}
                    >
                      <FaCheckCircle className="me-1" /> SELECTED
                    </div>
                  )}

                  <div className="card-body">
                    {/* Visual Preview */}
                    <div 
                      className={`layout-preview layout-${layout} rounded mb-3`}
                      style={{ 
                        height: "120px", 
                        background: layout === "modern" 
                          ? "linear-gradient(135deg, #4f9cf9, #2563eb)" 
                          : "linear-gradient(135deg, #043873, #0a5a9e)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "white",
                        fontSize: "24px"
                      }}
                    >
                      {layout === "modern" ? "MODERN" : "CLASSIC"}
                    </div>

                    <h6 className="fw-bold">{layoutInfo[layout].title}</h6>
                    <p className="text-muted small mb-2">
                      {layoutInfo[layout].description}
                    </p>

                    {/* Section Preview */}
                    <div 
                      className="p-2 bg-light rounded mb-2"
                      style={{ fontSize: "11px", fontFamily: "monospace" }}
                    >
                      {layoutInfo[layout].preview}
                    </div>

                    {/* Features */}
                    <ul className="small mb-0" style={{ paddingLeft: "20px" }}>
                      {layoutInfo[layout].features.map((feature, idx) => (
                        <li key={idx} className="text-muted">{feature}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="col-md-12 mt-4">
          <div className="d-flex gap-3">
            <button 
              className="btn btn-primary px-4 py-2"
              onClick={handleSave}
              disabled={loading || fetchingLayout}
            >
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Saving...
                </>
              ) : (
                <>
                  <FaCheckCircle className="me-2" />
                  Save Changes
                </>
              )}
            </button>
            
            <button 
              className="btn btn-secondary px-4 py-2"
              onClick={handleCancel}
              disabled={loading}
            >
              Cancel
            </button>

            <button
              className="btn btn-outline-info px-4 py-2 ms-auto"
              onClick={() => window.open("/", "_blank")}
            >
              Preview Website
            </button>
          </div>
        </div>

        {/* Info Box */}
        <div className="col-md-12 mt-4">
          <div className="alert alert-info" role="alert">
            <strong>ℹ️ How it works:</strong> When you save your layout preference, Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
                placerat scelerisque tortor ornare
          </div>
        </div>
      </div>
    </div>
  );
}

export default Appearance;