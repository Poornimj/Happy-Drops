import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./shared.css";
import App from "./App.jsx";

// Clear localStorage on app load to ensure consistent state across localhost and 127.0.0.1
// since browsers treat these as different origins with separate storage
localStorage.removeItem('wellnessAssessmentProgress');

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
