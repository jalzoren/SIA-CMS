import express from "express";
import db from "../src/db.js";
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
    return res.status(400).json({ success: false, message: "Missing required fields" });
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
      if (err) return res.status(500).json({ success: false, message: err.message });
      res.json({ success: true, message: "News post created" });
    }
  );
});

router.get("/", (req, res) => {
  const sql = "SELECT * FROM news WHERE status='posted' ORDER BY created_at DESC";
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ success: false, message: err.message });
    res.json(
      results.map((r) => ({
        ...r,
        image_url: r.image ? `http://localhost:5000/uploads/news/${r.image}` : null,
      }))
    );
  });
});

router.get("/:id", (req, res) => {
  const sql = "SELECT * FROM news WHERE id = ?";
  db.query(sql, [req.params.id], (err, results) => {
    if (err) return res.status(500).json({ success: false, message: err.message });
    if (results.length === 0) return res.status(404).json({ success: false, message: "Not found" });

    const article = results[0];
    article.image_url = article.image
      ? `http://localhost:5000/uploads/news/${article.image}`
      : null;

    res.json(article);
  });
});

export default router;
