import { useState } from "react";
import { FaUser, FaUserShield, FaEnvelope, FaLock } from "react-icons/fa";
import LoginImg from "../assets/loginimage.png";
import { useLogin } from "../hooks/useLogin";

const Mainpage = () => {
  const [admin, setAdmin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { error, isLoading, login } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(
      {
        current: admin ? "admin" : "user_main",
        to: admin ? "createuser" : "layout",
      },
      email,
      password
    );
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-blue-900 to-blue-600 p-4">
      <h1 className="text-white text-4xl font-bold mb-6 tracking-wide">
        SKILL FEST
      </h1>
      <div className="flex flex-col md:flex-row items-center bg-white shadow-2xl rounded-lg overflow-hidden max-w-4xl w-full">
        <div className="hidden md:flex flex-1 bg-gray-200">
          <img src={LoginImg} alt="Login" className="object-cover w-full" />
        </div>
        <div className="flex-1 p-8">
          <h2 className="text-center text-3xl font-bold text-gray-800">
            Login
          </h2>
          <div className="flex justify-center mt-4 mb-6">
            <button
              className={`px-6 py-2 rounded-l-md font-semibold transition-colors ${
                !admin ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"
              }`}
              onClick={() => setAdmin(false)}
            >
              <FaUser className="inline mr-2" /> User
            </button>
            <button
              className={`px-6 py-2 rounded-r-md font-semibold transition-colors ${
                admin ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"
              }`}
              onClick={() => setAdmin(true)}
            >
              <FaUserShield className="inline mr-2" /> Admin
            </button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <FaEnvelope className="absolute left-3 top-3 text-gray-500" />
              <input
                type="email"
                className="w-full pl-10 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Email Address"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="relative">
              <FaLock className="absolute left-3 top-3 text-gray-500" />
              <input
                type="password"
                className="w-full pl-10 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 text-white font-semibold py-3 rounded-md hover:bg-blue-700 transition-all"
            >
              Login
            </button>
          </form>
          {error && <p className="text-red-600 text-center mt-4">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default Mainpage;
