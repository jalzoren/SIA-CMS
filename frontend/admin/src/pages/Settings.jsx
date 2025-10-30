import { useState, useEffect } from "react";
import { FaUpload } from "react-icons/fa";
import "../css/Settings.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Settings() {
  const [activeTab, setActiveTab] = useState("general");
  const [selectedLayout, setSelectedLayout] = useState("classic");
  const [userSubTab, setUserSubTab] = useState("users");

  // Scroll to top whenever a main tab changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeTab, userSubTab]);

  return (
    <div className="cms-settings-page">
      {/* PAGE HEADER */}
      <h2 className="title">Settings</h2>
      <ul className="breadcrumbs">
        <li>Settings</li>
        <li className="divider">/</li>
        <li>Admin Dashboard</li>
      </ul>

      {/* TAB NAVIGATION */}
      <div className="cms-tabs">
        {["general", "appearance", "content", "user", "system"].map((tab) => (
          <span
            key={tab}
            className={`cms-tab-item ${activeTab === tab ? "active" : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab === "general"
              ? "General Settings"
              : tab === "appearance"
              ? "Appearance"
              : tab === "content"
              ? "Content"
              : tab === "user"
              ? "User Role Management"
              : "System Settings"}
          </span>
        ))}
      </div>

      {/* TAB CONTENT */}
      <div className="cms-tab-content">
        {/* === GENERAL SETTINGS === */}
        {activeTab === "general" && (
          <div className="cms-card">
            <h3 className="cms-section-title">General Settings</h3>
            <div className="row">
              <div className="col-md-6">
                <label>Site Name / Title</label>
                <input type="text" placeholder="Enter site title" />
              </div>
              <div className="col-md-6">
                <label>Tagline / Description</label>
                <input type="text" placeholder="Enter tagline" />
              </div>

              <div className="col-md-6 mt-3">
                <label>Favicon Upload</label>
                <div className="upload-btn">
                  <button className="btn btn-primary">
                    <FaUpload /> Upload
                  </button>
                  <small>Upload favicon (16×16 or 32×32)</small>
                </div>
              </div>

              <div className="col-md-6 mt-3">
                <label>Logo Upload</label>
                <div className="upload-btn">
                  <button className="btn btn-primary">
                    <FaUpload /> Upload
                  </button>
                  <small>Upload your site logo (PNG, JPG)</small>
                </div>
              </div>

              <div className="col-md-6 mt-3">
                <label>Default Language</label>
                <select>
                  <option>Select language</option>
                  <option>English</option>
                  <option>Spanish</option>
                  <option>Filipino</option>
                </select>
              </div>

              <div className="col-md-6 mt-3">
                <label>Timezone / Date Format</label>
                <select>
                  <option>Select a Timezone</option>
                  <option>GMT</option>
                  <option>PST</option>
                  <option>EST</option>
                </select>
                <div className="mt-2 d-flex gap-3">
                  <label>
                    <input type="radio" name="dateformat" /> MM/DD/YYYY
                  </label>
                  <label>
                    <input type="radio" name="dateformat" /> DD/MM/YYYY
                  </label>
                </div>
              </div>

              <div className="col-md-12 mt-3">
                <label>Contact Email / Info</label>
                <input type="email" placeholder="e.g. admin@example.com" />
              </div>

              <div className="mt-4 d-flex gap-3 w-50">
                <button className="btn btn-primary w-5">Save Changes</button>
                <button className="btn btn-secondary w-5">Cancel</button>
              </div>
            </div>
          </div>
        )}

        {/* === APPEARANCE === */}
        {activeTab === "appearance" && (
          <div className="cms-card">
            <h3 className="cms-section-title">Appearance</h3>
            <div className="row">
              <div className="col-md-4">
                <label>Font Family</label>
                <select>
                  <option>Poppins</option>
                  <option>Roboto</option>
                  <option>Inter</option>
                </select>
              </div>

              <div className="col-md-4">
                <label>Font Size</label>
                <select>
                  <option>Small</option>
                  <option>Medium</option>
                  <option>Large</option>
                </select>
              </div>

              <div className="col-md-4">
                <label>Font Color</label>
                <select>
                  <option>Header</option>
                  <option>Body</option>
                </select>
              </div>

              <div className="col-md-12 mt-3">
                <input type="text" placeholder="Preview text..." />
              </div>

              <div className="col-md-12 mt-4">
                <h6>Theme Colors</h6>
                <div className="d-flex gap-3">
                  <div className="theme-box bg-primary"></div>
                  <div className="theme-box bg-info"></div>
                  <div className="theme-box bg-light border"></div>
                </div>
              </div>

              <div className="col-md-12 mt-5">
                <h6>Website Layout</h6>
                <div className="layout-options">
                  {["classic", "modern", "compact"].map((layout) => (
                    <div
                      key={layout}
                      className={`layout-box ${
                        selectedLayout === layout ? "active" : ""
                      }`}
                      onClick={() => setSelectedLayout(layout)}
                    >
                      <div className={`layout-preview layout-${layout}`}></div>
                      <p>
                        {layout.charAt(0).toUpperCase() + layout.slice(1)} Layout
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 d-flex gap-3 w-50">
                <button className="btn btn-primary w-5">Save Changes</button>
                <button className="btn btn-secondary w-5">Cancel</button>
              </div>
            </div>
          </div>
        )}

        {/* === CONTENT SETTINGS === */}
        {activeTab === "content" && (
          <div className="cms-card">
            <h3 className="cms-section-title">Content Settings</h3>
            <div className="row">
              <div className="col-md-4">
                <label>Default Post Layout</label>
                <select>
                  <option>List</option>
                  <option>Grid</option>
                </select>
              </div>

              <div className="col-md-4">
                <label>Number of Posts per Page</label>
                <input type="number" placeholder="e.g. 10" />
              </div>

              <div className="col-md-4">
                <label>Show / Hide Author Name</label>
                <div className="d-flex gap-3">
                  <label>
                    <input type="radio" name="author" /> Show
                  </label>
                  <label>
                    <input type="radio" name="author" /> Hide
                  </label>
                </div>
              </div>

              <div className="col-md-4 mt-3">
                <label>Show / Hide Date</label>
                <div className="d-flex gap-3">
                  <label>
                    <input type="radio" name="date" /> Show
                  </label>
                  <label>
                    <input type="radio" name="date" /> Hide
                  </label>
                </div>
              </div>

              <div className="col-md-4 mt-3">
                <label>Enable Comments</label>
                <div className="d-flex gap-3">
                  <label>
                    <input type="radio" name="comments" /> Yes
                  </label>
                  <label>
                    <input type="radio" name="comments" /> No
                  </label>
                </div>
              </div>

              <div className="mt-4 d-flex gap-3">
                <button className="btn btn-primary">Save Changes</button>
                <button className="btn btn-secondary">Cancel</button>
              </div>
            </div>
          </div>
        )}

        {/* === USER ROLE MANAGEMENT === */}
        {activeTab === "user" && (
          <div className="cms-card cms-userrole-card">
            <h3 className="cms-section-title">User Role Management</h3>

            <div className="role-summary">
              <div className="summary-card">
                <h2>10</h2>
                <p>Users</p>
              </div>
              <div className="summary-card">
                <h2>9</h2>
                <p>Content Administrator</p>
              </div>
              <div className="summary-card">
                <h2>1</h2>
                <p>Super Administrator</p>
              </div>
            </div>

            {/* SUB NAVIGATION */}
            <div className="role-subnav">
              <div className="tabs">
                {["users", "permissions", "adduser"].map((sub) => (
                  <span
                    key={sub}
                    className={userSubTab === sub ? "active" : ""}
                    onClick={() => setUserSubTab(sub)}
                  >
                    {sub === "users"
                      ? "Users"
                      : sub === "permissions"
                      ? "Role Permissions"
                      : "Add New User"}
                  </span>
                ))}
              </div>

              <div className="filters">
                <select>
                  <option>Role</option>
                  <option>Administrator</option>
                  <option>Editor</option>
                </select>
                <div className="search-bar">
                  <input type="text" placeholder="Search" />
                  <button>🔍</button>
                </div>
              </div>
            </div>

            {/* USERS TABLE */}
            {userSubTab === "users" && (
              <>
                <h6 className="cms-table-title">User Accounts</h6>
                <table className="cms-table">
                  <thead>
                    <tr>
                      <th>Username</th>
                      <th>Email</th>
                      <th>Role</th>
                      <th>Last Login</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>admin1</td>
                      <td>admin1@example.com</td>
                      <td>Super Administrator</td>
                      <td>Oct 18, 2025 - 04:32 PM</td>
                      <td>
                        [<span className="edit">Edit</span>] [
                        <span className="delete">Delete</span>]
                      </td>
                    </tr>
                    <tr>
                      <td>content_user</td>
                      <td>content@example.com</td>
                      <td>Content Administrator</td>
                      <td>Oct 17, 2025 - 03:15 PM</td>
                      <td>
                        [<span className="edit">Edit</span>] [
                        <span className="delete">Delete</span>]
                      </td>
                    </tr>
                  </tbody>
                </table>
              </>
            )}

            {/* PERMISSIONS */}
            {userSubTab === "permissions" && (
              <div className="mt-3">
                <h5>Role Permissions Management</h5>
                <p>Manage which roles can access different parts of the system.</p>
              </div>
            )}

            {/* ADD USER */}
            {userSubTab === "adduser" && (
              <div className="mt-3">
                <h5>Add New User</h5>
                <div className="row">
                  <div className="col-md-6">
                    <label>Username</label>
                    <input type="text" placeholder="Enter username" />
                  </div>
                  <div className="col-md-6">
                    <label>Email</label>
                    <input type="email" placeholder="Enter email" />
                  </div>
                  <div className="col-md-6 mt-3">
                    <label>Password</label>
                    <input type="password" placeholder="Enter password" />
                  </div>
                  <div className="col-md-6 mt-3">
                    <label>Role</label>
                    <select>
                      <option>Administrator</option>
                      <option>Editor</option>
                      <option>Viewer</option>
                    </select>
                  </div>
                  <div className="mt-4 d-flex gap-3">
                    <button className="btn btn-primary">Create User</button>
                    <button className="btn btn-secondary">Cancel</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* === SYSTEM SETTINGS === */}
        {activeTab === "system" && (
          <div className="cms-card cms-system-card">
            <h3 className="cms-section-title">System Settings</h3>

            <div className="system-section">
              <div className="system-block d-flex justify-content-between align-items-center mb-4">
                <h6 className="mb-0">Back Up</h6>
                <button className="btn btn-primary">Create Backup Now</button>
              </div>

              <div className="system-block">
                <h6>Restore</h6>
                <div className="restore-box border border-dashed p-4 text-center">
                  <p>Click to upload backup file (.zip or .sql files)</p>
                </div>
              </div>

              <div className="system-block">
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
                  <button className="btn btn-primary">Optimize Database</button>
                  <button className="btn btn-secondary">Clear Cache</button>
                  <button className="btn btn-warning">Repair Tables</button>
                </div>
              </div>

              <div className="row mt-5">
                <div className="col-md-6">
                  <h6>Export Content</h6>
                  <select className="w-100 mb-2">
                    <option>Select Format</option>
                    <option>PDF</option>
                    <option>CSV</option>
                    <option>JSON</option>
                  </select>
                  <button className="btn btn-primary w-100">Export Content</button>
                </div>

                <div className="col-md-6">
                  <h6>Import Content</h6>
                  <select className="w-100 mb-2">
                    <option>Select Destination</option>
                    <option>Blog</option>
                    <option>Services</option>
                  </select>
                  <div className="restore-box border border-dashed text-center p-4 mb-2">
                    <p>Click to upload files (.PDF, .DOCX, .ZIP)</p>
                  </div>
                  <button className="btn btn-success w-100">Import Content</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
