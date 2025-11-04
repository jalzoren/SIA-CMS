import express from "express";
import db from "../src/db.js";
import multer from "multer";
import path from "path";
import fs from "fs";

const router = express.Router();

// Create uploads folder if it doesn't exist
const uploadDir = path.join("uploads", "announcements");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

// Configure Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// CREATE announcement with image
router.post("/", upload.single("image"), (req, res) => {
  const { short_title, full_title, topic_tags, description, status, scheduled_at, author } = req.body;
  const image = req.file ? req.file.filename : null; // store filename

  if (!short_title || !full_title || !description) {
    return res.status(400).json({ message: "Required fields missing" });
  }

  const tags = Array.isArray(topic_tags) ? topic_tags.join(",") : topic_tags || "";

  const sql = `
    INSERT INTO announcement 
    (short_title, full_title, topic_tags, description, status, scheduled_at, author, image)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(sql,
    [short_title, full_title, tags, description, status || "draft", scheduled_at || null, author || 1, image],
    (err, result) => {
      if (err) {
        console.error("❌ DB ERROR:", err.sqlMessage);
        return res.status(500).json({ message: "DB error", error: err });
      }
      res.status(201).json({ message: "Announcement created", insertId: result.insertId, image });
    }
  );
});

export default router;
