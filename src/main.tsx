
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { ThemeProvider } from "./context/ThemeContext";
import "./index.css";
import "./i18n.ts";

// Add theme class to html element for initial load
document.documentElement.classList.add('dark');

createRoot(document.getElementById("root")!).render(
  <ThemeProvider>
    <App />
  </ThemeProvider>
);
