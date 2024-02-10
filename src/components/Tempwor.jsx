import axios from "axios";
import React from "react";
import { useWorkshopContext } from "../hooks/useWorkshopContext";
import {useAuthContext} from '../hooks/useAuthContext';

const Tempwor = ({ compet }) => {
  const{user}=useAuthContext();
  const { dispatch } = useWorkshopContext();
  const handleDelete = async () => {
    const res = await axios.delete(
      "http://localhost:5000/api/workshops/"+compet._id ,{
        headers:{
          "Authorization":`Bearer ${user.token}`
        }
      }
    );
    console.log(res);
    if (res.status) {
      dispatch({ type: "DELETE_WORKSHOP", payload: res.data });
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
          Amount:{" "}
          <span className="font-normal  text-gray-800">{compet.amount}</span>
        </h1>
        <h1 className="font-poppins font-medium text-xl text-blue-700">
          No.of.Hour:{" "}
          <span className="font-normal  text-gray-800">{compet.no_of_hours}</span>
        </h1>
        <h1 className="font-poppins font-medium text-xl text-blue-700">
          No.of.Days:{" "}
          <span className="font-normal  text-gray-800">{compet.no_of_days}</span>
        </h1>
        <h1 className="font-poppins font-medium text-xl text-blue-700">
          Outcomes:{" "}
          <span className="font-normal  text-gray-800">{compet.outcomes}</span>
        </h1>
        <h1 className="font-poppins font-medium text-xl text-blue-700">
          Incharge:{" "}
          <span className="font-normal  text-gray-800">{compet.incharge}</span>
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

export default Tempwor;
