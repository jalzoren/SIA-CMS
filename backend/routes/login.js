import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import db from "../src/db.js";

const router = express.Router();
const JWT_SECRET = "supersecretkey123"; 

router.post("/login", async (req, res) => {
  console.log("📥 Received login request");
  console.log("➡ Raw body:", req.body);

  const email = req.body.email?.trim().toLowerCase();
  const password = req.body.password?.trim();

  if (!email || !password) {
    return res.status(400).json({ success: false, message: "Missing email or password" });
  }

  db.query("SELECT * FROM users WHERE email = ?", [email], async (err, results) => {
    if (err) {
      console.error("❌ Database error:", err);
      return res.status(500).json({ success: false, message: "Database error" });
    }

    if (results.length === 0) {
      console.log("❌ Email not found:", email);
      return res.status(404).json({ success: false, message: "Email not found" });
    }

    const user = results[0];
    console.log("✅ User found:", user.email);
    console.log("🧾 Role in DB:", user.role || "none");
    console.log("🔐 Hashed password:", user.password);

    try {
      const isMatch = await bcrypt.compare(password, user.password);
      console.log("🧩 Compare result:", isMatch);

      if (!isMatch) {
        console.log("❌ Password mismatch");
        return res.status(401).json({ success: false, message: "Invalid credentials" });
      }

      // ✅ Create JWT token
      const token = jwt.sign(
        { id: user.id, role: user.role, email: user.email },
        JWT_SECRET,
        { expiresIn: "1h" }
      );

      console.log(`✅ Login successful for ${user.email} (${user.role || "no role"})`);

      res.json({
        success: true,
        message: "Login successful!",
        token,
        user: {
          id: user.id,
          full_name: user.full_name,
          email: user.email,
          role: user.role,
        },
      });
    } catch (error) {
      console.error("❌ Error comparing password:", error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  });
});

export default router;
