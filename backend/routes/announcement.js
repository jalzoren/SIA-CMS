import express from "express";
import db from "../src/db.js";

const router = express.Router();

// CREATE announcement
router.post("/announcements", (req, res) => {
  const { short_title, full_title, topic_tags, description, status, scheduled_at, author } = req.body;

  if (!short_title || !full_title || !description) {
    return res.status(400).json({ message: "Required fields missing" });
  }

  const tags = Array.isArray(topic_tags) ? topic_tags.join(",") : topic_tags || "";

  const sql = `
    INSERT INTO announcement 
    (short_title, full_title, topic_tags, description, status, scheduled_at, author)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [short_title, full_title, tags, description, status || "draft", scheduled_at || null, author || 1],
    (err, result) => {
      if (err) {
        console.error("❌ DB ERROR:", err.sqlMessage);
        return res.status(500).json({ message: "DB error", error: err });
      }
      res.status(201).json({ message: "Announcement created", insertId: result.insertId });
    }
  );
});

// GET all published announcements
router.get("/announcements", (req, res) => {
  const sql = "SELECT * FROM announcement WHERE status='published' ORDER BY created_at DESC";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("❌ DB ERROR:", err.sqlMessage);
      return res.status(500).json({ message: "DB error", error: err });
    }
    res.json(results);
  });
});

// GET single announcement by ID
router.get("/announcements/:id", (req, res) => {
  const sql = "SELECT * FROM announcement WHERE id=?";
  db.query(sql, [req.params.id], (err, results) => {
    if (err) {
      console.error("❌ DB ERROR:", err.sqlMessage);
      return res.status(500).json({ message: "DB error", error: err });
    }
    if (results.length === 0) return res.status(404).json({ message: "Announcement not found" });
    res.json(results[0]);
  });
});

export default router;
