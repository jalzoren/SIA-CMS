import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import loginRoute from "../routes/login.js";
import newsRoute from "../routes/news.js";
import announcementsRoute from "../routes/announcement.js";


dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", loginRoute);
app.use("/api", newsRoute); 
app.use("/api", announcementsRoute);


app.get("/api/test", (req, res) => {
  res.json({ message: "Backend working!" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
