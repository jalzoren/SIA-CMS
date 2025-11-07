import express from "express";
import db from "../src/db.js";
import multer from "multer";
import path from "path";
import fs from "fs";

const router = express.Router();

// 📂 Make sure uploads folder exists
const uploadDir = path.join("uploads", "announcements");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

// ⚙️ Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

/* ============================================================
   🟢 CREATE ANNOUNCEMENT
   ============================================================ */
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
    return res.status(400).json({ message: "Required fields missing" });
  }

  const tags = Array.isArray(topic_tags)
    ? topic_tags.join(",")
    : topic_tags || "";

  const sql = `
    INSERT INTO announcement 
    (short_title, full_title, topic_tags, description, status, scheduled_at, author, image)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      short_title,
      full_title,
      tags,
      description,
      status || "draft",
      scheduled_at || null,
      author || 1,
      image,
    ],
    (err, result) => {
      if (err) {
        console.error("❌ DB ERROR:", err.sqlMessage);
        return res.status(500).json({ message: "DB error", error: err });
      }
      res
        .status(201)
        .json({ message: "Announcement created", id: result.insertId, image });
    }
  );
});

/* ============================================================
   🟡 GET ALL ANNOUNCEMENTS
   ============================================================ */
router.get("/", (req, res) => {
  const sql = "SELECT * FROM announcement ORDER BY created_at DESC";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("❌ DB ERROR:", err.sqlMessage);
      return res.status(500).json({ message: "DB error", error: err });
    }

    // prepend image URL path
    const announcements = results.map((row) => ({
      ...row,
      image: row.image
        ? `http://localhost:5000/uploads/announcements/${row.image}`
        : null,
    }));

    res.json(announcements);
  });
});

/* ============================================================
   🟠 GET SINGLE ANNOUNCEMENT BY ID
   ============================================================ */
router.get("/:id", (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM announcement WHERE id = ?";
  db.query(sql, [id], (err, results) => {
    if (err) {
      console.error("❌ DB ERROR:", err.sqlMessage);
      return res.status(500).json({ message: "DB error", error: err });
    }

    if (results.length === 0)
      return res.status(404).json({ message: "Announcement not found" });

    const announcement = results[0];
    announcement.image = announcement.image
      ? `http://localhost:5000/uploads/announcements/${announcement.image}`
      : null;

    res.json(announcement);
  });
});

/* ============================================================
   🔵 SERVE UPLOADED IMAGES
   ============================================================ */
router.use("/uploads", express.static(path.join("uploads", "announcements")));

export default router;
