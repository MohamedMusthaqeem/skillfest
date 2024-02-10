import { useState } from "react";
import LoginImg from "../assets/Sign up.gif";
import {useLogin} from '../hooks/useLogin'
const Mainpage = () => {
  const [admin, setAdmin] = useState("underline ");
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [current,setCurrent]=useState({
    current:"user_main",
    to:"layout"
  });
  const {error,isLoading,login} =useLogin();
  const handleSubmit= async(e)=>{
     e.preventDefault();
     await login(current,email,password)

  }

  return (
    <div className="min-h-screen flex flex-col justify-center bg-Primary ">
      <div className="text-center text-3xl  text-white font-semibold font-Poppins tracking-widest">
        SKILL FEST
      </div>
      <div className="flex flex-col md:flex-row items-center md:justify-evenly md:px-24 m-2 ">
        <div className="h-full">
          <img src={LoginImg} alt="" className="hidden lg:block" />
        </div>
        <div className="w-full max-w-md bg-blend-saturation rounded-lg top-0 border border-white p-5">
          <div className="border-b border-white ">
            <h1 className=" text-center tracking-widest text-2xl text-white font-semibold uppercase">
              Login
            </h1>
          </div>
          <div className="flex  w-full justify-evenly ">
            <div
              className={`w-1/2 flex py-4 cursor-pointer text-white  items-center justify-center font-semibold ${admin}`}
              onClick={() => {
                setAdmin("underline");
                setUser("");
                setCurrent({
                  current:"user_main",
                  to:"layout"
                })
              }}
            >
              USER
            </div>
            <div
              className={`w-1/2 flex py-4 cursor-pointer items-center  text-white justify-center font-semibold  ${user}`}
              onClick={() => {
                setUser("underline");
                setAdmin("");
                setCurrent({
                  current:"admin",
                  to:"createuser"
                })
              }}
            >
              ADMIN
            </div>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="p-3"></div>
            <div className="px-3 py-2">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-white"
              >
                Email
              </label>
              <input
                type="email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                className="mt-1 p-2 w-full border rounded-md outline-none text-black"
                placeholder="sample@example.com"
                required
              />
            </div>

            <div className="mb-4 px-3">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-white"
              >
                Password
              </label>
              <input
                type="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                className="mt-1 p-2 w-full border rounded-md outline-none"
                placeholder="********"
                required
              />
            </div>
            <div className="py-2 p-3">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full border border-white text-white font-semibold py-2 rounded-md duration-150"
              >
                Login
              </button>
            </div>
          </form>
          {error && (
              <div
                className="text-red-600"
              >
                {error}
              </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default Mainpage;
