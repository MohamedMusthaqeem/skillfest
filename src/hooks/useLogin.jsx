import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  //login function
  const login = async (current, email, password) => {
    const res = await fetch(
      `https://skillfest-backend.onrender.com/api/${current.current}/login`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      }
    );

    const json = await res.json();

    if (!res.ok) {
      setIsLoading(false);
      setError(json.error);
    }
    if (res.ok) {
      //save the user in localstorage
      localStorage.setItem("user", JSON.stringify(json));
      //update auth context
      dispatch({ type: "LOGIN", payload: json });
      setIsLoading(false);
      navigate(current.to);
    }
  };
  return { login, error, isLoading };
};
