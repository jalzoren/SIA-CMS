import React, { useState } from "react";
import Swal from "sweetalert2";
import { Outlet } from "react-router-dom";
import { FaBars, FaUserCircle } from "react-icons/fa"; // ✅ React Icons instead of Boxicons
import Sidebar from "../components/Sidebar";
import "../css/Global.css";
import "../css/DashboardLayout.css";

export default function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure you want to log out?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, log out",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("token");
        Swal.fire("Logged Out!", "You have been logged out.", "success").then(
          () => {
            window.location.href = "/login";
          }
        );
      }
    });
  };

  return (
    <div
      className={`dashboard-layout ${
        isSidebarOpen ? "sidebar-open" : "sidebar-closed"
      }`}
    >
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} />

      {/* Main content */}
      <section id="content">
        {/* ===== Navbar ===== */}
        <nav className="navbar">
          <div className="navbar-left">
            <FaBars
              className="toggle-sidebar"
              onClick={() => setIsSidebarOpen((prev) => !prev)}
            />
            <h1 className="title-name">Welcome, Admin!</h1>
          </div>

          <div className="navbar-right" onClick={handleLogout}>
            <FaUserCircle className="profile-icon" />
          </div>
        </nav>

        {/* ===== Page Content ===== */}
        <main>
          <Outlet />
        </main>
      </section>
    </div>
  );
}
