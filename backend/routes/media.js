import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import db from "../src/db.js";

const router = express.Router();

// ============================================================
// 📂 Ensure upload folder exists
// ============================================================
const uploadDir = path.resolve("uploads", "media");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

// ============================================================
// ⚙️ Multer setup
// ============================================================
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});
const upload = multer({ storage });

// ============================================================
// 🟢 UPLOAD FILES
// ============================================================
router.post("/upload", upload.array("files"), (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ message: "No files uploaded" });
  }

  const uploadedFiles = req.files.map((file) => ({
    name: file.originalname,
    filename: file.filename,
    url: `/uploads/media/${file.filename}`, // ✅ relative path only
    size: `${(file.size / 1024).toFixed(1)} KB`,
    status: "Active",
  }));

  const values = uploadedFiles.map((f) => [
    f.name,
    f.filename,
    f.url,
    f.size,
    f.status,
  ]);

  db.query(
    "INSERT INTO files (name, filename, url, size, status) VALUES ?",
    [values],
    (err) => {
      if (err) {
        console.error("❌ MySQL Insert Error:", err.sqlMessage);
        return res.status(500).json({ message: "Database insert failed" });
      }
      res.status(201).json({ files: uploadedFiles });
    }
  );
});

// ============================================================
// 🟡 GET ALL FILES
// ============================================================
router.get("/files", (req, res) => {
  const sql = "SELECT * FROM files ORDER BY date_uploaded DESC";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("❌ MySQL Fetch Error:", err.sqlMessage);
      return res.status(500).json({ message: "Database fetch failed" });
    }

    // ✅ Prepend base URL for frontend
    const formatted = results.map((file) => ({
      ...file,
      url: `http://localhost:5000${file.url}`,
    }));

    res.json({ files: formatted });
  });
});

// ============================================================
// 🔴 DELETE FILE
// ============================================================
router.delete("/delete/:filename", (req, res) => {
  const { filename } = req.params;
  const filePath = path.join(uploadDir, filename);

  fs.unlink(filePath, (err) => {
    if (err) console.warn("⚠️ File missing:", err.message);

    db.query("DELETE FROM files WHERE filename = ?", [filename], (dbErr) => {
      if (dbErr) {
        console.error("❌ MySQL Delete Error:", dbErr.sqlMessage);
        return res.status(500).json({ message: "Database delete failed" });
      }
      res.json({ message: "File deleted successfully" });
    });
  });
});

export default router;
