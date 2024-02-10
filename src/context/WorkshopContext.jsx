import { createContext, useReducer } from "react";

export const WorkshopContext = createContext();

export const WorkshopReducer = (state, action) => {
  switch (action.type) {
    case "SET_WORKSHOP":
      return {
        workshop: action.payload,
      };
    case "CREATE_WORKSHOP":
      return {
        workshop: [action.payload, ...state.workshop],
      };
    case "DELETE_WORKSHOP":
      return {
        workshop: state.workshop.filter((wor) => wor._id != action.payload._id),
      };
    default:
      return state;
  }
};

export const WorkshopContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(WorkshopReducer, {
    workshop: null,
  });
  return (
    <WorkshopContext.Provider value={{ ...state, dispatch }}>
      {children}
    </WorkshopContext.Provider>
  );
};
