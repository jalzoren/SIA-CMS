import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import DashboardLayout from "./layouts/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import Announcements from "./pages/Announcements";
import News from "./pages/News";
import Events from "./pages/Events";
import Health from "./pages/Health";
import Posts from "./pages/Posts";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />

        {/* Layout */}
        <Route path="/" element={<DashboardLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="announcements" element={<Announcements />} />
          <Route path="news" element={<News />} />
          <Route path="events" element={<Events />} />
          <Route path="health" element={<Health />} />
                    <Route path="posts" element={<Posts />} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}
