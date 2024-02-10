import React, { useEffect } from "react";
import Workform from "../components/Workform";
import Tempwor from "../components/Tempwor";
import { useWorkshopContext } from "../hooks/useWorkshopContext";
import {useAuthContext} from '../hooks/useAuthContext'
import axios from "axios";

const Workshop = () => {
  const {user}=useAuthContext();
  const { workshop, dispatch } = useWorkshopContext();
  useEffect(() => {
    const fetchWorkshop = async () => {
      const res = await axios.get("http://localhost:5000/api/workshops",{
        headers:{
          "Authorization":`Bearer ${user.token}`
        }
      });
      const data = res.data;
      if (res.status) {
        dispatch({ type: "SET_WORKSHOP", payload: data });
        console.log(data);
      }
    };
    fetchWorkshop();
  }, []);
  return (
    <div>
      <h1 className="font-poppins text-xl font-semibold">Create Workshop</h1>
      <Workform />
      <h1 className="font-poppins text-xl font-semibold"> Created Workshops</h1>
      {workshop &&
            workshop.map((workshops) => <Tempwor key={workshops._id} compet={workshops} />)}
    </div>
  );
};

export default Workshop;
