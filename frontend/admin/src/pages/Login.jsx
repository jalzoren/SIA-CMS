import React, { useState } from "react";
import "../css/Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        // ✅ Login success
        alert("Login successful!");
        localStorage.setItem("auth", "true");
        localStorage.setItem("user", JSON.stringify(data.user)); // optional
        window.location.href = "/dashboard";
      } else {
        // ❌ Login failed
        alert(data.message || "Invalid email or password");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error connecting to server.");
    }
  };
  
  return (
    <div className="login-wrapper">
      {/* Left Branding Section */}
      <div className="login-left">
        <div className="login-brand">
          <h1>Hospitaled</h1>
          <p>Health Medical Center</p>
        </div>
      </div>

      {/* Right Login Form Section */}
      <div className="login-right">
        <div className="login-box">
          <h2>Log In</h2>
          <form onSubmit={handleSubmit}>
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label>Password</label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <div className="show-pass">
              <input
                type="checkbox"
                id="showPassword"
                checked={showPassword}
                onChange={() => setShowPassword(!showPassword)}
              />
              <label htmlFor="showPassword">Show Password</label>
            </div>

            <button type="submit">LOG IN</button>

            <div className="forgot">
              <a href="#">Forgot Password?</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
