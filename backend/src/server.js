import express from "express";
import path from "path";
import cors from "cors";
import dotenv from "dotenv";
import loginRoute from "../routes/login.js";
import newsRoute from "../routes/news.js";
import announcementsRoute from "../routes/announcement.js";
import eventsRoute from "../routes/events.js";
import healthTipsRouter from "../routes/healthTips.js"; // ✅ FIXED path
import postsRoute from "../routes/posts.js"; // adjust path

dotenv.config({ path: "../.env" });

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(path.resolve(), "uploads")));

// ✅ ROUTES
app.use("/api/login", loginRoute);
app.use("/api/news", newsRoute);
app.use("/api/events", eventsRoute);
app.use("/api/announcements", announcementsRoute);
app.use("/api/health-tips", healthTipsRouter); // ✅ ADDED this line
app.use("/api/posts", postsRoute);

// Test route
app.get("/api/test", (req, res) => {
  res.json({ message: "Backend working!" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
