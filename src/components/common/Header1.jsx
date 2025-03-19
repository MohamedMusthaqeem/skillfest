import React from "react";
import { useLogout } from "../../hooks/useLogout";

const Header1 = () => {
  const { logout } = useLogout();

  return (
    <div className="bg-gradient-to-r from-indigo-700 shadow-md py-4 px-6 flex justify-between items-center text-white">
      <h1 className="text-lg font-semibold">Welcome, AdminCSE</h1>
      <button
        onClick={logout}
        className="bg-red-500 hover:bg-red-700 transition-all px-4 py-2 rounded-lg font-semibold shadow-md"
      >
        Logout
      </button>
    </div>
  );
};

export default Header1;
