import bcrypt from "bcrypt";
import db from "../src/db.js";

const emailToTest = "alpuerto_lynnczyla@plpasig.edu.ph";
const passwordToTest = "MyNewPassword123";

const query = "SELECT * FROM users WHERE email = ?";

db.query(query, [emailToTest], async (err, results) => {
  if (err) {
    console.error("❌ Database error:", err);
    process.exit(1);
  }

  if (results.length === 0) {
    console.log("❌ User not found:", emailToTest);
    process.exit(1);
  }

  const user = results[0];
  console.log("🔹 User found:", user.email);
  console.log("🔹 Password hash in DB:", user.password);

  // Convert PHP $2y$ → Node-compatible $2a$
  const hash = user.password.replace(/^\$2y/, "$2a");

  const isMatch = await bcrypt.compare(passwordToTest, hash);
  console.log("🔹 Password match:", isMatch);

  if (isMatch) {
    console.log("✅ Login successful for:", emailToTest);
  } else {
    console.log("❌ Invalid credentials for:", emailToTest);
  }

  process.exit(0);
});
