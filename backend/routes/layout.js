import express from "express";
const router = express.Router();

// Temporary in-memory storage (replace with DB in production)
let savedLayout = "classic";

// GET current layout
router.get("/", (req, res) => {
  res.json({ layout: savedLayout });
});

// POST new layout
router.post("/", (req, res) => {
  const { layout } = req.body;
  const allowedLayouts = ["classic", "modern", "compact"];

  if (!allowedLayouts.includes(layout)) {
    return res.status(400).json({ success: false, message: "Invalid layout" });
  }

  savedLayout = layout;
  res.json({ success: true, layout: savedLayout });
});

export default router;
