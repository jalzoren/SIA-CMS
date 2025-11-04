import express from "express";
import db from "../src/db.js";
import multer from "multer";
import path from "path";
import fs from "fs";

const router = express.Router();

// Ensure folder exists
const uploadDir = path.join("uploads", "health_tips");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

// Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// CREATE health tip
router.post("/", upload.single("image"), (req, res) => {
  const { short_title, full_title, topic_tags, description, status, author } = req.body;
  const image = req.file ? req.file.filename : null;

  if (!short_title || !full_title || !description) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const tags = Array.isArray(topic_tags) ? topic_tags.join(",") : topic_tags || "";

  const sql = `
    INSERT INTO health_tips (short_title, full_title, topic_tags, description, status, author, image)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [short_title, full_title, tags, description, status || "draft", author || "Unknown", image],
    (err, result) => {
      if (err) {
        console.error("❌ DB ERROR:", err.sqlMessage);
        return res.status(500).json({ message: "Database error", error: err });
      }
      res.status(201).json({ message: "Health Tip created successfully!", id: result.insertId });
    }
  );
});

export default router;
