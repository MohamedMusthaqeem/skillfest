import React from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { useLogout } from "../../hooks/useLogout";

const Header = () => {
  const { logout } = useLogout();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="bg-white h-16 px-6 flex justify-between items-center border-b border-gray-200 shadow-sm">
      <div className="relative w-full max-w-md">
        <HiOutlineSearch
          size={20}
          className="text-gray-400 absolute top-1/2 -translate-y-1/2 left-4"
        />
        <input
          type="text"
          placeholder="Search"
          className="text-sm focus:outline-none h-10 w-full border border-gray-300 rounded-lg pl-12 pr-4 shadow-sm focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <button
        className="px-4 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-all duration-200 shadow-md"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default Header;
