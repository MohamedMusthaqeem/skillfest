import React, { useEffect } from "react";
import axios from "axios";
import Template from "../components/Template";
import ComForm from "../components/ComForm";
import { useCompetitionContext } from "../hooks/useCompetitonContext";
const Competition = () => {
  const { competitions, dispatch } = useCompetitionContext();
  useEffect(() => {
    const fetchCompetitions = async () => {
      const res = await axios.get("http://localhost:5000/api/routes");
      const data = res.data;
      if (res.status) {
        dispatch({ type: "SET_COMPETITIONS", payload: data });
        console.log(data);
      }
    };
    fetchCompetitions();
  }, []);
  return (
    <div>
      <div>
        <p className="text-xl font-bold">Create New Competitions</p>
        <ComForm />
        <p className="text-xl font-bold">Created Competitions</p>
        {competitions &&
          competitions.map((comp) => <Template key={comp._id} compet={comp} />)}
      </div>
    </div>
  );
};

export default Competition;
