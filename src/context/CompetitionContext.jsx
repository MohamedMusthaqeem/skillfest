import { createContext, useReducer } from "react";

export const CompetitionContext = createContext();

export const CompetitionReducer = (state, action) => {
  switch (action.type) {
    case "SET_COMPETITIONS":
      return {
        competitions: action.payload,
      };
    case "CREATE_COMPETITION":
      return {
        competitions: [action.payload, ...state.competitions],
      };
    case "DELETE_COMPETITION":
      return {
        competitions: state.competitions.filter(
          (com) => com._id != action.payload._id
        ),
      };
    default:
      return state;
  }
};

export const CompetitionContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(CompetitionReducer, {
    competitions: null,
  });

  return (
    <CompetitionContext.Provider value={{ ...state, dispatch }}>
      {children}
    </CompetitionContext.Provider>
  );
};
