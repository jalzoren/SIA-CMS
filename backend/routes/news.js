// routes/news.js
import express from "express";
import db from "../src/db.js"; // your MySQL connection
import multer from "multer";
import path from "path";
import { v4 as uuidv4 } from "uuid";

const router = express.Router();

// setup storage for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/news/");
  },
  filename: (req, file, cb) => {
    cb(null, uuidv4() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// CREATE News Post
router.post("/", upload.single("image"), (req, res) => {
  const { short_title, full_title, topic_tags, description, status, author } = req.body;
  const image = req.file ? req.file.filename : null;

  const sql = `
    INSERT INTO news (id, short_title, full_title, topic_tags, description, status, image, author)
    VALUES (UUID(), ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(sql, [short_title, full_title, topic_tags, description, status, image, author], (err, result) => {
    if (err) {
      console.error("❌ Error inserting news:", err);
      return res.status(500).json({ success: false, message: "Database error", error: err.message });
    }

    res.json({ success: true, message: "News post created successfully" });
  });
});


export default router;