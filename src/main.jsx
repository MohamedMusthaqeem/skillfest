import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { CompetitionContextProvider } from "./context/CompetitionContext.jsx";
import { EventContextProvider } from "./context/EventContext.jsx";
import { WorkshopContextProvider } from "./context/WorkshopContext.jsx";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";
import { UserContextProvider } from "./context/UserContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContextProvider>
      <UserContextProvider>
        <CompetitionContextProvider>
          <EventContextProvider>
            <WorkshopContextProvider>
              <BrowserRouter>
                <App />
              </BrowserRouter>
            </WorkshopContextProvider>
          </EventContextProvider>
        </CompetitionContextProvider>
      </UserContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
