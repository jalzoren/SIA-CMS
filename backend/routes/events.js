// routes/events.js
import express from "express";
import db from "../src/db.js";

const router = express.Router();

router.post("/events", (req, res) => {
  const { post_type, short_title, full_title, tags, description, status } = req.body;
  const sql = `INSERT INTO events_careers (post_type, short_title, full_title, tags, description, status)
               VALUES (?, ?, ?, ?, ?, ?)`;

  db.query(sql, [post_type, short_title, full_title, tags, description, status || "draft"], (err, result) => {
    if (err) return res.status(500).json({ success: false, error: err.message });
    res.json({ success: true, id: result.insertId });
  });
});

export default router;
