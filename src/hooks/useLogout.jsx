import { useAuthContext } from "./useAuthContext";
import {useNavigate} from 'react-router-dom'
export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const navigate=useNavigate();
  const logout = () => {
    //remove user
    localStorage.removeItem("user");

    //dispatch logout
    dispatch({ type: "LOGOUT" });

    //logging out from the routes
      navigate("/")
  };
  return { logout };
};
