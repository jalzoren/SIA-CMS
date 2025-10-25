import React, { useEffect } from "react";
import ApexCharts from "apexcharts";
import "../css/Dashboard.css";

const Dashboard = () => {
  useEffect(() => {
    const options = {
      chart: { type: "line", height: 250 },
      series: [{ name: "Visits", data: [1, 3, 5, 2, 6, 4, 7] }],
      xaxis: { categories: [1, 2, 3, 4, 5, 6, 7], title: { text: "Date" } },
      yaxis: { title: { text: "Number of Visits" } },
      stroke: { curve: "smooth", width: 2 },
    };

    const chart = new ApexCharts(document.querySelector("#chart"), options);
    chart.render();
    return () => chart.destroy();
  }, []);

  return (
    <main id="dashboard">
      <h2 className="page-title">Dashboard</h2>
      <ul className="breadcrumbs">
        <li>Dashboard</li>
        <li>/ Admin Dashboard</li>
      </ul>

      <div className="cards">
        <div className="card">
          <h2>126</h2>
          <p>Website Visits</p>
        </div>
        <div className="card">
          <h2>60</h2>
          <p>Published Content</p>
        </div>
        <div className="card">
          <h2>60</h2>
          <p>Drafts Content</p>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="chart-container">
          <div className="chart-header">
            <h3>Website Visits</h3>
          </div>
          <div id="chart"></div>
        </div>

        <div className="calendar-container">
          <div className="time">
            <h2>00:00:00</h2>
            <p>18 / 10 / 25 | Saturday</p>
          </div>
          <table className="hotlines">
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
    </main>
  );
};

export default Dashboard;
