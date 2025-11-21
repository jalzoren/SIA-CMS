import express from "express";
import db from "../src/db.js";

const router = express.Router();

router.post("/", (req, res) => {
  const { page } = req.body;

  if (!page) {
    return res.status(400).json({ error: "Page name is required" });
  }

  const sql = `
      INSERT INTO page_views (page_name, view_date, visit_count)
      VALUES (?, CURDATE(), 1)
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


router.get("/", (req, res) => {
  const query = `
    SELECT 
      page_name, 
      DATE_FORMAT(view_date, '%Y-%m-%d') AS view_date, 
      visit_count 
    FROM page_views 
    ORDER BY view_date ASC
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error("❌ Error fetching page views:", err);
      return res.status(500).json({ message: "Server error" });
    }
    res.json(results);
  });
});


export default router;
