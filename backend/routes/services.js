import express from "express";
import db from "../src/db.js";
import multer from "multer";
import path from "path";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";

const router = express.Router();

// -----------------------------
// Ensure upload folder exists
// -----------------------------
const uploadDir = path.join("uploads", "services");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

// -----------------------------
// Multer configuration
// -----------------------------
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, uuidv4() + path.extname(file.originalname)),
});
const upload = multer({ storage });

// -----------------------------
// CREATE SERVICE
// -----------------------------
router.post("/", upload.single("image"), (req, res) => {
  const { shortTitle, fullTitle, topicTags, description, status, author } = req.body;
  const image = req.file ? req.file.filename : null;

  if (!shortTitle || !fullTitle || !description) {
    return res.status(400).json({ success: false, message: "Missing required fields" });
  }

  const sql = `
    INSERT INTO services
    (id, short_title, full_title, topic_tags, description, status, image, created_at, updated_at, author)
    VALUES (UUID(), ?, ?, ?, ?, ?, ?, NOW(), NOW(), ?)
  `;

  db.query(
    sql,
    [
      shortTitle,
      fullTitle,
      topicTags || null,
      description,
      status || "published", // default to "published"
      image,
      author || "Admin",
    ],
    (err) => {
      if (err) return res.status(500).json({ success: false, message: err.sqlMessage });

      res.json({
        success: true,
        message: "Service created successfully",
        image_url: image ? `http://localhost:5000/uploads/services/${image}` : null,
      });
    }
  );
});

// -----------------------------
// GET ALL PUBLISHED SERVICES
// -----------------------------
router.get("/", (req, res) => {
  const sql = "SELECT * FROM services WHERE status='published' ORDER BY created_at DESC";

  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ success: false, message: err.sqlMessage });

    res.json(
      results.map((r) => ({
        ...r,
        image_url: r.image ? `http://localhost:5000/uploads/services/${r.image}` : null,
      }))
    );
  });
});

// -----------------------------
// GET SINGLE SERVICE BY ID
// -----------------------------
router.get("/:id", (req, res) => {
  const sql = "SELECT * FROM services WHERE id=?";
  db.query(sql, [req.params.id], (err, results) => {
    if (err) return res.status(500).json({ success: false, message: err.sqlMessage });
    if (!results.length) return res.status(404).json({ success: false, message: "Service not found" });

    const service = results[0];
    service.image_url = service.image ? `http://localhost:5000/uploads/services/${service.image}` : null;
    res.json(service);
  });
});

// -----------------------------
// Serve uploaded images
// -----------------------------
router.use("/uploads", express.static(path.join(process.cwd(), "uploads", "services")));

export default router;
