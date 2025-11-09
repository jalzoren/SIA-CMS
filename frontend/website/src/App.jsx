import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./pages/Home";
import Home2 from "./pages/Home2";
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

import useAppearance from "./hooks/useAppearance";
import "./App.css";

function App() {
  const { appearance, loading } = useAppearance();

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <p>Loading appearance settings...</p>
      </div>
    );
  }

  return (
    <Router>
      <ScrollToTop />
      <Navbar />

      <Routes>
        {/* Dynamic layout switch based on admin setting */}
        <Route
          path="/"
          element={appearance.layout === "modern" ? <Home2 /> : <Home />}
        />

        {/* Other routes */}
        <Route path="/home2" element={<Home2 />} />
        <Route path="/services" element={<Services />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/news" element={<News />} />
        <Route path="/announcements" element={<Announcements />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/health" element={<Health />} />

        {/* Article detail pages */}
        <Route path="/news/:id" element={<ComponentNews />} />
        <Route path="/announcements/:id" element={<ComponentAnnouncement />} />
        <Route path="/health/:id" element={<ComponentHealth />} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
