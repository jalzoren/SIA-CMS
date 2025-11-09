import React from "react";

export default function System() {
  const handleBackup = () => {
    alert("Backup created successfully!");
    // You can integrate backend API call here
  };

  const handleRestore = () => {
    alert("Restore process initiated!");
    // Implement file upload logic here
  };

  const handleOptimizeDB = () => {
    alert("Database optimized successfully!");
  };

  const handleClearCache = () => {
    alert("Cache cleared successfully!");
  };

  const handleRepairTables = () => {
    alert("Database tables repaired successfully!");
  };

  const handleExport = () => {
    alert("Content exported successfully!");
  };

  const handleImport = () => {
    alert("Content imported successfully!");
  };

  return (
    <div className="cms-card cms-system-card">
      <h3 className="cms-section-title">System Settings</h3>

      {/* Backup Section */}
      <div className="system-section">
        <div className="system-block d-flex justify-content-between align-items-center mb-4">
          <h6 className="mb-0">Back Up</h6>
          <button className="btn btn-primary" onClick={handleBackup}>
            Create Backup Now
          </button>
        </div>

        {/* Restore Section */}
        <div className="system-block mb-4">
          <h6>Restore</h6>
          <div
            className="restore-box border border-dashed p-4 text-center"
            onClick={handleRestore}
          >
            <p>Click to upload backup file (.zip or .sql files)</p>
          </div>
        </div>

        {/* Database Maintenance */}
        <div className="system-block mb-4">
          <h6>Database Maintenance</h6>
          <div className="row text-center mb-3">
            <div className="col-md-3 stat-box">
              <p><b>Total Size</b></p><p>2.4 GB</p>
            </div>
            <div className="col-md-3 stat-box">
              <p><b>Total Records</b></p><p>45,234</p>
            </div>
            <div className="col-md-3 stat-box">
              <p><b>Last Optimization</b></p><p>3 days ago</p>
            </div>
            <div className="col-md-3 stat-box">
              <p><b>Cache Size</b></p><p>200 MB</p>
            </div>
          </div>
          <div className="d-flex gap-3 justify-content-center flex-wrap">
            <button className="btn btn-primary" onClick={handleOptimizeDB}>Optimize Database</button>
            <button className="btn btn-secondary" onClick={handleClearCache}>Clear Cache</button>
            <button className="btn btn-warning" onClick={handleRepairTables}>Repair Tables</button>
          </div>
        </div>

        {/* Export & Import */}
        <div className="row mt-5">
          <div className="col-md-6">
            <h6>Export Content</h6>
            <select className="w-100 mb-2">
              <option>Select Format</option>
              <option>PDF</option>
              <option>CSV</option>
              <option>JSON</option>
            </select>
            <button className="btn btn-primary w-100" onClick={handleExport}>Export Content</button>
          </div>

          <div className="col-md-6">
            <h6>Import Content</h6>
            <select className="w-100 mb-2">
              <option>Select Destination</option>
              <option>Blog</option>
              <option>Services</option>
            </select>
            <div
              className="restore-box border border-dashed text-center p-4 mb-2"
              onClick={handleImport}
            >
              <p>Click to upload files (.PDF, .DOCX, .ZIP)</p>
            </div>
            <button className="btn btn-success w-100" onClick={handleImport}>Import Content</button>
          </div>
        </div>
      </div>
    </div>
  );
}
