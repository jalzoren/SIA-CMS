import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

import Home from "./pages/Home";
import Services from "./pages/Services";
import Doctors from "./pages/Doctors";
import News from "./pages/News";
import Announcements from "./pages/Announcements";
import Careers from "./pages/Careers";
import Contact from "./pages/Contact";
import ComponentNews from "./components/ComponentNews";
import ComponentAnnouncement from "./components/ComponentAnnouncement";
import ComponentCareers from "./components/ComponentCareers";

import "./App.css";

function App() {
  return (
    <Router>
      {/* ✅ This handles scroll to top on every route change */}
      <ScrollToTop />

      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/news" element={<News />} />
        <Route path="/announcements" element={<Announcements />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/contact" element={<Contact />} />

        {/* Sub components */}
        <Route path="/news/:id" element={<ComponentNews />} />
        <Route
          path="/announcements/:id"
          element={<ComponentAnnouncement />}
        />
        <Route path="/careers/:id" element={<ComponentCareers />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
