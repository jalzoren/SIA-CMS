import express from "express";
import multer from "multer";
import cors from "cors";
import fs from "fs";
import path from "path";
import mysql from "mysql2";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "your_database_name",
});

db.connect((err) => {
  if (err) {
    console.error("MySQL Connection Error:", err.message);
  } else {
    console.log("Connected to MySQL Database");
  }
});

const uploadDir = path.join(__dirname, "uploads/media");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

app.post("/api/upload", upload.array("files"), (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ message: "No files uploaded" });
  }

  const uploadedFiles = req.files.map((file) => ({
    name: file.originalname,
    filename: file.filename,
    url: `/uploads/media/${file.filename}`,
    size: (file.size / 1024).toFixed(1) + " KB",
  }));

  const values = uploadedFiles.map((f) => [
    f.name,
    f.filename,
    f.url,
    f.size,
    "Active",
  ]);

  db.query(
    "INSERT INTO files (name, filename, url, size, status) VALUES ?",
    [values],
    (err) => {
      if (err) {
        console.error("MySQL Insert Error:", err.message);
        return res.status(500).json({ message: "Failed to save to database" });
      }
      res.json({ files: uploadedFiles });
    }
  );
});

app.get("/api/files", (req, res) => {
  db.query("SELECT * FROM files ORDER BY date_uploaded DESC", (err, results) => {
    if (err) {
      console.error("MySQL Fetch Error:", err.message);
      return res.status(500).json({ message: "Failed to fetch files" });
    }
    res.json({ files: results });
  });
});

app.delete("/api/delete/:filename", (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(uploadDir, filename);

  fs.unlink(filePath, (err) => {
    if (err) console.warn("File missing:", err.message);

    db.query("DELETE FROM files WHERE filename = ?", [filename], (dbErr) => {
      if (dbErr) {
        console.error("MySQL Delete Error:", dbErr.message);
        return res.status(500).json({ message: "Failed to delete record" });
      }
      res.json({ message: "File deleted successfully" });
    });
  });
});

app.use("/uploads/media", express.static(uploadDir));

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
