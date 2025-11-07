import express from "express";
import db from "../src/db.js"; // adjust path if needed
import bcrypt from "bcrypt";

const router = express.Router();

router.post("/add", async (req, res) => {
  const { full_name, email, password, role } = req.body;

  if (!full_name || !email || !password || !role) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const query =
      "INSERT INTO users (full_name, email, password, role) VALUES (?, ?, ?, ?)";
    db.query(query, [full_name, email, hashedPassword, role], (err) => {
      if (err) {
        console.error("❌ Error inserting user:", err);
        return res.status(500).json({ message: "Database error" });
      }
      res.json({ message: "User added successfully!" });
    });
  } catch (err) {
    console.error("Error hashing password:", err);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/", (req, res) => {
    const query = "SELECT id, full_name, email, role, last_login FROM users ORDER BY id DESC";
  db.query(query, (err, results) => {
    if (err) {
      console.error("❌ Error fetching users:", err);
      return res.status(500).json({ message: "Database error" });
    }
    res.json(results);
  });
});


// Update user by ID
router.put("/:id", async (req, res) => {
    const userId = req.params.id;
    const { full_name, email, role, password } = req.body;
  
    if (!full_name || !email || !role) {
      return res.status(400).json({ message: "Full name, email, and role are required" });
    }
  
    try {
      let query, params;
  
      if (password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        query = "UPDATE users SET full_name = ?, email = ?, role = ?, password = ? WHERE id = ?";
        params = [full_name, email, role, hashedPassword, userId];
      } else {
        query = "UPDATE users SET full_name = ?, email = ?, role = ? WHERE id = ?";
        params = [full_name, email, role, userId];
      }
  
      db.query(query, params, (err, result) => {
        if (err) {
          console.error("❌ Error updating user:", err);
          return res.status(500).json({ message: "Database error" });
        }
  
        if (result.affectedRows === 0) {
          return res.status(404).json({ message: "User not found" });
        }
  
        res.json({ message: "User updated successfully!" });
      });
    } catch (err) {
      console.error("❌ Error updating user:", err);
      res.status(500).json({ message: "Server error" });
    }
  });
  
  // Optional: delete user by ID
  router.delete("/:id", (req, res) => {
    const userId = req.params.id;
    const query = "DELETE FROM users WHERE id = ?";
    db.query(query, [userId], (err, result) => {
      if (err) {
        console.error("❌ Error deleting user:", err);
        return res.status(500).json({ message: "Database error" });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json({ message: "User deleted successfully!" });
    });
  });
  

export default router;
