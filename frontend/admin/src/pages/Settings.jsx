  import { useState, useEffect } from "react";
  import { FaUpload } from "react-icons/fa";
  import "../css/Settings.css";
  import "bootstrap/dist/css/bootstrap.min.css";
  import Swal from "sweetalert2";
import { FaEye, FaEyeSlash } from "react-icons/fa";


  export default function Settings() {
    const [activeTab, setActiveTab] = useState("general");
    const [selectedLayout, setSelectedLayout] = useState("classic");
    const [userSubTab, setUserSubTab] = useState("users");
const [showPassword, setShowPassword] = useState(false);

    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [users, setUsers] = useState([]);
    const totalUsers = users.length;
    const contentAdmins = users.filter(u => u.role === "content_administrator").length;
    const superAdmins = users.filter(u => u.role === "super_administrator").length;
    const [isEditMode, setIsEditMode] = useState(false);
    const [editingUserId, setEditingUserId] = useState(null);



    const handleCreateUser = async () => {
      if (!fullName || !email || !password || !role) {
        Swal.fire({
          icon: "warning",
          title: "Missing Information",
          text: "Please fill in all fields before submitting.",
        });
        return;
      }
    
      try {
        const response = await fetch("http://localhost:5000/api/users/add", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            full_name: fullName,
            email,
            password,
            role,
          }),
        });
    
        const data = await response.json();
    
        if (response.ok) {
          Swal.fire({
            icon: "success",
            title: "User Added!",
            text: data.message || "The new user has been successfully created.",
            showConfirmButton: false,
            timer: 2000,
          });
    
          // Clear form after success
          clearForm();
          fetchUsers();
        } else {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: data.message || "Failed to add user.",
          });
        }
      } catch (error) {
        console.error("Error:", error);
        Swal.fire({
          icon: "error",
          title: "Connection Error",
          text: "Could not connect to the server. Please make sure the backend is running.",
        });
      }
    };
