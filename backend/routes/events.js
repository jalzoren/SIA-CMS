// routes/events.js
import express from "express";
import db from "../src/db.js";
import multer from "multer";
import path from "path";

const router = express.Router();

// Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/events_career/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Use Multer middleware here
router.post("/events", upload.single("image"), (req, res) => {
  const { post_type, short_title, full_title, tags, description, status, author } = req.body;

  const sql = `
    INSERT INTO events_careers
    (post_type, short_title, full_title, tags, description, status, image, author)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      post_type,
      short_title,
      full_title,
      tags,
      description,
      status || "draft",
      req.file?.filename || null,
      author
    ],
    (err, result) => {
      if (err) return res.status(500).json({ success: false, error: err.message });
      res.json({ success: true, id: result.insertId });
    }
  );
});

export default router;
