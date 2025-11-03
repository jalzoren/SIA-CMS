import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaTachometerAlt,
  FaFolderOpen,
  FaBullhorn,
  FaNewspaper,
  FaBriefcase,
  FaHeart,
  FaEdit,
  FaUserMd,
  FaCamera,
  FaBuilding,
  FaChartBar,
  FaEnvelope,
  FaCog,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import { FaShieldHeart } from "react-icons/fa6";
import "../components/components-css/Sidebar.css";
import "boxicons/css/boxicons.min.css";

const Sidebar = ({ isOpen }) => {
  const location = useLocation();
  const [openDropdown, setOpenDropdown] = useState(null);

  const menuItems = [
    { icon: <FaTachometerAlt />, label: "Dashboard", path: "/dashboard" },
    {
      label: "Content Creation",
      icon: <FaFolderOpen />,
      isDropdown: true,
      children: [
        { icon: <FaBullhorn />, label: "Announcements", path: "/announcements" },
        { icon: <FaNewspaper />, label: "News", path: "/news" },
        { icon: <FaBriefcase />, label: "Events & Careers", path: "/events" },
        { icon: <FaHeart />, label: "Health Tips", path: "/health" },
        { icon: <FaEdit />, label: "Posts Log", path: "/posts" },
      ],
    },
    { icon: <FaUserMd />, label: "Doctors", path: "/doctors" },
    { icon: <FaCamera />, label: "Media Library", path: "/media" },
    { icon: <FaBuilding />, label: "About Hospital", path: "/hospital" },
    { icon: <FaChartBar />, label: "Analytics", path: "/analytics" },
    { icon: <FaEnvelope />, label: "Messaging", path: "/messaging" },
    { icon: <FaCog />, label: "Settings", path: "/settings" },
  ];

  // Automatically open dropdown if current path matches a child
  useEffect(() => {
    const activeDropdown = menuItems.find(
      (item) =>
        item.isDropdown &&
        item.children.some((child) => location.pathname === child.path)
    );
    setOpenDropdown(activeDropdown ? activeDropdown.label : null);
  }, [location.pathname]);

  const toggleDropdown = (label) => {
    setOpenDropdown((prev) => (prev === label ? null : label));
  };

  return (
    <aside id="sidebar" className={isOpen ? "" : "collapsed"}>
      {/* Brand */}
      <div className="brand">
<i className="bx bx-plus-medical icon"></i>        {isOpen && <span>hospitaled</span>}
      </div>

      {/* Headings */}
      {isOpen && (
        <div className="sidebar-heading">
          <p className="cms">CMS Controls</p>
          <p className="admin">Admin Functions</p>
        </div>
      )}

      {/* Menu */}
      <ul className="side-menu">
        {menuItems.map((item) => {
          if (item.isDropdown) {
            const isOpenDropdown = openDropdown === item.label;
            const isChildActive = item.children.some(
              (child) => location.pathname === child.path
            );

            return (
              <li
                key={item.label}
                className={`dropdown ${isOpenDropdown ? "open" : ""} ${
                  isChildActive ? "active-parent" : ""
                }`}
              >
                <button
                  type="button"
                  className={`dropdown-toggle ${
                    isChildActive ? "active" : ""
                  }`}
                  onClick={() => toggleDropdown(item.label)}
                >
                  <span className="icon">{item.icon}</span>
                  {isOpen && <span className="label">{item.label}</span>}
                  {isOpen && (
                    <span className="arrow">
                      {isOpenDropdown ? <FaChevronUp /> : <FaChevronDown />}
                    </span>
                  )}
                </button>

                <ul
                  className={`side-dropdown ${
                    isOpenDropdown && isOpen ? "show" : ""
                  }`}
                >
                  {item.children.map((sub) => (
                    <li key={sub.path}>
                      <Link
                        to={sub.path}
                        className={
                          location.pathname === sub.path ? "active" : ""
                        }
                      >
                        <span className="icon">{sub.icon}</span>
                        <span className="label">{sub.label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            );
          }

          return (
            <li key={item.path}>
              <Link
                to={item.path}
                className={location.pathname === item.path ? "active" : ""}
              >
                <span className="icon">{item.icon}</span>
                {isOpen && <span className="label">{item.label}</span>}
              </Link>
            </li>
          );
        })}
      </ul>
    </aside>
  );
};

export default Sidebar;
