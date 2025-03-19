import React, { useEffect, useState } from "react";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import Header1 from "../components/common/Header1";
import { useUserContext } from "../hooks/useUserContext";
import { useSignup } from "../hooks/useSignup";
import axios from "axios";
import { useAuthContext } from "../hooks/useAuthContext";
import List from "../components/List";
import config from "../config";

const Createuser = () => {
  const { SERVER_ADDRESS } = config;
  const { user } = useAuthContext();
  const { signup, isLoading, error } = useSignup();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(name, email, password);
  };

  const { users, dispatchs } = useUserContext();
  useEffect(() => {
    const getreqUser = async () => {
      const res = await axios.get(`${SERVER_ADDRESS}/api/user_main/get_user`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const data = res.data;
      if (res.status) {
        dispatchs({
          type: "SET_USER",
          payload: data,
        });
      }
    };
    getreqUser();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-900 to-blue-600 p-4 flex flex-col items-center">
      <Header1 />
      <div className="bg-white shadow-2xl rounded-lg p-8 max-w-lg w-full mt-6">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
          Create User
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <FaUser className="absolute left-3 top-3 text-gray-500" />
            <input
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
              className="w-full pl-10 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Username"
              required
            />
          </div>
          <div className="relative">
            <FaEnvelope className="absolute left-3 top-3 text-gray-500" />
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="w-full pl-10 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Email Address"
              required
            />
          </div>
          <div className="relative">
            <FaLock className="absolute left-3 top-3 text-gray-500" />
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="w-full pl-10 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-3 rounded-md hover:bg-blue-700 transition-all"
            disabled={isLoading}
          >
            Create User
          </button>
        </form>
        {error && <p className="text-red-600 text-center mt-4">{error}</p>}
      </div>
      <div className="mt-6 w-full max-w-lg">
        {users && users.map((usr) => <List key={usr.email} user={usr} />)}
      </div>
    </div>
  );
};

export default Createuser;
