import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter as Router } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ContextProvider } from "./context/Context.tsx";

createRoot(document.getElementById("root")!).render(
  <Router>
    <ContextProvider>
      <HelmetProvider>
        <StrictMode>
          <App />
        </StrictMode>
      </HelmetProvider>
    </ContextProvider>
  </Router>
);
