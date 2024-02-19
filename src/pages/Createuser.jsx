import React, { useEffect, useState } from "react";
import Header1 from "../components/common/Header1";
import { useUserContext } from "../hooks/useUserContext";
import { useSignup } from "../hooks/useSignup";
import axios from "axios";
import {useAuthContext} from '../hooks/useAuthContext'
import List from "../components/List";

const Createuser = () => {
  const {user}=useAuthContext();
  const { signup, isLoading, error } = useSignup();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    signup(name, email, password);
  };
  //
  const { users, dispatchs } = useUserContext();
  useEffect(() => {
    const getreqUser = async () => {
      const res = await axios.get(
        "http://localhost:5000/api/user_main/get_user",
        {headers:{
          "Authorization":`Bearer ${user.token}`
        }
      }
      );
      const data = res.data;
      if (res.status) {
        console.log(data);
        dispatchs({
          type: "SET_USER",
          payload: data,
        });
      }
    };
    getreqUser();
  }, []);
  return (
    <div>
      <div>
        <Header1 />
      </div>
      <div>
        <form action="" className="w-1/4 m-5" onSubmit={handleSubmit}>
          <div>
            <h1 className="font-poppins text-2xl font-semibold py-3">
              Create User
            </h1>
          </div>
          <div className="mb-4 px-3">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-800"
            >
              Username
            </label>
            <input
              type="text"
              onChange={(e) => {
                setName(e.target.value);
              }}
              value={name}
              className="mt-1 p-2 w-full border rounded-md outline-none"
              placeholder="********"
              required
            />
          </div>
          <div className="mb-4 px-3">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-800"
            >
              User_Email
            </label>
            <input
              type="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              value={email}
              className="mt-1 p-2 w-full border rounded-md outline-none"
              placeholder="********"
              required
            />
          </div>
          <div className="mb-4 px-3">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-800"
            >
              Password
            </label>
            <input
              type="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              value={password}
              className="mt-1 p-2 w-full border rounded-md outline-none"
              placeholder="********"
              required
            />
          </div>
          <div className="flex justify-center">
            <button
              className="p-2 bg-Primary text-white rounded-2xl text-center duration-200 hover:scale-105 "
              disabled={isLoading}
            >
              Create User
            </button>
          </div>
        </form>
        {error && (
          <div className="text-red-600">
            <h1>{error}</h1>
          </div>
        )}
        <div >
          {users && users.map((usr) => <List key={usr.email} user={usr} />)}
        </div>
      </div>
    </div>
  );
};

export default Createuser;
