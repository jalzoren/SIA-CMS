import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../components/components-css/Loading.css"; // styling

export default function Loading() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/login");
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="loading-container">
      <div className="dots-loader">
        {[...Array(5)].map((_, i) => (
          <span key={i}></span>
        ))}
      </div>
      <h4>Logging in to hospitaled Admin Panel...</h4>
    </div>
  );
}
