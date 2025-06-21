if (import.meta.env.VITE_TEMPO) {
  import("tempo-devtools").then(({ TempoDevtools }) => TempoDevtools.init());
}

import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "./i18n.ts";

createRoot(document.getElementById("root")!).render(<App />);
