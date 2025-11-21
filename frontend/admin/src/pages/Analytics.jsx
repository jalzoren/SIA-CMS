// frontend/src/components/Analytics.jsx
import React, { useEffect, useRef, useState } from "react";
import {
  FaGlobe,
  FaHome,
  FaSmile,
  FaUserMd,
  FaBullhorn,
  FaNewspaper,
  FaHeartbeat,
  FaBriefcase,
  FaInfoCircle,
  FaPhone,
} from "react-icons/fa";
import ApexCharts from "apexcharts";
import "../css/Analytics.css";

/**
 * Advanced Analytics component
 * - Weekly / Monthly toggle
 * - Stats cards with mini-sparklines (generated locally, replace with API data)
 * - Main chart (line/area/bar/pie)
 * - Visit logs with filters & sorting
 *
 * Note: Replace fetch endpoints with your real API endpoints.
 */

const Analytics = () => {
  // Chart & UI states
  const [chartType, setChartType] = useState("line");
  const [period, setPeriod] = useState("weekly"); // 'weekly' | 'monthly'
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  // Sort & filters
  const [sortOrder, setSortOrder] = useState("desc");
  const [selectedPage, setSelectedPage] = useState("all");
  const [dateStart, setDateStart] = useState("");
  const [dateEnd, setDateEnd] = useState("");

  // Analytics main metrics (example placeholders - replace with real API calls)
  const [websiteVisits, setWebsiteVisits] = useState(12456);
  const [homePageClicks, setHomePageClicks] = useState(3420);
  const [servicesPageClicks, setServicesPageClicks] = useState(1850);
  const [doctorsPageClicks, setDoctorsPageClicks] = useState(940);
  const [announcementPageClicks, setAnnouncementPageClicks] = useState(420);
  const [newsPageClicks, setNewsPageClicks] = useState(770);
  const [healthTipsPageClicks, setHealthTipsPageClicks] = useState(301);
  const [careersPageClicks, setCareersPageClicks] = useState(122);
  const [aboutPageClicks, setAboutPageClicks] = useState(98);
  const [contactPageClicks, setContactPageClicks] = useState(210);

  // small dataset to simulate logs - in real app fetch this from API
  const [visitLogs, setVisitLogs] = useState([
    { id: 1, page: "/home", clicks: 15, datetime: "2025-10-31" },
    { id: 2, page: "/services", clicks: 32, datetime: "2025-11-01" },
    { id: 3, page: "/contact", clicks: 9, datetime: "2025-11-02" },
    { id: 4, page: "/doctors", clicks: 54, datetime: "2025-11-03" },
    { id: 5, page: "/news", clicks: 22, datetime: "2025-11-03" },
    { id: 6, page: "/home", clicks: 41, datetime: "2025-11-04" },
    { id: 7, page: "/services", clicks: 12, datetime: "2025-11-05" },
  ]);

  // Stats cards config (icon + label + value)
  const statsCards = [
    { Icon: FaGlobe, count: websiteVisits, label: "Website Visits", link: "https://localhost:5174/" },
    { Icon: FaHome, count: homePageClicks, label: "Home Page Clicks" },
    { Icon: FaSmile, count: servicesPageClicks, label: "Services Page Clicks" },
    { Icon: FaUserMd, count: doctorsPageClicks, label: "Doctors Page Clicks" },
    { Icon: FaBullhorn, count: announcementPageClicks, label: "Announcement Page Clicks" },
    { Icon: FaNewspaper, count: newsPageClicks, label: "Latest News Page Clicks" },
    { Icon: FaHeartbeat, count: healthTipsPageClicks, label: "Health Tips Page Clicks" },
    { Icon: FaBriefcase, count: careersPageClicks, label: "Careers Page Clicks" },
    { Icon: FaInfoCircle, count: aboutPageClicks, label: "About Page Clicks" },
    { Icon: FaPhone, count: contactPageClicks, label: "Contact Page Clicks" },
  ];

  // ======================
  // Fetching (example)
  // ======================
  useEffect(() => {
    // Example pattern: fetch counts from your backend
    // (Uncomment and adapt to use real endpoints)
    /*
    const fetchCounts = async () => {
      try {
        const resV = await fetch('/api/analytics/website-visits');
        const v = await resV.json();
        setWebsiteVisits(v.count || 0);
        // fetch other endpoints similarly...
      } catch (err) {
        console.error('analytics fetch error', err);
      }
    };
    fetchCounts();
    */
  }, []);

  // ======================
  // Prepare chart data based on period
  // ======================
  const getMainChartData = () => {
    if (period === "weekly") {
      return {
        categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        series: [{ name: "Website Visits", data: [420, 520, 480, 610, 720, 690, 830] }],
      };
    } else {
      // monthly (last 12 months sample)
      return {
        categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        series: [{ name: "Website Visits", data: [3200, 4100, 3800, 4400, 5200, 4800, 6100, 7200, 6900, 8300, 7600, 8900] }],
      };
    }
  };

  // ======================
  // Render / Re-render ApexCharts
  // ======================
  useEffect(() => {
    // Destroy previous chart if exists
    if (chartInstanceRef.current) {
      try {
        chartInstanceRef.current.destroy();
      } catch (err) {
        // ignore
      }
      chartInstanceRef.current = null;
    }

    const mainData = getMainChartData();
    const options = {
      chart: {
        type: chartType === "area" ? "area" : chartType,
        height: 420,
        animations: { enabled: true, easing: "easeinout", speed: 500 },
        toolbar: { show: true },
        zoom: { enabled: false },
        foreColor: "#334155", // subtle text color
        background: "transparent",
      },
      series: mainData.series,
      stroke: {
        curve: "smooth",
        width: chartType === "bar" ? 0 : 3,
      },
      fill: {
        opacity: chartType === "area" ? 0.25 : 0.6,
      },
      plotOptions: {
        bar: {
          borderRadius: 6,
        },
      },
      xaxis: {
        categories: mainData.categories,
        title: { text: period === "weekly" ? "Day of week" : "Month" },
        labels: { rotate: -0 },
      },
      markers: { size: 4 },
      tooltip: { theme: "light", x: { show: true } },
      colors: ["#4f9cf9", "#7dd3fc"],
      grid: { borderColor: "#eef2ff", strokeDashArray: 4 },
      responsive: [
        {
          breakpoint: 768,
          options: { chart: { height: 300 }, legend: { position: "bottom" } },
        },
      ],
    };

    // Pie mode: convert to simple pie
    if (chartType === "pie") {
      const pieSeries = mainData.series[0].data.map((d) => Math.max(1, Math.round(d / 10)));
      options.chart.type = "pie";
      options.series = pieSeries;
      options.labels = mainData.categories;
      options.plotOptions = undefined;
      options.stroke = { width: 0 };
      options.fill = { opacity: 1 };
    }

    // Render chart into element
    const el = document.querySelector("#main-analytics-chart");
    chartInstanceRef.current = new ApexCharts(el, options);
    chartInstanceRef.current.render();

    // keep reference for cleanup
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
        chartInstanceRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chartType, period]);

  // ================
  // Mini sparkline generator for cards (tiny charts)
  // ================
  useEffect(() => {
    // destroy existing mini charts
    if (chartRef.current) {
      chartRef.current.forEach((c) => {
        try { c.destroy(); } catch (e) {}
      });
    }
    chartRef.current = [];

    // Create a tiny sparkline for each stat card
    const statCharts = document.querySelectorAll(".stat-sparkline");
    statCharts.forEach((el, idx) => {
      // small generated data - replace with real small series if available
      const data = Array.from({ length: 8 }, () => Math.floor(Math.random() * 100) + 20);
      const opts = {
        chart: { type: "area", sparkline: { enabled: true }, height: 50, width: 120 },
        series: [{ data }],
        stroke: { curve: "smooth", width: 2 },
        fill: { opacity: 0.12 },
        colors: ["#4f9cf9"],
      };
      const mini = new ApexCharts(el, opts);
      mini.render();
      chartRef.current.push(mini);
    });

    return () => {
      if (chartRef.current) {
        chartRef.current.forEach((c) => {
          try { c.destroy(); } catch (e) {}
        });
      }
      chartRef.current = [];
    };
  }, [websiteVisits, homePageClicks, servicesPageClicks]); // rerun when main counts change

  // ======================
  // Filtered & sorted logs
  // ======================
  const filteredLogs = visitLogs
    .filter((log) => (selectedPage === "all" ? true : log.page === selectedPage))
    .filter((log) => {
      if (!dateStart && !dateEnd) return true;
      if (dateStart && !dateEnd) return log.datetime >= dateStart;
      if (!dateStart && dateEnd) return log.datetime <= dateEnd;
      return log.datetime >= dateStart && log.datetime <= dateEnd;
    })
    .sort((a, b) => (sortOrder === "asc" ? a.clicks - b.clicks : b.clicks - a.clicks));

  // ======================
  // Utility helpers
  // ======================
  const prettifyNumber = (n) => {
    if (n >= 1000000) return (n / 1000000).toFixed(1) + "M";
    if (n >= 1000) return (n / 1000).toFixed(1) + "K";
    return n;
  };

  return (
    <div className="dashboard-page">
      <div className="page-header">
        <div>
          <h1 className="title">Analytics & Reports</h1>
          <div className="breadcrumbs">
            <span>Analytics</span>
            <span className="divider">/</span>
            <span>Admin Dashboard</span>
          </div>
        </div>

        <div className="header-actions">
          <div className="period-toggle" role="tablist" aria-label="Select period">
            <button
              className={`period-btn ${period === "weekly" ? "active" : ""}`}
              onClick={() => setPeriod("weekly")}
            >
              Weekly
            </button>
            <button
              className={`period-btn ${period === "monthly" ? "active" : ""}`}
              onClick={() => setPeriod("monthly")}
            >
              Monthly
            </button>
          </div>

          <select
            className="chart-dropdown header-select"
            value={chartType}
            onChange={(e) => setChartType(e.target.value)}
            aria-label="Select chart type"
          >
            <option value="line">Line</option>
            <option value="area">Area</option>
            <option value="bar">Bar</option>
            <option value="pie">Pie</option>
          </select>
        </div>
      </div>

      {/* ======= Stats Cards (with mini sparklines) ======= */}
      <div className="info-data">
        {statsCards.map((card, i) => {
          const Icon = card.Icon;
          return (
            <div className="card stat-card" key={i} aria-label={card.label}>
              <div className="card-top">
                <div className="icon-circle small">
                  <Icon />
                </div>
                <div className="card-val">
                  <h3>{prettifyNumber(card.count)}</h3>
                  <p>{card.label}</p>
                </div>
              </div>

              <div className="sparkline-row">
                <div className="stat-sparkline" />
                {card.link && (
                  <a className="view-link" href={card.link} rel="noopener noreferrer" target="_blank">
                    View
                  </a>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* ======= Main Chart Card ======= */}
      <div className="chart-card">
        <div className="chart-title">
          <div>
            <h3 className="chart-name">Website Visits</h3>
            <p className="chart-sub">Overview for: <strong>{period === "weekly" ? "This Week" : "This Year (Monthly)"}</strong></p>
          </div>

          <div className="chart-controls">
            <div className="chart-stats-inline">
              <div className="mini-stat">
                <span className="mini-value">{prettifyNumber(websiteVisits)}</span>
                <small>visits</small>
              </div>
              <div className="mini-stat">
                <span className="mini-value">{prettifyNumber(homePageClicks)}</span>
                <small>home clicks</small>
              </div>
            </div>
          </div>
        </div>

        <div id="main-analytics-chart" style={{ width: "100%" }} />

        {/* Visit Logs */}
        <div className="visit-logs">
          <h4>Recent Visit Logs</h4>

          <div className="logs-toolbar" role="toolbar" aria-label="Logs tools">
            <select value={selectedPage} onChange={(e) => setSelectedPage(e.target.value)}>
              <option value="all">All Pages</option>
              <option value="/home">Home</option>
              <option value="/services">Services</option>
              <option value="/doctors">Doctors</option>
              <option value="/announcements">Announcements</option>
              <option value="/news">News</option>
              <option value="/health-tips">Health Tips</option>
              <option value="/careers">Careers</option>
              <option value="/about">About</option>
              <option value="/contact">Contact</option>
            </select>

            <input type="date" value={dateStart} onChange={(e) => setDateStart(e.target.value)} aria-label="Start date" />
            <input type="date" value={dateEnd} onChange={(e) => setDateEnd(e.target.value)} aria-label="End date" />

            <div className="toolbar-right">
              <button onClick={() => setSortOrder("desc")} className={sortOrder === "desc" ? "active" : ""}>Sort ↓</button>
              <button onClick={() => setSortOrder("asc")} className={sortOrder === "asc" ? "active" : ""}>Sort ↑</button>
            </div>
          </div>

          <table className="logs-table" aria-live="polite">
            <thead>
              <tr>
                <th>#</th>
                <th>Page Visited</th>
                <th>Clicks</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.length ? (
                filteredLogs.map((log) => (
                  <tr key={log.id}>
                    <td>{log.id}</td>
                    <td>{log.page}</td>
                    <td>{log.clicks}</td>
                    <td>{log.datetime}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" style={{ textAlign: "center", padding: "18px 12px" }}>No logs found for selected filters.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
