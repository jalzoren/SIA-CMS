// src/components/ScrollToTop.jsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname, hash, key } = useLocation();

  useEffect(() => {
    // Work for normal routes & hash anchors.
    // Delay a tick so the new page content can paint, then scroll.
    const id = setTimeout(() => {
      if (hash) {
        // if there's a hash, try to scroll to the element
        const el = document.querySelector(hash);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
          return;
        }
      }

      // otherwise scroll to top
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }, 50);

    return () => clearTimeout(id);
    // include key so it also runs on navigation to same pathname with different state
  }, [pathname, hash, key]);

  return null;
}
