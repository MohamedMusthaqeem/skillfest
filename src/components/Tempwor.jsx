import React from "react";
import axios from "axios";
import { useWorkshopContext } from "../hooks/useWorkshopContext";
import { useAuthContext } from "../hooks/useAuthContext";
import config from "../config";

const Tempwor = ({ compet }) => {
  const { SERVER_ADDRESS } = config;
  const { user } = useAuthContext();
  const { dispatch } = useWorkshopContext();

  const handleDelete = async () => {
    try {
      const res = await axios.delete(
        `${SERVER_ADDRESS}/api/workshops/${compet._id}`,
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
      dispatch({ type: "DELETE_WORKSHOP", payload: res.data });
    } catch (error) {
      console.error("Failed to delete workshop", error);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mb-6 border border-gray-200">
      <h1 className="text-2xl font-bold text-blue-700 mb-2">{compet.title}</h1>
      <p className="text-gray-800 mb-2">
        <strong>Description:</strong> {compet.description}
      </p>
      <div className="mb-2">
        <strong className="text-blue-700">Image:</strong>
        <div className="overflow-x-scroll text-gray-800">{compet.imageurl}</div>
        <img
          src={compet.imageurl}
          alt={compet.title}
          className="h-48 w-full object-cover mt-2 rounded-md"
        />
      </div>
      <p className="text-gray-800">
        <strong>Date:</strong> {compet.date}
      </p>
      <p className="text-gray-800">
        <strong>End Date:</strong> {compet.end_date}
      </p>
      <p className="text-gray-800">
        <strong>Time:</strong> {compet.time}
      </p>
      <p className="text-gray-800">
        <strong>Amount:</strong> {compet.amount}
      </p>
      <p className="text-gray-800">
        <strong>No. of Hours:</strong> {compet.no_of_hours}
      </p>
      <p className="text-gray-800">
        <strong>No. of Days:</strong> {compet.no_of_days}
      </p>
      <p className="text-gray-800">
        <strong>Outcomes:</strong> {compet.outcomes}
      </p>
      <p className="text-gray-800">
        <strong>Incharge:</strong> {compet.incharge}
      </p>
      <p className="text-gray-800">
        <strong>Created Time:</strong> {compet.createdAt}
      </p>
      <p className="text-gray-800">
        <strong>Support Number 1:</strong> {compet.supportnumone}
      </p>
      <p className="text-gray-800">
        <strong>Support Number 2:</strong> {compet.supportnumtwo}
      </p>
      <p className="text-gray-800">
        <strong>Venue:</strong> {compet.venue}
      </p>
      <div className="mt-4">
        <button
          className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition"
          onClick={handleDelete}
        >
          DELETE
        </button>
      </div>
    </div>
  );
};

export default Tempwor;
