import React, { useEffect } from "react";
import axios from "axios";
import Template from "../components/Template";
import ComForm from "../components/ComForm";
import { useCompetitionContext } from "../hooks/useCompetitonContext";
import { useAuthContext } from "../hooks/useAuthContext";
import config from "../config";

const Competition = () => {
  const { SERVER_ADDRESS } = config;
  const { user } = useAuthContext();
  const { competitions, dispatch } = useCompetitionContext();

  useEffect(() => {
    const fetchCompetitions = async () => {
      try {
        const res = await axios.get(`${SERVER_ADDRESS}/api/routes`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        if (res.status === 200) {
          dispatch({ type: "SET_COMPETITIONS", payload: res.data });
        }
      } catch (error) {
        console.error("Failed to fetch competitions", error);
      }
    };
    fetchCompetitions();
  }, [SERVER_ADDRESS, user, dispatch]);

  return (
    <div className="bg-gray-100 min-h-screen py-10 px-4 md:px-10">
      <div className="max-w-4xl mx-auto bg-white p-6 shadow-lg rounded-lg border border-gray-200">
        <h1 className="text-3xl font-bold text-blue-700 text-center mb-6">
          Manage Competitions
        </h1>
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">
            Create New Competition
          </h2>
          <ComForm />
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">
            Created Competitions
          </h2>
          <div className="space-y-4">
            {competitions && competitions.length > 0 ? (
              competitions.map((comp) => (
                <Template key={comp._id} compet={comp} />
              ))
            ) : (
              <p className="text-gray-500">No competitions available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Competition;
