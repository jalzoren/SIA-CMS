import "../css/Posts.css";
import { useState, useEffect } from "react";
import { IoFilter } from "react-icons/io5";
import { IoMdSearch } from "react-icons/io";
import Swal from "sweetalert2";

export default function Posts() {
  const [activeTab, setActiveTab] = useState("All");
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);

  // ✅ Filter states
  const [filterAuthor, setFilterAuthor] = useState("All");
  const [filterCategory, setFilterCategory] = useState("All");
  const [filterDate, setFilterDate] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch posts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/posts");
        const data = await res.json();
        setPosts(data);
      } catch (err) {
        console.error("❌ Fetch error:", err);
      }
    };
    fetchPosts();
  }, []);

  // ✅ Apply all filters (tab + filter bar)
  useEffect(() => {
    let filtered = [...posts];

    // Normalize statuses
    filtered = filtered.map((p) => {
      const normalizedStatus = p.status?.toLowerCase();
      return {
        ...p,
        normalizedStatus:
          normalizedStatus === "posted" ||
          normalizedStatus === "publish" ||
          normalizedStatus === "published"
            ? "published"
            : normalizedStatus || "draft",
      };
    });

    // 🔹 Tab filter
    if (activeTab === "Published") {
      filtered = filtered.filter((p) => p.normalizedStatus === "published");
    } else if (activeTab === "Drafts") {
      filtered = filtered.filter((p) => p.normalizedStatus === "draft");
    } else if (activeTab === "Trash") {
      filtered = filtered.filter((p) => p.normalizedStatus === "trash");
    }

    // 🔹 Author filter
    if (filterAuthor !== "All") {
      filtered = filtered.filter((p) => p.author === filterAuthor);
    }

    // 🔹 Category filter
    if (filterCategory !== "All") {
      filtered = filtered.filter((p) => p.category === filterCategory);
    }

    // 🔹 Date filter
    if (filterDate === "Today") {
      const today = new Date().toISOString().split("T")[0];
      filtered = filtered.filter((p) => p.date?.startsWith(today));
    }

    // 🔹 Search filter
    if (searchQuery.trim()) {
      filtered = filtered.filter((p) =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredPosts(filtered);
  }, [
    activeTab,
    posts,
    filterAuthor,
    filterCategory,
    filterDate,
    searchQuery,
  ]);

  // ✅ Handle delete (move to trash)
const handleDelete = async (post) => {
  Swal.fire({
    title: "Move to Trash?",
    text: `Are you sure you want to move "${post.title}" to trash?`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, move to trash",
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        const res = await fetch(
          `http://localhost:5000/api/posts/trash/${encodeURIComponent(
            post.category
          )}/${post.id}`,
          {
            method: "PUT",
          }
        );

        const data = await res.json();
        if (res.ok) {
          Swal.fire("Moved!", data.message, "success");
          setPosts((prev) =>
            prev.map((p) =>
              p.id === post.id && p.category === post.category
                ? { ...p, status: "trash" }
                : p
            )
          );
        } else {
          Swal.fire("Error", data.message, "error");
        }
      } catch (error) {
        Swal.fire("Error", "Failed to connect to backend.", "error");
      }
    }
  });
};

  // ✅ Dynamic dropdowns
  const authors = ["All", ...new Set(posts.map((p) => p.author))];
  const categories = ["All", ...new Set(posts.map((p) => p.category))];

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
        {["All", "Published", "Drafts", "Trash"].map((label) => (
          <span
            key={label}
            className={`tab-item ${activeTab === label ? "active" : ""}`}
            onClick={() => setActiveTab(label)}
          >
            {label}
          </span>
        ))}
      </div>

      {/* ----- Filter Bar ----- */}
      <div className="filter-bar">
        <button className="sort-btn">
          <IoFilter /> Sort
        </button>

        {/* Author */}
        <select
          className="filter-select"
          value={filterAuthor}
          onChange={(e) => setFilterAuthor(e.target.value)}
        >
          {authors.map((a) => (
            <option key={a}>{a}</option>
          ))}
        </select>

        {/* Category */}
        <select
          className="filter-select"
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
        >
          {categories.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>

        {/* Date */}
        <select
          className="filter-select"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
        >
          <option>All</option>
          <option>Today</option>
        </select>

        {/* Search */}
        <div className="search-box">
          <input
            type="text"
            placeholder="Search by title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
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
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post, index) => (
                <tr key={`${post.category}-${post.id}`}>
                  <td>{index + 1}</td>
                  <td>{post.title}</td>
                  <td>{post.author}</td>
                  <td>{post.category}</td>
                  <td>
                    {post.normalizedStatus
                      ? post.normalizedStatus.charAt(0).toUpperCase() +
                        post.normalizedStatus.slice(1)
                      : post.status}
                  </td>
                  <td className={!post.date ? "empty-date" : ""}>
                    {post.date || "—"}
                  </td>
                  <td className="actions">
                    <span className="table-action">[Edit]</span>
                    <span className="divider">|</span>
                    <span className="table-action">[View]</span>
                    <span className="divider">|</span>
                    <span className="table-action delete" onClick={() => handleDelete(post)}> [Delete] </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" style={{ textAlign: "center", color: "#666" }}>
                  No posts found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
