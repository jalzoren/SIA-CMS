// frontend/website/src/main.jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/Global.css'; 
import "bootstrap/dist/css/bootstrap.min.css";
import { LayoutProvider } from './context/LayoutContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LayoutProvider>   
      <App />
    </LayoutProvider>
  </StrictMode>
)
