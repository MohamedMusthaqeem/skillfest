import { useContext } from "react";
import { WorkshopContext } from "../context/WorkshopContext";

export const useWorkshopContext = () => {
  const context = useContext(WorkshopContext);
  if (!context) {
    throw Error("used must inside an WorkshopContextProvider");
  }
  return context;
};
