import express from "express";
import db from "../src/db.js";

const router = express.Router();

// ✅ CREATE (POST) - for admin/news.jsx
router.post("/news", (req, res) => {
  console.log("📥 Incoming POST body:", req.body);

  const { short_title, full_title, topic_tags, description, status, scheduled_at, author } = req.body;

  // Validate required fields
  if (!short_title || !full_title || !description) {
    return res.status(400).json({ message: "Short title, full title, and description are required." });
  }

  // Convert tags array to string for MySQL
  const tags = Array.isArray(topic_tags) ? topic_tags.join(",") : topic_tags || "";

  const sql = `
    INSERT INTO news (short_title, full_title, topic_tags, description, status, scheduled_at, author)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [short_title, full_title, tags, description, status || "draft", scheduled_at || null, author || 1],
    (err, result) => {
      if (err) {
        console.error("❌ Error creating news:", err);
        return res.status(500).json({ message: "Database error", error: err });
      }
      console.log("✅ News inserted, ID:", result.insertId);
      res.status(201).json({ message: "News article created successfully", insertId: result.insertId });
    }
  );
});

// ✅ READ ALL - for website/news.jsx
router.get("/news", (req, res) => {
  const sql = "SELECT * FROM news WHERE status='published' ORDER BY created_at DESC";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("❌ Error fetching news:", err);
      return res.status(500).json({ message: "Database error", error: err });
    }
    res.json(results);
  });
});

// ✅ READ ONE by ID - for website/articleNews.jsx
router.get("/news/:id", (req, res) => {
  const sql = "SELECT * FROM news WHERE id = ?";
  db.query(sql, [req.params.id], (err, results) => {
    if (err) {
      console.error("❌ Error fetching article:", err);
      return res.status(500).json({ message: "Database error", error: err });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: "Article not found" });
    }
    res.json(results[0]);
  });
});

export default router;
