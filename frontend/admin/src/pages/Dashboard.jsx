import React, { useEffect, useState } from "react";
import "../css/Dashboard.css";
import ApexCharts from "apexcharts";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { FaGlobe, FaPenFancy, FaFileAlt } from "react-icons/fa";
import { MdFullscreen } from "react-icons/md";

export default function Dashboard() {
  const [time, setTime] = useState(new Date());
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const options = {
      chart: {
        type: "line",
        height: 300,
        toolbar: { show: false },
        background: "transparent",
      },
      series: [
        {
          name: "Website Visits",
          data: [2, 1, 2, 4, 5, 3, 7, 8],
        },
      ],
      xaxis: {
        categories: ["1", "2", "3", "4", "5", "6", "7", "8"],
        title: { text: "Date" },
        labels: { style: { colors: "#333", fontSize: "12px" } },
      },
      yaxis: {
        title: { text: "Number of Visits" },
        labels: { style: { colors: "#333", fontSize: "12px" } },
      },
      stroke: {
        curve: "smooth",
        width: 3,
        colors: ["#043873"],
      },
      markers: {
        size: 5,
        colors: ["#000000ff"],
        strokeColors: "#4f9cf9",
        strokeWidth: 2,
      },
      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.3,
          opacityTo: 0.05,
          stops: [0, 90, 100],
          colorStops: [
            { offset: 0, color: "#4f9cf9", opacity: 0.5 },
            { offset: 100, color: "#043873", opacity: 0.1 },
          ],
        },
      },
      grid: {
        borderColor: "rgba(0, 0, 0, 0.1)",
        strokeDashArray: 4,
      },
      colors: ["#4f9cf9"],
    };

    const chart = new ApexCharts(document.querySelector("#chart"), options);
    chart.render();
    return () => chart.destroy();
  }, []);

  return (
    <div className="dashboard-page">
      <h2 className="title">Dashboard</h2>
      <ul className="breadcrumbs">
        <li>Dashboard</li>
        <li className="divider">/</li>
        <li>Admin Dashboard</li>
      </ul>

      {/* TOP CARDS - Using flex + same structure */}
      <div className="info-data">
        <a
          href="https://yourwebsite.com"
          target="_blank"
          rel="noopener noreferrer"
          className="card"
        >
          <div className="icon-circle">
            <FaGlobe />
          </div>
          <div>
            <h2>126</h2>
            <p>Website Visits</p>
          </div>
        </a>

        <div className="card">
          <div className="icon-circle">
            <FaPenFancy />
          </div>
          <div>
            <h2>60</h2>
            <p>Published Content</p>
          </div>
        </div>

        <div className="card">
          <div className="icon-circle">
            <FaFileAlt />
          </div>
          <div>
            <h2>60</h2>
            <p>Drafts Content</p>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT GRID */}
      <div className="main-content">
        {/* CHART + VISIT LOGS */}
        <div className="chart-card">
          <div className="chart-title">
            <h3 className="chart-name">Website Visits</h3>
            <MdFullscreen className="fullscreen-icon" />
          </div>

          <div id="chart"></div>

          <div className="visit-logs">
            <h4>Recent Visit Logs</h4>
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Visitor IP</th>
                  <th>Page Visited</th>
                  <th>Device</th>
                  <th>Date & Time</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>192.168.0.15</td>
                  <td>/home</td>
                  <td>Desktop</td>
                  <td>2025-10-31 13:22</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>192.168.0.32</td>
                  <td>/services</td>
                  <td>Mobile</td>
                  <td>2025-10-31 13:25</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>192.168.0.44</td>
                  <td>/contact</td>
                  <td>Tablet</td>
                  <td>2025-10-31 13:28</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* SIDE PANEL */}
        <div className="side-panel">
          <div className="calendar-section">
            <div className="calendar-header">
              <h3>
                {time.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                })}
              </h3>
              <p>
                {time.toLocaleDateString(undefined, {
                  weekday: "long",
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </p>
            </div>
            <Calendar onChange={setDate} value={date} />
          </div>

          <div className="hotline-section">
            <h3 className="hotline-title">Emergency Hotlines</h3>
            <table className="hotline-table">
              <thead>
                <tr>
                  <th>Hotline</th>
                  <th>Numbers</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Emergency Hotline</td>
                  <td>911</td>
                </tr>
                <tr>
                  <td>Fire Department</td>
                  <td>0000-0000</td>
                </tr>
                <tr>
                  <td>Hospital</td>
                  <td>0000-0000</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
