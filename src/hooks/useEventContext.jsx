import { useContext } from "react";
import { EventContext } from "../context/EventContext";

export const useEventContext = () => {
  const context = useContext(EventContext);
  if (!context) {
    throw Error("used must inside an CompetitonContextProvider");
  }
  return context;
};
