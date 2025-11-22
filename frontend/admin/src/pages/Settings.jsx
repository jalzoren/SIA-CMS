// frontend/admin/src/pages/Settings.jsx
import { useState } from "react";
import AppearanceSettings from "../components/settings/Appearance";
import UserSettings from "../components/settings/User";

import "../css/Settings.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Settings() {
  const [activeTab, setActiveTab] = useState("appearance");

  const tabs = [
    { id: "appearance", label: "Appearance" },
    { id: "user", label: "User Role Management" }
  ];

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
        {tabs.map((tab) => (
          <span
            key={tab.id}
            className={`cms-tab-item ${activeTab === tab.id ? "active" : ""}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </span>
        ))}
      </div>

      {/* TAB CONTENT */}
      <div className="cms-tab-content mt-4">
        {activeTab === "appearance" && <AppearanceSettings />}
        {activeTab === "user" && <UserSettings />}
      </div>
    </div>
  );
}
