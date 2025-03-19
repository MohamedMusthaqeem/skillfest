import axios from "axios";
import React from "react";
import { useEventContext } from "../hooks/useEventContext";
import { useAuthContext } from "../hooks/useAuthContext";
import config from "../config";
import { AiOutlineDelete } from "react-icons/ai";

const Templateeve = ({ compet }) => {
  const { SERVER_ADDRESS } = config;
  const { user } = useAuthContext();
  const { dispatch } = useEventContext();

  const handleDelete = async () => {
    const res = await axios.delete(
      `${SERVER_ADDRESS}/api/events/` + compet._id,
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    console.log(res);
    if (res.status) {
      dispatch({ type: "DELETE_EVENT", payload: res.data });
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 m-4 w-full max-w-2xl">
      <h1 className="text-2xl font-bold text-blue-700 mb-2">{compet.title}</h1>
      <p className="text-gray-700 mb-4">{compet.description}</p>
      {compet.imageurl && (
        <div className="w-full flex justify-center mb-4">
          <img
            src={compet.imageurl}
            alt="Event"
            className="rounded-lg shadow-md max-h-80 object-cover w-full"
          />
        </div>
      )}
      <div className="grid grid-cols-2 gap-4 text-gray-700 text-sm">
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
          <strong>Created Time:</strong>{" "}
          {new Date(compet.createdAt).toLocaleString()}
        </p>
        <p>
          <strong>Support Number 1:</strong> {compet.supportnumone}
        </p>
        <p>
          <strong>Support Number 2:</strong> {compet.supportnumtwo}
        </p>
        <p>
          <strong>Venue:</strong> {compet.venue}
        </p>
      </div>
      <div className="flex justify-end mt-4">
        <button
          className="flex items-center bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-800 transition"
          onClick={handleDelete}
        >
          <AiOutlineDelete className="mr-2" /> Delete
        </button>
      </div>
    </div>
  );
};

export default Templateeve;
