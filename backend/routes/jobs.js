import express from "express";
import db from "../src/db.js";
import multer from "multer";
import path from "path";
import fs from "fs";

const router = express.Router();

// Ensure uploads folder exists
const uploadDir = "uploads/jobs";
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

// Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)),
});

const upload = multer({ storage });

// -----------------------------
// POST: Create a new job
// -----------------------------
router.post("/", upload.single("image"), (req, res) => {
  const {
    post_type = "career",
    job_title,
    short_title = "",
    full_title = "",
    department,
    job_type = "Full-time",
    location,
    qualifications,
    application_deadline,
    description,
    status = "draft",
    author,
  } = req.body;

  const sql = `
    INSERT INTO jobs
    (post_type, job_title, short_title, full_title, department, job_type, location, qualifications, application_deadline, description, status, image, author)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      post_type,
      job_title,
      short_title,
      full_title,
      department,
      job_type,
      location,
      qualifications,
      application_deadline,
      description,
      status,
      req.file?.filename || null,
      author,
    ],
    (err, result) => {
      if (err) {
        console.error("❌ DB Error (POST job):", err);
        return res.status(500).json({ success: false, error: err.message });
      }
      res.json({ success: true, id: result.insertId });
    }
  );
});

// -----------------------------
// PUT: Update existing job
// -----------------------------
router.put("/:id", upload.single("image"), (req, res) => {
  const { id } = req.params;
  const {
    post_type = "career",
    job_title,
    short_title = "",
    full_title = "",
    department,
    job_type = "Full-time",
    location,
    qualifications,
    application_deadline,
    description,
    status = "draft",
    author,
  } = req.body;

  let sql = `
    UPDATE jobs
    SET post_type = ?, job_title = ?, short_title = ?, full_title = ?, department = ?, job_type = ?, location = ?, qualifications = ?, application_deadline = ?, description = ?, status = ?, author = ?
  `;
  const values = [
    post_type,
    job_title,
    short_title,
    full_title,
    department,
    job_type,
    location,
    qualifications,
    application_deadline,
    description,
    status,
    author,
  ];

  if (req.file?.filename) {
    sql += `, image = ?`;
    values.push(req.file.filename);
  }

  sql += ` WHERE id = ?`;
  values.push(id);

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("❌ DB Error (PUT job):", err);
      return res.status(500).json({ success: false, error: err.message });
    }
    res.json({ success: true, affectedRows: result.affectedRows });
  });
});

// -----------------------------
// GET: Fetch all published jobs only
// -----------------------------
router.get("/", (req, res) => {
  const { keyword, department, location, sort } = req.query;

  let sql = `
    SELECT * FROM jobs
    WHERE status IN ('posted', 'publish', 'published')
  `;
  const values = [];

  if (keyword) {
    sql += ` AND (job_title LIKE ? OR short_title LIKE ? OR full_title LIKE ? OR description LIKE ?)`;
    values.push(`%${keyword}%`, `%${keyword}%`, `%${keyword}%`, `%${keyword}%`);
  }

  if (department) {
    sql += ` AND department = ?`;
    values.push(department);
  }

  if (location) {
    sql += ` AND location = ?`;
    values.push(location);
  }

  if (sort === "title") {
    sql += ` ORDER BY job_title ASC`;
  } else if (sort === "date") {
    sql += ` ORDER BY application_deadline DESC`;
  } else if (sort === "department") {
    sql += ` ORDER BY department ASC`;
  } else {
    sql += ` ORDER BY id DESC`; // Default
  }

  db.query(sql, values, (err, results) => {
    if (err) {
      console.error("❌ DB Error (GET jobs):", err);
      return res.status(500).json({ success: false, error: err.message });
    }

    res.json({ success: true, jobs: results });
  });
});

// -----------------------------
// GET: Fetch single job by ID (only if published)
// -----------------------------
router.get("/:id", (req, res) => {
  const { id } = req.params;
  const sql = `
    SELECT * FROM jobs
    WHERE id = ? AND status IN ('posted', 'publish', 'published')
  `;

  db.query(sql, [id], (err, results) => {
    if (err) {
      console.error("❌ DB Error (GET job):", err);
      return res.status(500).json({ success: false, error: err.message });
    }

    if (!results[0]) {
      return res.status(404).json({ success: false, message: "Job not found or not published" });
    }

    res.json({ success: true, job: results[0] });
  });
});

export default router;
