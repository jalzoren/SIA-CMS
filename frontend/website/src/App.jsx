import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

import Home from "./pages/Home";
import Services from "./pages/Services";
import Doctors from "./pages/Doctors";
import News from "./pages/News";
import ComponentAnnouncement from "./components/ComponentAnnouncement";
import Announcements from "./pages/Announcements";
import Careers from "./pages/Careers";
import About from "./pages/About";
import Contact from "./pages/Contact";
import ComponentNews from "./components/ComponentNews";
import ComponentHealth from "./components/ComponentHealth";
import Health from "./pages/Health";

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
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/health" element={<Health/>} />

        {/* Single article pages */}
        <Route path="/news/:id" element={<ComponentNews />} />
        <Route path="/announcements/:id" element={<ComponentAnnouncement />} />
        <Route path="/health/:id" element={<ComponentHealth/>} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
