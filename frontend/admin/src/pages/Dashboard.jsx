import React, { useEffect, useState } from "react";
import "../css/Dashboard.css";
import ApexCharts from "apexcharts";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { FaGlobe, FaPenFancy, FaFileAlt } from "react-icons/fa";
import { MdFullscreen } from "react-icons/md";

const generateColors = (num) => {
  const colors = [];
  for (let i = 0; i < num; i++) {
    const hue = Math.floor((360 / num) * i);
    colors.push(`hsl(${hue}, 70%, 50%)`);
  }
  return colors;
};

export default function Dashboard() {
  const [time, setTime] = useState(new Date());
  const [date, setDate] = useState(new Date());

  const [chartCategories, setChartCategories] = useState([]);
  const [chartSeries, setChartSeries] = useState([]);
  const [chartColors, setChartColors] = useState([]);
  const [totalVisits, setTotalVisits] = useState(0);
  const [homeVisits, setHomeVisits] = useState(0); // NEW: for Home page

  const [publishedCount, setPublishedCount] = useState(0);
  const [draftCount, setDraftCount] = useState(0);

  
  useEffect(() => {
    fetch("http://localhost:5000/api/posts") // your posts route
      .then(res => res.json())
      .then(data => {
        // Count published and draft
        const published = data.filter(post => post.status === "published").length;
        const draft = data.filter(post => post.status === "draft").length;

        setPublishedCount(published);
        setDraftCount(draft);
      })
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const normalizeDate = (d) => d.split("T")[0];

    fetch("http://localhost:5000/api/track")
      .then(res => res.json())
      .then(data => {
        const pages = [...new Set(data.map(d => d.page_name))];
        const dates = [...new Set(data.map(d => normalizeDate(d.view_date)))].sort(
          (a, b) => new Date(a) - new Date(b)
        );

        const series = pages.map(page => ({
          name: page,
          data: dates.map(date => {
            const record = data.find(
              d => d.page_name === page && normalizeDate(d.view_date) === date
            );
            return record ? record.visit_count : 0;
          }),
        }));

        setChartCategories(dates);
        setChartSeries(series);
        setChartColors(generateColors(pages.length));

        const total = data.reduce((sum, item) => sum + item.visit_count, 0);
        setTotalVisits(total);

        // Calculate Home page visits
        const homeTotal = data
        .filter(item => item.page_name === "/")
        .reduce((sum, item) => sum + Number(item.visit_count), 0);
        setHomeVisits(homeTotal);
      })
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    if (chartSeries.length === 0) return;

    const options = {
      chart: { type: "line", height: 600, toolbar: { show: true }, background: "transparent" },
      series: chartSeries,
      xaxis: { categories: chartCategories, title: { text: "Date" } },
      yaxis: { title: { text: "Number of Visits" } },
      stroke: { curve: "smooth", width: 3 },
      markers: { size: 5 },
      grid: { borderColor: "rgba(0,0,0,0.1)", strokeDashArray: 4 },
      colors: chartColors,
      legend: { show: false },
    };

    const chart = new ApexCharts(document.querySelector("#dashboard-chart"), options);
    chart.render();
    return () => chart.destroy();
  }, [chartSeries, chartCategories, chartColors]);

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
        {/* Home Visits */}
        <div className="card">
          <div className="icon-circle"><FaGlobe /></div>
          <div>
            <h2>{homeVisits}</h2>
            <p>Website Visits (Home)</p>
          </div>
        </div>

        {/* Published Content */}
        <div className="card">
          <div className="icon-circle"><FaPenFancy /></div>
          <div>
            <h2>{publishedCount}</h2>
            <p>Published Content</p>
          </div>
        </div>

        {/* Draft Content */}
        <div className="card">
          <div className="icon-circle"><FaFileAlt /></div>
          <div>
            <h2>{draftCount}</h2>
            <p>Draft Content</p>
          </div>
        </div>
      </div>



      {/* MAIN CONTENT */}
      <div className="main-content">
        <div className="chart-card">
          <div className="chart-title">
            <h3 className="chart-name">Website Visits</h3>
            <MdFullscreen className="fullscreen-icon" />
          </div>
          <div id="dashboard-chart"></div>
        </div>

        <div className="side-panel">
          <div className="calendar-section">
            <div className="calendar-header">
              <h3>{time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })}</h3>
              <p>{time.toLocaleDateString(undefined, { weekday: "long", year: "numeric", month: "short", day: "numeric" })}</p>
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
