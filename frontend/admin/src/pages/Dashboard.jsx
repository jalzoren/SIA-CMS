import React, { useEffect, useState } from "react";
import "../css/Dashboard.css";
import ApexCharts from "apexcharts";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { FaGlobe, FaPenFancy, FaFileAlt } from "react-icons/fa";

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
        colors: ["#ffffff"],
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
            {
              offset: 0,
              color: "#4f9cf9",
              opacity: 0.5,
            },
            {
              offset: 100,
              color: "#043873",
              opacity: 0.1,
            },
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

      {/* TOP CARDS */}
      <div className="info-data">
        <a
          href="https://yourwebsite.com"
          target="_blank"
          rel="noopener noreferrer"
          className="card link-card"
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
        {/* LEFT SIDE (Chart) */}
        <div className="chart-card">
          <div className="head">
            <h3>Website Visits</h3>
            <i className="bx bx-fullscreen icon"></i>
          </div>
          <div id="chart"></div>
        </div>

        {/* RIGHT SIDE (Calendar + Hotline) */}
        <div className="side-panel">
          <div className="calendar-section">
            <div className="calendar-header">
              <h3>{time.toLocaleTimeString()}</h3>
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
