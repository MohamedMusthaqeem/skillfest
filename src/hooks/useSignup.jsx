import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import {useNavigate} from 'react-router-dom'
import {useUserContext} from '../hooks/useUserContext'
export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();
  const{dispatchs}=useUserContext();
  const navigate=useNavigate();

  //signup function
  const signup = async (user_name, email, password) => {
    const res = await fetch("http://localhost:5000/api/user_main/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_name, email, password }),
    });

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
      dispatchs({type:"CREATE_USER",payload:json});
      setIsLoading(false);
    }
  };
  return { signup, error, isLoading };
};
