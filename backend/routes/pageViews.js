import express from "express";
import db from "../src/db.js";

const router = express.Router();

router.post("/", (req, res) => {
  const { page } = req.body;

  if (!page) {
    return res.status(400).json({ error: "Page name is required" });
  }

  const sql = `
      INSERT INTO page_views (page_name, visit_count)
      VALUES (?, 1)
      ON DUPLICATE KEY UPDATE visit_count = visit_count + 1
  `;

  db.query(sql, [page], (err) => {
    if (err) {
      console.error("Page tracker error:", err);
      return res.status(500).json({ error: "Database error" });
    }

    res.json({ message: "Visit recorded", page });
  });
});

export default router;
