import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import "./App.css";
import Announcement from "./pages/Announcement";

function App() {
  const [sidebarHidden, setSidebarHidden] = useState(false);

  const toggleSidebar = () => setSidebarHidden((prev) => !prev);

  return (
    <Router>
      <div id="app" className={sidebarHidden ? "sidebar-hide" : ""}>
        <Sidebar hidden={sidebarHidden} />
        <section id="content">
          <Navbar onToggleSidebar={toggleSidebar} />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/announcements" element={<Announcement/>} />
              <Route path="/news" element={<h1>News</h1>} />
              <Route path="/events-careers" element={<h1>Events & Careers</h1>} />
              <Route path="/health-tips" element={<h1>Health Tips</h1>} />
              <Route path="/posts" element={<h1>Posts</h1>} />
              <Route path="/doctors" element={<h1>Doctors</h1>} />
              <Route path="/media-library" element={<h1>Media Library</h1>} />
              <Route path="/about-hospital" element={<h1>About Hospital</h1>} />
              <Route path="/analytics-reports" element={<h1>Analytics & Reports</h1>} />
              <Route path="/messaging" element={<h1>Messaging</h1>} />
              <Route path="/settings" element={<h1>Settings</h1>} />
            </Routes>
          </main>
        </section>
      </div>
    </Router>
  );
}

export default App;
