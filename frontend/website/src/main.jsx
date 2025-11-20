// frontend/website/src/main.jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/Global.css'; 
import "bootstrap/dist/css/bootstrap.min.css";
import Logo from "/src/assets/logo1.svg";


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
