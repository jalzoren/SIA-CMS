import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function usePageTracker() {
  const location = useLocation();

  useEffect(() => {
    fetch("http://localhost:5000/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ page: location.pathname }),
    });
  }, [location]);
}
