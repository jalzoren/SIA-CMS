// backend/routes/news.js
import express from "express";
import db from "../src/db.js"; // MySQL connection
import multer from "multer";
import path from "path";
import { v4 as uuidv4 } from "uuid";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/news/");
  },
  filename: (req, file, cb) => {
    cb(null, uuidv4() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

/* -------------------------
   CREATE NEWS POST
-------------------------- */
router.post("/", upload.single("image"), (req, res) => {
  const {
    short_title,
    full_title,
    topic_tags,
    description,
    status,
    scheduled_at,
    author,
  } = req.body;

  const image = req.file ? req.file.filename : null;

  if (!short_title || !full_title || !description) {
    return res.status(400).json({
      success: false,
      message: "Missing required fields (short_title, full_title, description)",
    });
  }

  const sql = `
    INSERT INTO news 
    (id, short_title, full_title, topic_tags, description, status, image, scheduled_at, created_at, updated_at, author)
    VALUES (UUID(), ?, ?, ?, ?, ?, ?, ?, NOW(), NOW(), ?)
  `;

  db.query(
    sql,
    [
      short_title,
      full_title,
      topic_tags,
      description,
      status || "draft",
      image,
      scheduled_at || null,
      author || "Admin",
    ],
    (err) => {
      if (err) {
        console.error("❌ Error inserting news:", err);
        return res.status(500).json({
          success: false,
          message: "Database error",
          error: err.message,
        });
      }
      res.json({ success: true, message: "✅ News post created successfully" });
    }
  );
});

/* -------------------------
   GET ALL NEWS (for website)
-------------------------- */
router.get("/", (req, res) => {
  const sql = "SELECT * FROM news WHERE status='posted' ORDER BY created_at DESC";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("❌ Error fetching news:", err);
      return res.status(500).json({
        success: false,
        message: "Database error",
        error: err.message,
      });
    }
    res.json(results);
  });
});

/* -------------------------
   GET SINGLE NEWS ARTICLE
-------------------------- */
router.get("/:id", (req, res) => {
  const sql = "SELECT * FROM news WHERE id = ?";
  db.query(sql, [req.params.id], (err, results) => {
    if (err) {
      console.error("❌ Error fetching single article:", err);
      return res.status(500).json({
        success: false,
        message: "Database error",
        error: err.message,
      });
    }
    if (results.length === 0) {
      return res.status(404).json({ success: false, message: "Article not found" });
    }
    res.json(results[0]);
  });
});

export default router;
