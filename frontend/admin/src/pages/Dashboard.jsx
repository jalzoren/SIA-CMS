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

  // Clock
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Main chart
  useEffect(() => {
    const options = {
      chart: { type: "line", height: 420, toolbar: { show: true }, background: "transparent" },
      series: [{ name: "Website Visits", data: [2, 1, 2, 4, 5, 3, 7, 8] }],
      xaxis: { categories: ["1","2","3","4","5","6","7","8"], title: { text: "Date" } },
      yaxis: { title: { text: "Number of Visits" } },
      stroke: { curve: "smooth", width: 3 },
      markers: { size: 4 },
      fill: { type: "gradient", gradient: { opacityFrom: 0.25, opacityTo: 0.05 } },
      colors: ["#4f9cf9"],
      grid: { borderColor: "#eef2ff", strokeDashArray: 4 },
    };

    const chart = new ApexCharts(document.querySelector("#dashboard-chart"), options);
    chart.render();
    return () => chart.destroy();
  }, []);

  // Sparkline mini charts for cards
  useEffect(() => {
    const sparklineElements = document.querySelectorAll(".stat-sparkline");
    sparklineElements.forEach((el) => {
      const data = Array.from({ length: 8 }, () => Math.floor(Math.random() * 100) + 20);
      const mini = new ApexCharts(el, {
        chart: { type: "area", sparkline: { enabled: true }, height: 50, width: 120 },
        series: [{ data }],
        stroke: { curve: "smooth", width: 2 },
        fill: { opacity: 0.12 },
        colors: ["#4f9cf9"],
      });
      mini.render();
    });
  }, []);

  const statsCards = [
    { Icon: FaGlobe, count: 126, label: "Website Visits" },
    { Icon: FaPenFancy, count: 60, label: "Published Content" },
    { Icon: FaFileAlt, count: 60, label: "Drafts Content" },
  ];

  return (
    <div className="dashboard-page">
      {/* Header */}
      <div className="page-header">
        <h1 className="title">Dashboard</h1>
        <div className="breadcrumbs">
          <span>Dashboard</span>
          <span className="divider">/</span>
          <span>Admin Dashboard</span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="info-data">
        {statsCards.map((card, i) => {
          const Icon = card.Icon;
          return (
            <div key={i} className="card stat-card">
              <div className="card-top">
                <div className="icon-circle">
                  <Icon />
                </div>
                <div className="card-val">
                  <h3>{card.count}</h3>
                  <p>{card.label}</p>
                </div>
              </div>
              <div className="sparkline-row">
                <div className="stat-sparkline" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Content */}
      <div className="main-content">
        <div className="chart-card">
          <div className="chart-title">
            <h3 className="chart-name">Website Visits</h3>
            <MdFullscreen className="fullscreen-icon" />
          </div>
          <div id="dashboard-chart" />
        </div>

        {/* Side Panel */}
        <div className="side-panel">
          <div className="calendar-section">
            <div className="calendar-header">
              <h3>{time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })}</h3>
              <p>
                {time.toLocaleDateString(undefined, { weekday: "long", year: "numeric", month: "short", day: "numeric" })}
              </p>
            </div>
            <Calendar onChange={setDate} value={date} />
          </div>

          <div className="hotline-section">
            <h3 className="hotline-title">Emergency Hotlines</h3>
            <table className="hotline-table">
              <thead>
                <tr><th>Hotline</th><th>Numbers</th></tr>
              </thead>
              <tbody>
                <tr><td>Emergency Hotline</td><td>911</td></tr>
                <tr><td>Fire Department</td><td>0000-0000</td></tr>
                <tr><td>Hospital</td><td>0000-0000</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
