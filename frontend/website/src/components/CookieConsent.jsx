import { useEffect, useState } from "react";
import "../components/components-css/Cookie.css";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Check cookie safely
    const cookies = document.cookie.split(";").map(c => c.trim());
    const hasAccepted = cookies.includes("cookieAccepted=true");

    if (!hasAccepted) {
      // Show popup with slight delay (prevents animation flicker)
      setTimeout(() => setVisible(true), 150);
    }
  }, []);

  const acceptCookies = () => {
    const maxAge = 60 * 60 * 24 * 365; // 1 year
    document.cookie = `cookieAccepted=true; path=/; max-age=${maxAge}; SameSite=Lax`;
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="cookie-popup" role="alert" aria-live="polite">
      <p>
        This website uses cookies to ensure a safe and improved medical
        experience for all users.
      </p>
      <button onClick={acceptCookies} aria-label="Accept cookies">
        Accept
      </button>
    </div>
  );
}
