import "../css/Posts.css"; // <-- your CSS file with the fix above
import { useState } from "react";
import { IoFilter } from "react-icons/io5";
import { IoMdSearch } from "react-icons/io";

export default function Posts() {
  const [activeTab, setActiveTab] = useState("All");

  const tabs = [
    { label: "All", count: 20 },
    { label: "Published", count: 10 },
    { label: "Drafts", count: 5 },
    { label: "Trash", count: 5 },
  ];

  const posts = [
    {
      id: 1,
      title: "News",
      author: "Admin",
      category: "News",
      status: "Published",
      date: "October 15, 2025 - Published",
    },
    {
      id: 2,
      title: "Events & Careers",
      author: "Editor",
      category: "Events & Careers",
      status: "Scheduled",
      date: "October 18, 2025 - Last Modified",
    },
    {
      id: 3,
      title: "Announcements",
      author: "Moderator",
      category: "Announcements",
      status: "Draft",
      date: "—",
    },
  ];

  return (
    <div className="cms-announcement-page">
      {/* ----- Header ----- */}
      <h2 className="title">Posts</h2>
      <ul className="breadcrumbs">
        <li>Posts Log</li>
        <li className="divider">/</li>
        <li>Admin Panel</li>
      </ul>

      {/* ----- Tabs ----- */}
      <div className="tab-row">
        {tabs.map((tab) => (
          <span
            key={tab.label}
            className={`tab-item ${activeTab === tab.label ? "active" : ""}`}
            onClick={() => setActiveTab(tab.label)}
          >
            {tab.label} ({tab.count})
          </span>
        ))}
      </div>

      {/* ----- Filter Bar ----- */}
      <div className="filter-bar">
        <button className="sort-btn">
          <IoFilter /> Sort
        </button>

        <select className="filter-select">
          <option>Author</option>
        </select>

        <select className="filter-select">
          <option>Category</option>
        </select>

        <select className="filter-select">
          <option>Date</option>
        </select>

        {/* ---- SEARCH BOX ---- */}
        <div className="search-box">
          <input type="text" placeholder="Filter" />
          <button className="search-btn">
            <IoMdSearch />
          </button>
        </div>
      </div>

      {/* ----- Table ----- */}
      <div className="table-container">
        <table className="posts-table">
          <thead>
            <tr>
              <th>No.</th>
              <th>Title</th>
              <th>Published By</th>
              <th>Category</th>
              <th>Status</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id}>
                <td>{post.id}</td>
                <td>{post.title}</td>
                <td>{post.author}</td>
                <td>{post.category}</td>
                <td>{post.status}</td>
                <td className={post.date === "—" ? "empty-date" : ""}>
                  {post.date}
                </td>
                <td className="actions">
                  <span className="table-action">[Edit]</span>
                  <span className="divider">|</span>

                  <span className="table-action">[View]</span>

                  <span className="divider">|</span>
                  <span className="table-action delete">[Delete]</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
