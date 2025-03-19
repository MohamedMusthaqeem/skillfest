import React from "react";
import { useUserContext } from "../hooks/useUserContext";
import axios from "axios";
import { useAuthContext } from "../hooks/useAuthContext";
import config from "../config";

const List = ({ user }) => {
  const { SERVER_ADDRESS } = config;
  const { user: users } = useAuthContext();
  const { dispatchs } = useUserContext();

  const handleDelete = async () => {
    try {
      const res = await axios.delete(
        `${SERVER_ADDRESS}/api/user_main/${user._id}`,
        {
          headers: {
            Authorization: `Bearer ${users.token}`,
          },
        }
      );

      if (res.status === 200) {
        dispatchs({ type: "DELETE_USER", payload: res.data });
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="overflow-y-auto">
      <div className="flex justify-between items-center bg-white shadow-lg border-l-4 border-purple-600 p-4 rounded-lg my-2 transition-all duration-300 hover:shadow-xl">
        <div>
          <p className="text-lg font-semibold text-gray-800">
            {user.user_name}
          </p>
          <p className="text-purple-600">{user.email}</p>
        </div>
        <button
          onClick={handleDelete}
          className="px-4 py-2 bg-red-500 text-white font-semibold rounded-md shadow-md hover:bg-red-700 transition-all"
        >
          Delete User
        </button>
      </div>
    </div>
  );
};

export default List;
