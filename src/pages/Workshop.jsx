import React, { useEffect } from "react";
import Workform from "../components/Workform";
import Tempwor from "../components/Tempwor";
import { useWorkshopContext } from "../hooks/useWorkshopContext";
import { useAuthContext } from "../hooks/useAuthContext";
import axios from "axios";
import config from "../config";

const Workshop = () => {
  const { SERVER_ADDRESS } = config;
  const { user } = useAuthContext();
  const { workshop, dispatch } = useWorkshopContext();

  useEffect(() => {
    const fetchWorkshop = async () => {
      try {
        const res = await axios.get(`${SERVER_ADDRESS}/api/workshops`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        dispatch({ type: "SET_WORKSHOP", payload: res.data });
      } catch (error) {
        console.error("Failed to fetch workshops", error);
      }
    };
    fetchWorkshop();
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Manage Workshops
      </h1>
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Create a New Workshop
        </h2>
        <Workform />
      </div>
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Created Workshops
        </h2>
        {workshop && workshop.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {workshop.map((workshops) => (
              <Tempwor key={workshops._id} compet={workshops} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center">No workshops available.</p>
        )}
      </div>
    </div>
  );
};

export default Workshop;
