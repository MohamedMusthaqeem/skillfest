import axios from "axios";
import React from "react";
import { useEventContext } from "../hooks/useEventContext";
import {useAuthContext} from '../hooks/useAuthContext'

const Templateeve = ({ compet }) => {
  const {user}=useAuthContext();
  const { dispatch } = useEventContext();
  const handleDelete = async () => {
    const res = await axios.delete(
      "http://localhost:5000/api/events/" + compet._id
    ,{
      headers:{
        "Authorization":`Bearer ${user.token}`
      }
    });
    console.log(res);
    if (res.status) {
      dispatch({ type: "DELETE_EVENT", payload: res.data });
    }
  };
  return (
    <div>
      <div className=" bg-zinc-300  m-2 p-2 rounded-xl shadow-md w-1/2  ">
        <h1 className="font-poppins tracking-wider font-extrabold text-2xl text-blue-700">
          {compet.title}
        </h1>
        <h1 className="font-poppins font-medium text-xl text-blue-700">
          Description:{" "}
          <span className="font-normal text-gray-800">
            {compet.description}
          </span>
        </h1>
        <h1 className="font-poppins font-medium text-xl text-blue-700">
          imageurl:{" "}
          <p className="font-normal  text-gray-800 overflow-x-scroll">
            {compet.imageurl}
          </p>
          <img src={compet.imageurl} alt="" className="h-72" />
        </h1>
        <h1 className="font-poppins font-medium text-xl text-blue-700">
          Date:{" "}
          <span className="font-normal  text-gray-800">{compet.date}</span>
        </h1>
        <h1 className="font-poppins font-medium text-xl text-blue-700">
          Time:{" "}
          <span className="font-normal  text-gray-800">{compet.time}</span>
        </h1>
        <h1 className="font-poppins font-medium text-xl text-blue-700">
          amount:{" "}
          <span className="font-normal  text-gray-800">{compet.amount}</span>
        </h1>
        <h1 className="font-poppins font-medium text-xl text-blue-700">
          First_Prize:{" "}
          <span className="font-normal  text-gray-800">
            {compet.first_prize}
          </span>
        </h1>
        <h1 className="font-poppins font-medium text-xl text-blue-700">
          Second_Prize:{" "}
          <span className="font-normal  text-gray-800">
            {compet.second_prize}
          </span>
        </h1>
        <h1 className="font-poppins font-medium text-xl text-blue-700">
          Third_prize:{" "}
          <span className="font-normal  text-gray-800">
            {compet.third_prize}
          </span>
        </h1>
        <h1 className="font-poppins font-medium text-xl text-blue-700">
          Created Time:{" "}
          <span className="font-normal  text-gray-800">{compet.createdAt}</span>
        </h1>
        <h1 className="font-poppins font-medium text-xl text-blue-700">
          Support Number1:{" "}
          <span className="font-normal  text-gray-800">
            {compet.supportnumone}
          </span>
        </h1>
        <h1 className="font-poppins font-medium text-xl text-blue-700">
          Support Number2:{" "}
          <span className="font-normal  text-gray-800">
            {compet.supportnumtwo}
          </span>
        </h1>
        <div>
          <button
            className="p-2 text-white bg-red-700 active:bg-red-900 rounded-md"
            onClick={handleDelete}
          >
            DELETE
          </button>
        </div>
      </div>
    </div>
  );
};

export default Templateeve;
