import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../css//ForgotPassword.css';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');

  const handleSendCode = () => {
    console.log('Sending code to:', email);
    // Add your send code logic here
  };

  const handleSubmit = () => {
    console.log('Submitting with email:', email, 'and code:', code);
    // Add your submit logic here
  };

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-left">
        <h1 className="hospital-name">Hospitaled</h1>
        <h2 className="hospital-subtitle">Health Medical Center</h2>
      </div>
      
      <div className="forgot-password-right">
        
        <div className="forgot-password-form">
          <div className="form-group">
            <h1 className="forgot-password-title">Forgot Password</h1>
            <label className="form-label">Email</label>
            <div className="input-wrapper">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-input"
              />
              <button
                onClick={handleSendCode}
                className="send-code-button"
              >
                Send Code
              </button>
            </div>
          </div>
          
          <div className="form-group">
            <label className="form-label">Code</label>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="form-input"
            />
          </div>
          
          <button onClick={handleSubmit} className="submit-button">
            SUBMIT
          </button>
          
          <Link to="/login" className="back-link">Back to Login</Link>
        </div>
      </div>
    </div>
  );
}