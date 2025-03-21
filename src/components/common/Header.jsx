import React from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { useLogout } from "../../hooks/useLogout";
import { useAuthContext } from "../../hooks/useAuthContext";
import { FiLogOut } from "react-icons/fi";
const Header = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const handleLogout = () => {
    logout();
  };

  return (
    <div className="bg-white h-20 px-6 flex justify-between items-center border-b border-gray-200 shadow-md">
      {/* User Info & Search */}
      <div className="flex items-center space-x-6 w-full max-w-lg">
        {/* User Info */}
        {user && (
          <div className="flex flex-col">
            <span className="text-md font-semibold text-gray-800">
              Welcome, {user.name}
            </span>
            <span className="text-sm text-gray-500">{user.email}</span>
          </div>
        )}

        {/* Search Bar */}
        <div className="relative w-full">
          <HiOutlineSearch
            size={20}
            className="text-gray-400 absolute top-1/2 -translate-y-1/2 left-4"
          />
          <input
            type="text"
            placeholder="Search..."
            className="text-sm focus:outline-none h-10 w-full border border-gray-300 rounded-full pl-12 pr-4 bg-gray-100 focus:bg-white shadow-md focus:ring-2 focus:ring-blue-500 transition-all"
          />
        </div>
      </div>

      {/* Logout Button */}
      <button
        className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white font-semibold rounded-full hover:bg-red-700 transition-all duration-200 shadow-md"
        onClick={handleLogout}
      >
        <FiLogOut size={18} />
        Logout
      </button>
    </div>
  );
};

export default Header;
