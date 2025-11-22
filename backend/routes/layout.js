// backend/routes/layout.js
import express from "express";
const router = express.Router();

// Temporary in-memory storage
// TODO: Replace with database (MySQL/MongoDB) for production
let savedLayout = "classic";

// Track when layout was last changed (for logging/auditing)
let lastChanged = new Date();

/**
 * GET /api/layout
 * Returns the current active layout
 */
router.get("/", (req, res) => {
  try {
    console.log(`[Layout] GET request - Current layout: ${savedLayout}`);
    
    res.json({ 
      success: true,
      layout: savedLayout,
      lastChanged: lastChanged.toISOString()
    });
  } catch (error) {
    console.error("[Layout] GET error:", error);
    res.status(500).json({ 
      success: false, 
      message: "Failed to retrieve layout",
      error: error.message 
    });
  }
});

/**
 * POST /api/layout
 * Updates the website layout
 * Body: { layout: "classic" | "modern" }
 */
router.post("/", (req, res) => {
  try {
    const { layout } = req.body;
    const allowedLayouts = ["classic", "modern"];

    // Validation
    if (!layout) {
      return res.status(400).json({ 
        success: false, 
        message: "Layout parameter is required" 
      });
    }

    if (!allowedLayouts.includes(layout)) {
      return res.status(400).json({ 
        success: false, 
        message: `Invalid layout. Must be one of: ${allowedLayouts.join(", ")}`,
        allowedLayouts 
      });
    }

    // Check if layout is actually changing
    if (savedLayout === layout) {
      console.log(`[Layout] No change - layout already set to: ${layout}`);
      return res.json({ 
        success: true, 
        layout: savedLayout,
        message: "Layout is already set to this value",
        changed: false
      });
    }

    // Save the new layout
    const previousLayout = savedLayout;
    savedLayout = layout;
    lastChanged = new Date();

    console.log(`[Layout] ✓ Layout changed: ${previousLayout} → ${layout}`);

    res.json({ 
      success: true, 
      layout: savedLayout,
      previousLayout,
      lastChanged: lastChanged.toISOString(),
      message: `Layout successfully changed to ${layout}`,
      changed: true
    });

  } catch (error) {
    console.error("[Layout] POST error:", error);
    res.status(500).json({ 
      success: false, 
      message: "Failed to save layout",
      error: error.message 
    });
  }
});

/**
 * OPTIONAL: Add a reset endpoint for testing
 * DELETE /api/layout/reset
 */
router.delete("/reset", (req, res) => {
  try {
    savedLayout = "classic";
    lastChanged = new Date();
    
    console.log("[Layout] Reset to default (classic)");
    
    res.json({ 
      success: true, 
      layout: savedLayout,
      message: "Layout reset to default (classic)"
    });
  } catch (error) {
    console.error("[Layout] RESET error:", error);
    res.status(500).json({ 
      success: false, 
      message: "Failed to reset layout",
      error: error.message 
    });
  }
});

export default router;