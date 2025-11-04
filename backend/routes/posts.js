import express from "express";
import db from "../src/db.js";

const router = express.Router();

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

    // Optional: Filter to only include published items if needed
    const normalizedResults = results.map(post => ({
      ...post,
      status: post.status?.toLowerCase(),
    }));

    res.json(normalizedResults);
  });
});

export default router;
