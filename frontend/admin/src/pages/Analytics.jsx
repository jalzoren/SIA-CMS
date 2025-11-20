import React, { useEffect, useState } from 'react';
import { FaGlobe, FaHome, FaSmile, FaUserMd, FaBullhorn, FaNewspaper, FaHeartbeat, FaBriefcase, FaInfoCircle, FaPhone } from 'react-icons/fa';
import { MdFullscreen } from 'react-icons/md';
import ApexCharts from 'apexcharts';
import '../css/Analytics.css';


const Analytics = () => {
  const [websiteVisits, setWebsiteVisits] = useState(0);
  const [homePageClicks, setHomePageClicks] = useState(0);
  const [servicesPageClicks, setServicesPageClicks] = useState(0);
  const [doctorsPageClicks, setDoctorsPageClicks] = useState(0);
  const [announcementPageClicks, setAnnouncementPageClicks] = useState(0);
  const [newsPageClicks, setNewsPageClicks] = useState(0);
  const [healthTipsPageClicks, setHealthTipsPageClicks] = useState(0);
  const [careersPageClicks, setCareersPageClicks] = useState(0);
  const [aboutPageClicks, setAboutPageClicks] = useState(0);
  const [contactPageClicks, setContactPageClicks] = useState(0);

  // Fetch website visits count
  useEffect(() => {
    const fetchWebsiteVisits = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/analytics/website-visits');
        const data = await response.json();
        setWebsiteVisits(data.count || 0);
      } catch (error) {
        console.error('Error fetching website visits:', error);
      }
    };

    fetchWebsiteVisits();
  }, []);

  // Fetch page clicks for all pages
  useEffect(() => {
    const fetchPageClicks = async () => {
      try {
        const pages = [
          { path: 'home', setter: setHomePageClicks },
          { path: 'services', setter: setServicesPageClicks },
          { path: 'doctors', setter: setDoctorsPageClicks },
          { path: 'announcements', setter: setAnnouncementPageClicks },
          { path: 'news', setter: setNewsPageClicks },
          { path: 'health-tips', setter: setHealthTipsPageClicks },
          { path: 'careers', setter: setCareersPageClicks },
          { path: 'about', setter: setAboutPageClicks },
          { path: 'contact', setter: setContactPageClicks },
        ];

        for (const page of pages) {
          const response = await fetch(`http://localhost:5000/api/analytics/page-clicks/${page.path}`);
          const data = await response.json();
          page.setter(data.count || 0);
        }
      } catch (error) {
        console.error('Error fetching page clicks:', error);
      }
    };

    fetchPageClicks();
  }, []);

  const statsCards = [
    { Icon: FaGlobe, count: websiteVisits, label: 'Website Visits', link: 'https://localhost:5174/' },
    { Icon: FaHome, count: homePageClicks, label: 'Home Page Clicks' },
    { Icon: FaSmile, count: servicesPageClicks, label: 'Services Page Clicks' },
    { Icon: FaUserMd, count: doctorsPageClicks, label: 'Doctors Page Clicks' },
    { Icon: FaBullhorn, count: announcementPageClicks, label: 'Announcement Page Clicks' },
    { Icon: FaNewspaper, count: newsPageClicks, label: 'Latest News Page Clicks' },
    { Icon: FaHeartbeat, count: healthTipsPageClicks, label: 'Health Tips Page Clicks' },
    { Icon: FaBriefcase, count: careersPageClicks, label: 'Careers Page Clicks' },
    { Icon: FaInfoCircle, count: aboutPageClicks, label: 'About Page Clicks' },
    { Icon: FaPhone, count: contactPageClicks, label: 'Contact Page Clicks' },
  ];

  const visitLogs = [
    { id: 1, ip: '192.168.0.15', page: '/home', device: 'Desktop', datetime: '2025-10-31 13:22' },
    { id: 2, ip: '192.168.0.32', page: '/services', device: 'Mobile', datetime: '2025-10-31 13:25' },
    { id: 3, ip: '192.168.0.44', page: '/contact', device: 'Tablet', datetime: '2025-10-31 13:28' },
  ];

  useEffect(() => {
    const options = {
      chart: {
        type: "line",
        height: 600,
        width: "100%",
        toolbar: { show: true },
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
      <h1 className="title">Analytics and Reports</h1>
      <div className="breadcrumbs">
        <span>Analytics and Reports</span>
        <span className="divider">/</span>
        <span>Admin Dashboard</span>
      </div>

      {/* Stats Cards Grid */}
      <div className="info-data">
        {statsCards.map((card, index) => {
          const Icon = card.Icon;
          const CardWrapper = card.link ? 'a' : 'div';
          const cardProps = card.link 
            ? { href: card.link, target: "_blank", rel: "noopener noreferrer" }
            : {};
            
          return (
            <CardWrapper key={index} className="card" {...cardProps}>
              <div className="icon-circle">
                <Icon />
              </div>
              <div>
                <h2>{card.count}</h2>
                <p>{card.label}</p>
              </div>
            </CardWrapper>
          );
        })}
      </div>

      {/* Chart and Visit Logs */}
      <div className="chart-card">
        <div className="chart-title">
          <h3 className="chart-name">Website Visits</h3>
          <MdFullscreen className="fullscreen-icon" />
        </div>
        
        {/* ApexCharts */}
        <div id="chart"></div>

        {/* Visit Logs Table */}
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
              {visitLogs.map((log) => (
                <tr key={log.id}>
                  <td>{log.id}</td>
                  <td>{log.ip}</td>
                  <td>{log.page}</td>
                  <td>{log.device}</td>
                  <td>{log.datetime}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Analytics;