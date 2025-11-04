import express from "express";
import db from "../src/db.js";

const router = express.Router();

// ✅ Existing fetch route
router.get("/", (req, res) => {
  const sql = `
    SELECT id, full_title AS title, author, 'News' AS category,
      CASE
        WHEN status IN ('posted', 'publish', 'published') THEN 'published'
        WHEN status IN ('draft', 'pending') THEN 'draft'
        WHEN status IN ('trash', 'deleted', 'archived') THEN 'trash'
        ELSE status
      END AS status,
      created_at AS date
    FROM news

    UNION ALL

    SELECT id, full_title AS title, author, 'Announcements' AS category,
      CASE
        WHEN status IN ('posted', 'publish', 'published') THEN 'published'
        WHEN status IN ('draft', 'pending') THEN 'draft'
        WHEN status IN ('trash', 'deleted', 'archived') THEN 'trash'
        ELSE status
      END AS status,
      created_at AS date
    FROM announcement

    UNION ALL

    SELECT id, full_title AS title, author, 'Events & Careers' AS category,
      CASE
        WHEN status IN ('posted', 'publish', 'published') THEN 'published'
        WHEN status IN ('draft', 'pending') THEN 'draft'
        WHEN status IN ('trash', 'deleted', 'archived') THEN 'trash'
        ELSE status
      END AS status,
      created_at AS date
    FROM events_careers

    UNION ALL

    SELECT id, full_title AS title, author, 'Health Tips' AS category,
      CASE
        WHEN status IN ('posted', 'publish', 'published') THEN 'published'
        WHEN status IN ('draft', 'pending') THEN 'draft'
        WHEN status IN ('trash', 'deleted', 'archived') THEN 'trash'
        ELSE status
      END AS status,
      created_at AS date
    FROM health_tips

    ORDER BY date DESC;
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error("❌ Error fetching posts:", err);
      return res.status(500).json({ message: "Failed to fetch posts" });
    }

    res.json(results.map(p => ({ ...p, status: p.status?.toLowerCase() })));
  });
});

router.put("/trash/:category/:id", (req, res) => {
  const { category, id } = req.params;

  // Match category to its actual table name
  const tableMap = {
    "News": "news",
    "Announcements": "announcement",
    "Events & Careers": "events_careers",
    "Health Tips": "health_tips",
  };

  const table = tableMap[category];
  if (!table) {
    return res.status(400).json({ message: "Invalid category" });
  }

  const sql = `UPDATE ${table} SET status = 'trash' WHERE id = ?`;
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error("❌ Error moving post to trash:", err);
      return res.status(500).json({ message: "Failed to move post to trash" });
    }

    res.json({ message: "Post moved to trash successfully" });
  });
});

export default router;
