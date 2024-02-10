import { useContext } from "react";
import { UserContext } from "../context/UserContext";

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw Error("used must inside an CompetitonContextProvider");
  }
  return context;
};