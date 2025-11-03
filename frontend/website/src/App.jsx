import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

import Home from "./pages/Home";
import Services from "./pages/Services";
import Doctors from "./pages/Doctors";
import News from "./pages/News";
import AnnouncementsArticle from "./pages/AnnouncementsArticle";
import Announcements from "./pages/Announcements";
import Careers from "./pages/Careers";
import Contact from "./pages/Contact";
import NewsArticle from "./pages/NewsArticle";

import "./App.css";

function App() {
  return (
    <Router>
      <ScrollToTop />

      <Navbar />

      <Routes>
        {/* Main pages */}
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/news" element={<News />} />
        <Route path="/announcements" element={<Announcements />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/contact" element={<Contact />} />

        {/* Single article pages */}
        <Route path="/news/:id" element={<NewsArticle />} />
        <Route path="/announcements/:id" element={<AnnouncementsArticle />} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