//jhghfhfhgf

    const handleEditClick = (user) => {
      setFullName(user.full_name);
      setEmail(user.email);
      setPassword(""); // optional: leave empty for security
      setRole(user.role);
      setEditingUserId(user.id);
      setIsEditMode(true);
      setUserSubTab("adduser"); // switch to Add User tab
    };

    const handleUpdateUser = async () => {
      if (!fullName || !email || !role) {
        Swal.fire({
          icon: "warning",
          title: "Missing Information",
          text: "Please fill in all fields before updating.",
        });
        return;
      }
    
      try {
        // Build payload dynamically
        const payload = { full_name: fullName, email, role };
        if (password) payload.password = password; // only include password if not empty
    
        const response = await fetch(`http://localhost:5000/api/users/${editingUserId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
    
        const data = await response.json();
    
        if (response.ok) {
          Swal.fire({
            icon: "success",
            title: "User Updated!",
            text: data.message,
            showConfirmButton: false,
            timer: 2000,
          });
    
          // Update local state
          setUsers(users.map(u =>
            u.id === editingUserId
              ? { ...u, full_name: fullName, email, role }
              : u
          ));
    
          clearForm();
          setIsEditMode(false);
          setPassword(""); // reset password field after update
          setUserSubTab("users"); // optional: go back to users list
        } else {
          Swal.fire({ icon: "error", title: "Error", text: data.message });
        }
      } catch (error) {
        console.error("Error updating user:", error);
        Swal.fire({ icon: "error", title: "Error", text: "Server error" });
      }
    };

    const handleDeleteUser = async (userId) => {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "This action cannot be undone!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!",
      });
    
      if (result.isConfirmed) {
        try {
          const response = await fetch(`http://localhost:5000/api/users/${userId}`, {
            method: "DELETE",
          });
    
          const data = await response.json();
    
          if (response.ok) {
            Swal.fire({
              icon: "success",
              title: "Deleted!",
              text: data.message || "User has been deleted.",
              timer: 2000,
              showConfirmButton: false,
            });
    
            // Update local state
            setUsers(users.filter((user) => user.id !== userId));
          } else {
            Swal.fire({ icon: "error", title: "Error", text: data.message });
          }
        } catch (error) {
          console.error("Error deleting user:", error);
          Swal.fire({ icon: "error", title: "Error", text: "Server error" });
        }
      }
    };
    
    
    
    
    const clearForm = () => {
      setFullName("");
      setEmail("");
      setPassword("");
      setRole("");
    };

    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/users");
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
        Swal.fire({
          icon: "error",
          title: "Connection Error",
          text: "Could not load users. Please make sure the backend is running.",
        });
      }
    };
    
    


    // Scroll to top whenever a main tab changes
    useEffect(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    
      if (activeTab === "user" && userSubTab === "users") {
        fetchUsers();
      }
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
                <h2>{totalUsers}</h2>
                  <p>Users</p>
                </div>
                <div className="summary-card">
                  <h2>{contentAdmins}</h2>
                  <p>Content Administrator</p>
                </div>
                <div className="summary-card">
                  <h2>{superAdmins}</h2>
                  <p>Super Administrator</p>
                </div>
              </div>

              {/* SUB NAVIGATION */}
              <div className="role-subnav">
                <div className="tabs">
                  {["users", "adduser"].map((sub) => (
                    <span
                      key={sub}
                      className={userSubTab === sub ? "active" : ""}
                      onClick={() => setUserSubTab(sub)}
                    >
                      {sub === "users"
                        ? "Users"
                        : "Add New User"}
                    </span>
                  ))}
                </div>

                <div className="filters">
                  <div className="search-bar">
                  <input
                      type="text"
                      placeholder="Search user..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
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
                        {users.length > 0 ? (
                          users
                            .filter((user) => {
                              const query = searchTerm.toLowerCase();
                              return (
                                user.full_name.toLowerCase().includes(query) ||
                                user.email.toLowerCase().includes(query) ||
                                (user.role && user.role.toLowerCase().includes(query))
                              );
                            })
                            .map((user) => (
                              <tr key={user.id}>
                                <td>{user.full_name}</td>
                                <td>{user.email}</td>
                                <td>{user.role}</td>
                                <td>
                                  {user.last_login
                                    ? new Date(user.last_login).toLocaleString("en-US", {
                                        month: "short",
                                        day: "2-digit",
                                        year: "numeric",
                                        hour: "2-digit",
                                        minute: "2-digit",
                                      })
                                    : "Never"}
                                </td>
                                <td>
                                  [<span className="edit" onClick={() => handleEditClick(user)}>Edit</span>] 
                                  [<span className="delete" onClick={() => handleDeleteUser(user.id)} style={{ cursor: "pointer", color: "red" }}>Delete</span>]
                                </td>
                              </tr>
                            ))
                        ) : (
                          <tr>
                            <td colSpan="5" className="text-center">
                              No users found.
                            </td>
                          </tr>
                        )}
                      </tbody>
                  </table>
                </>
              )}

              {/* ADD USER */}
              {userSubTab === "adduser" && (
                <div className="mt-3">
                  <h5>Add New User</h5>
                  <div className="row">
                    <div className="col-md-6">
                      <label>Full name</label>
                      <input type="text" placeholder="Enter Full name" 
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)} />
                    </div>
                    <div className="col-md-6">
                      <label>Email</label>
                      <input type="email" placeholder="Enter email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}  />
                    </div>
                    <div className="col-md-6 mt-3 password-field" style={{ position: "relative" }}>
  <label>Password</label>
  <input
    type={showPassword ? "text" : "password"}
    placeholder="Enter password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
  />
  <button
    type="button"
    className="toggle-password"
    onClick={() => setShowPassword(!showPassword)}
  >
    {showPassword ? <FaEyeSlash /> : <FaEye />}
  </button>
</div>

                  <div className="col-md-6 mt-3">
                    <label>Role</label>
                    <select value={role} onChange={(e) => setRole(e.target.value)}>
                      <option value="">Select Role</option>
                      <option value="content_administrator">Content Administrator</option>
                      <option value="super_administrator">Super Administrator</option>
                      <option value="hr_administrator">HR Administrator</option>
                    </select>
                  </div>
                    <div className="mt-4 d-flex gap-3">
                    <button
                      className="btn btn-primary"
                      onClick={isEditMode ? handleUpdateUser : handleCreateUser}>
                      {isEditMode ? "Update User" : "Create User"}
                    </button>
                    <button
                      className="btn btn-secondary"
                      onClick={clearForm}>
                      Cancel
                    </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

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
