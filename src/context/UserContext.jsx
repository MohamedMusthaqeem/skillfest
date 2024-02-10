import { createContext, useReducer } from "react";

export const UserContext = createContext();

export const UserReducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        users: action.payload,
      };
    case "CREATE_USER":
      return {
        users: [action.payload, ...state.users],
      };
    case "DELETE_USER":
      return {
        users: state.users.filter(
          (com) => com._id != action.payload._id
        ),
      };
    default:
      return state;
  }
};

export const UserContextProvider = ({ children }) => {
  const [state, dispatchs] = useReducer(UserReducer, {
    users: null
  });

  return (
    <UserContext.Provider value={{ ...state, dispatchs }}>
      {children}
    </UserContext.Provider>
  );
};
