import express from "express";
import path from "path";
import cors from "cors";
import dotenv from "dotenv";

// 📦 Route Imports
import loginRoute from "../routes/login.js";
import newsRoute from "../routes/news.js";
import announcementsRoute from "../routes/announcement.js";
import eventsRoute from "../routes/events.js";
import healthTipsRouter from "../routes/healthTips.js"; 
import postsRoute from "../routes/posts.js"; 
import addUserRoute from "../routes/add_user.js"; 
import jobsRoute from "../routes/jobs.js";

import mediaRoute from "../routes/media.js"; // ✅ Added media routes

dotenv.config({ path: "../.env" });

const app = express();

app.use(cors());
app.use(express.json());


app.use("/uploads", express.static(path.join(path.resolve(), "uploads")));


app.use("/api/login", loginRoute);
app.use("/api/news", newsRoute);
app.use("/api/events", eventsRoute);
app.use("/api/jobs", jobsRoute);

app.use("/api/announcements", announcementsRoute);
app.use("/api/health-tips", healthTipsRouter); 
app.use("/api/posts", postsRoute);
app.use("/api/users", addUserRoute);

app.use("/api/media", mediaRoute); // ✅ Added media route here


app.get("/api/test", (req, res) => {
  res.json({ message: "✅ Backend working perfectly!" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
