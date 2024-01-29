import { useContext } from "react";
import { CompetitionContext } from "../context/CompetitionContext";

export const useCompetitionContext = () => {
  const context = useContext(CompetitionContext);
  if (!context) {
    throw Error("used must inside an CompetitonContextProvider");
  }
  return context;
};
