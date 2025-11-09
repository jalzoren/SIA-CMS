import { useState, useEffect } from "react";

// ✅ Helper to load Google Fonts dynamically
const loadFont = (fontName) => {
  if (!fontName) return;
  const existing = document.querySelector(`#font-${fontName}`);
  if (!existing) {
    const link = document.createElement("link");
    link.id = `font-${fontName}`;
    link.href = `https://fonts.googleapis.com/css2?family=${fontName.replace(
      " ",
      "+"
    )}:wght@400;500;600;700&display=swap`;
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }
};

// ✅ Helper to apply global theme styles
const applyAppearance = (appearance) => {
  if (!appearance) return;

  // Font family
  document.body.style.fontFamily = appearance.fontFamily || "Poppins";

  // Theme background color
  const themeColor =
    appearance.themeColor === "bg-primary"
      ? "#043873"
      : appearance.themeColor === "bg-info"
      ? "#4f9cf9"
      : "#ffffff";

  document.documentElement.style.setProperty("--theme-bg", themeColor);
  document.body.style.backgroundColor = themeColor;

  // Optional: font size scaling
  const size =
    appearance.fontSize === "Small"
      ? "14px"
      : appearance.fontSize === "Large"
      ? "20px"
      : "16px";

  document.documentElement.style.setProperty("--font-size", size);

  // Optional: font color
  const textColor = appearance.fontColor === "Header" ? "#1a1a1a" : "#555";
  document.documentElement.style.setProperty("--text-color", textColor);
};

// ✅ Main hook
const useAppearance = () => {
  const [appearance, setAppearance] = useState({
    fontFamily: "Poppins",
    fontSize: "Medium",
    fontColor: "Header",
    themeColor: "bg-primary",
    layout: "classic",
  });
  const [loading, setLoading] = useState(true);

  // ✅ Set initial theme to white before fetch
  useEffect(() => {
    document.documentElement.style.setProperty("--theme-bg", "#ffffff");
    document.body.style.backgroundColor = "#ffffff";
    document.body.style.fontFamily = "Poppins";
    document.documentElement.style.setProperty("--text-color", "#1a1a1a");
  }, []);

  // Fetch appearance settings
  const fetchAppearance = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/settings/appearance");
      if (!res.ok) throw new Error("Failed to fetch appearance settings");
      const data = await res.json();
      setAppearance(data);
      loadFont(data.fontFamily);
      applyAppearance(data);
    } catch (err) {
      console.error("❌ Appearance fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Fetch on mount + poll every 10 seconds for live updates (AJAX-like)
  useEffect(() => {
    fetchAppearance();
    const interval = setInterval(fetchAppearance, 10000); // every 10s
    return () => clearInterval(interval);
  }, []);

  return { appearance, loading };
};

export default useAppearance;
