import { useState, useEffect } from "react";

function Appearance() {
  const [fontFamily, setFontFamily] = useState("Poppins");
  const [fontSize, setFontSize] = useState("Medium");
  const [fontColor, setFontColor] = useState("Header");
  const [previewText, setPreviewText] = useState("");
  const [selectedLayout, setSelectedLayout] = useState("classic");
  const [themeColor, setThemeColor] = useState("bg-primary");
  const [loading, setLoading] = useState(false);
  const [fetched, setFetched] = useState(false);

  // ✅ Load Google Fonts dynamically
  const loadFont = (fontName) => {
    if (!fontName) return;
    const existing = document.querySelector(`#font-${fontName}`);
    if (!existing) {
      const link = document.createElement("link");
      link.id = `font-${fontName}`;
      link.href = `https://fonts.googleapis.com/css2?family=${fontName.replace(
        " ",
        "+"
      )}:wght@400;500;600;700&display=swap`;
      link.rel = "stylesheet";
      document.head.appendChild(link);
    }
  };
// ✅ Apply global appearance immediately (smooth transition)
const applyAppearance = (settings) => {
  if (!settings) return;

  // Determine theme color
  const theme =
    settings.themeColor === "bg-primary"
      ? "#043873"
      : settings.themeColor === "bg-info"
      ? "#4f9cf9"
      : "#f3f7ff"; // ← use rgb(243,247,255)

  // Apply transitions
  document.body.style.transition =
    "background-color 0.4s ease, color 0.3s ease, font-family 0.3s ease";

  // Apply background color
  document.body.style.backgroundColor = theme;

  // Apply font globally
  const root = document.documentElement;
  root.style.setProperty("--app-font-family", settings.fontFamily || "Poppins");
  root.style.setProperty("--app-font-size", settings.fontSize || "Medium");

  // Also apply inline to key elements (for instant update)
  document.querySelectorAll("*").forEach((el) => {
    el.style.fontFamily = settings.fontFamily || "Poppins";
  });
};


  // ✅ Fetch saved settings on mount
  useEffect(() => {
    // Set default white before fetch (for smoother loading)
    document.body.style.backgroundColor = "#ffffff";

    const fetchSettings = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/settings/appearance");
        if (!res.ok) throw new Error("Failed to fetch appearance settings");

        const data = await res.json();
        setFontFamily(data.fontFamily || "Poppins");
        setFontSize(data.fontSize || "Medium");
        setFontColor(data.fontColor || "Header");
        setSelectedLayout(data.layout || "classic");
        setThemeColor(data.themeColor || "bg-primary");
        loadFont(data.fontFamily || "Poppins");
        applyAppearance(data);
      } catch (err) {
        console.error("❌ Fetch error:", err);
      } finally {
        setFetched(true);
      }
    };

    fetchSettings();
  }, []);

  // ✅ Save changes to backend
  const handleSave = async () => {
    const data = {
      fontFamily,
      fontSize,
      fontColor,
      layout: selectedLayout,
      themeColor,
    };

    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/settings/appearance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const json = await res.json();
      alert(json.message || "✅ Settings saved!");

      // Apply instantly on save
      loadFont(fontFamily);
      applyAppearance(data);
    } catch (err) {
      console.error("❌ Save error:", err);
      alert("⚠️ Unable to connect to server.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Cancel and restore defaults
  const handleCancel = () => {
    const defaults = {
      fontFamily: "Poppins",
      fontSize: "Medium",
      fontColor: "Header",
      layout: "classic",
      themeColor: "bg-primary",
    };

    setFontFamily(defaults.fontFamily);
    setFontSize(defaults.fontSize);
    setFontColor(defaults.fontColor);
    setSelectedLayout(defaults.layout);
    setThemeColor(defaults.themeColor);
    applyAppearance(defaults);
  };

  if (!fetched)
    return (
      <div className="cms-card text-center py-5">
        <p>Loading appearance settings...</p>
      </div>
    );

  return (
    <div className="cms-card">
      <h3 className="cms-section-title mb-3">Appearance</h3>
      <div className="row">
        {/* Font Family */}
        <div className="col-md-4 mb-3">
          <label className="form-label fw-semibold">Font Family</label>
          <select
            className="form-select"
            value={fontFamily}
            onChange={(e) => {
              setFontFamily(e.target.value);
              loadFont(e.target.value);
            }}
          >
            <option value="Poppins">Poppins</option>
            <option value="Roboto">Roboto</option>
            <option value="Inter">Inter</option>
            <option value="Open Sans">Open Sans</option>
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
            <option value="Small">Small</option>
            <option value="Medium">Medium</option>
            <option value="Large">Large</option>
          </select>
        </div>

        {/* Font Color */}
        <div className="col-md-4 mb-3">
          <label className="form-label fw-semibold">Font Parts</label>
          <select
            className="form-select"
            value={fontColor}
            onChange={(e) => setFontColor(e.target.value)}
          >
            <option value="Header">Header</option>
            <option value="Body">Body</option>
          </select>
        </div>

        {/* Preview */}
        <div className="col-md-12 mt-3">
          <label className="form-label fw-semibold">Preview</label>
          <input
            type="text"
            className="form-control"
            placeholder="Type preview text..."
            value={previewText}
            onChange={(e) => setPreviewText(e.target.value)}
          />
          <p
            className="mt-3 border p-3 rounded"
            style={{
              fontFamily,
              fontSize:
                fontSize === "Small"
                  ? "14px"
                  : fontSize === "Medium"
                  ? "18px"
                  : "22px",
              color: fontColor === "Header" ? "#000" : "#555",
            }}
          >
            {previewText || "Your preview text will appear here."}
          </p>
        </div>

        {/* Theme Colors */}
        <div className="col-md-12 mt-4">
          <h6 className="fw-semibold">Theme Colors</h6>
          <div className="d-flex gap-3 mt-2">
            {["bg-primary", "bg-info", "bg-light"].map((color) => (
              <div
                key={color}
                onClick={() => setThemeColor(color)}
                style={{
                  width: "40px",
                  height: "40px",
                  backgroundColor:
                    color === "bg-primary"
                      ? "#043873"
                      : color === "bg-info"
                      ? "#4f9cf9"
                      : "#f3f7ff",
                  border:
                    themeColor === color
                      ? "3px solid black"
                      : "1px solid #ccc",
                  borderRadius: "8px",
                  cursor: "pointer",
                }}
              ></div>
            ))}
          </div>
        </div>

        {/* Layout */}
        <div className="col-md-12 mt-5">
          <h6 className="fw-semibold mb-2">Website Layout</h6>
          <div className="d-flex gap-3 flex-wrap">
            {["classic", "modern", "compact"].map((layout) => (
              <div
                key={layout}
                onClick={() => setSelectedLayout(layout)}
                style={{
                  cursor: "pointer",
                  padding: "10px",
                  border:
                    selectedLayout === layout
                      ? "2px solid #000"
                      : "1px solid #ccc",
                  borderRadius: "8px",
                  textAlign: "center",
                  width: "120px",
                  transition: "border 0.3s ease",
                }}
              >
                <div
                  style={{
                    height: "50px",
                    background: "#eee",
                    marginBottom: "8px",
                    borderRadius: "6px",
                  }}
                ></div>
                <p className="mb-0 text-capitalize">{layout} Layout</p>
              </div>
            ))}
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-4 d-flex gap-3 w-50">
          <button
            className="btn btn-primary"
            onClick={handleSave}
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
          <button className="btn btn-secondary" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default Appearance;
