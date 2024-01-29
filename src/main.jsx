import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { CompetitionContextProvider } from "./context/CompetitionContext.jsx";
import { EventContextProvider } from "./context/EventContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CompetitionContextProvider>
      <EventContextProvider>
        <App />
      </EventContextProvider>
    </CompetitionContextProvider>
  </React.StrictMode>
);
