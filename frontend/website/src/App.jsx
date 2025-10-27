import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import "./App.css";

function App() {
  return (
    <Router>
      {/* Navbar (sticky top) */}
      <Navbar />

      {/* Main Page Content */}
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </main>

      {/* Footer (bottom) */}
      <Footer />
    </Router>
  );
}

export default App;
