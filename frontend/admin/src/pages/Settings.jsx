import { useState, useEffect } from "react";
import GeneralSettings from "../components/settings/General";
import AppearanceSettings from "../components/settings/Appearance";
import ContentSettings from "../components/settings/Content";
import UserSettings from "../components/settings/User";
import SystemSettings from "../components/settings/System";

import "../css/Settings.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Settings() {
  const [activeTab, setActiveTab] = useState("general");

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
      <div className="cms-tab-content mt-4">
        {activeTab === "general" && <GeneralSettings />}
        {activeTab === "appearance" && <AppearanceSettings />}
        {/* */}
        {activeTab === "content" && <ContentSettings />}
        {activeTab === "user" && <UserSettings />}
        {activeTab === "system" && <SystemSettings />}
      </div>
    </div>
  );
}
