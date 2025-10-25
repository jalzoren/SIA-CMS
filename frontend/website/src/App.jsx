import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Footer from "./components/Footer"; 
import Services from "./pages/Services";

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/doctors" element={<div>Doctors Page</div>} />
            <Route path="/news" element={<div>News Page</div>} />
            <Route path="/careers" element={<div>Careers Page</div>} />
            <Route path="/about" element={<div>About Us</div>} />
            <Route path="/contact" element={<div>Contact Page</div>} />
            <Route path="/appointment" element={<div>Book Appointment</div>} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
