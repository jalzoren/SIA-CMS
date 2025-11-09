import { useState } from "react";

function Appearance() {
  const [fontFamily, setFontFamily] = useState("Poppins");
  const [fontSize, setFontSize] = useState("Medium");
  const [fontColor, setFontColor] = useState("Header");
  const [previewText, setPreviewText] = useState("");
  const [selectedLayout, setSelectedLayout] = useState("classic");
  const [themeColor, setThemeColor] = useState("bg-primary");

  const handleSave = () => {
    const appearanceSettings = {
      fontFamily,
      fontSize,
      fontColor,
      previewText,
      selectedLayout,
      themeColor,
    };
    console.log("Saved Appearance Settings:", appearanceSettings);
    alert("Changes saved!");
  };

  const handleCancel = () => {
    setFontFamily("Poppins");
    setFontSize("Medium");
    setFontColor("Header");
    setPreviewText("");
    setSelectedLayout("classic");
    setThemeColor("bg-primary");
  };

  return (
       <div className="cms-card">
      <h3 className="cms-section-title">Appearance</h3>
      <div className="row">
        {/* Font Family */}
        <div className="col-md-4">
          <label>Font Family</label>
          <select value={fontFamily} onChange={(e) => setFontFamily(e.target.value)}>
            <option>Poppins</option>
            <option>Roboto</option>
            <option>Inter</option>
          </select>
        </div>

        {/* Font Size */}
        <div className="col-md-4">
          <label>Font Size</label>
          <select value={fontSize} onChange={(e) => setFontSize(e.target.value)}>
            <option>Small</option>
            <option>Medium</option>
            <option>Large</option>
          </select>
        </div>

        {/* Font Color */}
        <div className="col-md-4">
          <label>Font Color</label>
          <select value={fontColor} onChange={(e) => setFontColor(e.target.value)}>
            <option>Header</option>
            <option>Body</option>
          </select>
        </div>

        {/* Preview Text */}
        <div className="col-md-12 mt-3">
          <input
            type="text"
            placeholder="Preview text..."
            value={previewText}
            onChange={(e) => setPreviewText(e.target.value)}
          />
          <p
            className="mt-2"
            style={{
              fontFamily,
              fontSize: fontSize === "Small" ? "14px" : fontSize === "Medium" ? "18px" : "22px",
              color: fontColor === "Header" ? "#000" : "#555",
            }}
          >
            {previewText || "Your preview text will appear here."}
          </p>
        </div>

        {/* Theme Colors */}
        <div className="col-md-12 mt-4">
          <h6>Theme Colors</h6>
          <div className="d-flex gap-3">
            {["bg-primary", "bg-info", "bg-light"].map((color) => (
              <div
                key={color}
                className={`theme-box ${color} ${themeColor === color ? "active" : ""}`}
                onClick={() => setThemeColor(color)}
                style={{
                  width: "40px",
                  height: "40px",
                  cursor: "pointer",
                  border: themeColor === color ? "3px solid black" : "1px solid #ccc",
                }}
              ></div>
            ))}
          </div>
        </div>

        {/* Website Layout */}
        <div className="col-md-12 mt-5">
          <h6>Website Layout</h6>
          <div className="layout-options d-flex gap-3">
            {["classic", "modern", "compact"].map((layout) => (
              <div
                key={layout}
                className={`layout-box ${selectedLayout === layout ? "active" : ""}`}
                onClick={() => setSelectedLayout(layout)}
                style={{
                  cursor: "pointer",
                  padding: "10px",
                  border: selectedLayout === layout ? "2px solid #000" : "1px solid #ccc",
                  borderRadius: "8px",
                  textAlign: "center",
                }}
              >
                <div className={`layout-preview layout-${layout}`} style={{ height: "50px", background: "#eee", marginBottom: "5px" }}></div>
                <p>{layout.charAt(0).toUpperCase() + layout.slice(1)} Layout</p>
              </div>
            ))}
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-4 d-flex gap-3 w-50">
          <button className="btn btn-primary" onClick={handleSave}>
            Save Changes
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
