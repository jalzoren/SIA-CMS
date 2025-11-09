import express from "express";
const router = express.Router();

let appearanceSettings = {
  fontFamily: "Poppins",
  fontSize: "Medium",
  fontColor: "Header",
  themeColor: "bg-primary",
  layout: "classic",
};

// GET current appearance settings
router.get("/appearance", (req, res) => {
  res.json(appearanceSettings);
});

// POST update appearance settings
router.post("/appearance", (req, res) => {
  appearanceSettings = req.body;
  res.json({ message: "Appearance settings updated!" });
});

export default router;
