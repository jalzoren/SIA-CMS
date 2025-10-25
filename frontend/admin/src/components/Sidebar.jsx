import React from "react";
import { NavLink } from "react-router-dom";
import {
  BsSpeedometer2,
  BsMegaphoneFill,
  BsNewspaper,
  BsBriefcaseFill,
  BsHeartFill,
  BsPencilSquare,
  BsPersonBadgeFill,
  BsCameraFill,
  BsHouseDoorFill,
  BsBarChartFill,
  BsEnvelopeFill,
  BsGearFill,
  BsPlusCircleFill,
} from "react-icons/bs";
import "../css/Sidebar.css";

const Sidebar = ({ hidden }) => {
  return (
    <aside id="sidebar" className={hidden ? "hide" : ""}>
      <NavLink to="/" className="brand">
        <BsPlusCircleFill className="icon" />
        {!hidden && <span>hospitaled</span>}
      </NavLink>

      <ul className="side-menu">
        <li>
          <NavLink to="/" end>
            <BsSpeedometer2 className="icon" />
            {!hidden && "Dashboard"}
          </NavLink>
        </li>
        <li>
          <NavLink to="/announcements">
            <BsMegaphoneFill className="icon" />
            {!hidden && "Announcements"}
          </NavLink>
        </li>
        <li>
          <NavLink to="/news">
            <BsNewspaper className="icon" />
            {!hidden && "News"}
          </NavLink>
        </li>
        <li>
          <NavLink to="/events-careers">
            <BsBriefcaseFill className="icon" />
            {!hidden && "Events & Careers"}
          </NavLink>
        </li>
        <li>
          <NavLink to="/health-tips">
            <BsHeartFill className="icon" />
            {!hidden && "Health Tips"}
          </NavLink>
        </li>
        <li>
          <NavLink to="/posts">
            <BsPencilSquare className="icon" />
            {!hidden && "Posts"}
          </NavLink>
        </li>
        <li>
          <NavLink to="/doctors">
            <BsPersonBadgeFill className="icon" />
            {!hidden && "Doctor & Departments"}
          </NavLink>
        </li>
        <li>
          <NavLink to="/media-library">
            <BsCameraFill className="icon" />
            {!hidden && "Media Library"}
          </NavLink>
        </li>
        <li>
          <NavLink to="/about-hospital">
            <BsHouseDoorFill className="icon" />
            {!hidden && "About Hospital"}
          </NavLink>
        </li>
        <li>
          <NavLink to="/analytics-reports">
            <BsBarChartFill className="icon" />
            {!hidden && "Analytics & Reports"}
          </NavLink>
        </li>
        <li>
          <NavLink to="/messaging">
            <BsEnvelopeFill className="icon" />
            {!hidden && "Messaging"}
          </NavLink>
        </li>
        <li>
          <NavLink to="/settings">
            <BsGearFill className="icon" />
            {!hidden && "Settings"}
          </NavLink>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
