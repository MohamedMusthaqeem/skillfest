import axios from "axios";
import React from "react";
import { useCompetitionContext } from "../hooks/useCompetitonContext";
import { useAuthContext } from "../hooks/useAuthContext";
import config from "../config";

const Template = ({ compet }) => {
  const { SERVER_ADDRESS } = config;
  const { user } = useAuthContext();
  const { dispatch } = useCompetitionContext();

  const handleDelete = async () => {
    try {
      const res = await axios.delete(
        `${SERVER_ADDRESS}/api/routes/${compet._id}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      if (res.status === 200) {
        dispatch({ type: "DELETE_COMPETITION", payload: res.data });
      }
    } catch (error) {
      console.error("Error deleting competition", error);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 border border-gray-200 w-full md:w-3/4 lg:w-1/2 mx-auto mb-6">
      <h1 className="text-2xl font-bold text-blue-700 mb-2">{compet.title}</h1>
      <p className="text-gray-700 mb-2">{compet.description}</p>
      {compet.imageurl && (
        <img
          src={compet.imageurl}
          alt="Competition"
          className="w-full h-56 object-cover rounded-lg mb-4"
        />
      )}
      <div className="grid grid-cols-2 gap-4 text-gray-800">
        <p>
          <strong>Date:</strong> {compet.date}
        </p>
        <p>
          <strong>Time:</strong> {compet.time}
        </p>
        <p>
          <strong>Amount:</strong> {compet.amount}
        </p>
        <p>
          <strong>First Prize:</strong> {compet.first_prize}
        </p>
        <p>
          <strong>Second Prize:</strong> {compet.second_prize}
        </p>
        <p>
          <strong>Third Prize:</strong> {compet.third_prize}
        </p>
        <p>
          <strong>Created At:</strong>{" "}
          {new Date(compet.createdAt).toLocaleDateString()}
        </p>
        <p>
          <strong>Support No. 1:</strong> {compet.supportnumone}
        </p>
        <p>
          <strong>Support No. 2:</strong> {compet.supportnumtwo}
        </p>
      </div>
      <button
        className="mt-4 px-4 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition"
        onClick={handleDelete}
      >
        Delete Competition
      </button>
    </div>
  );
};

export default Template;
