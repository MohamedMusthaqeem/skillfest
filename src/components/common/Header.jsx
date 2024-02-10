import React from "react";
import { HiOutlineSearch } from "react-icons/hi";
import {useLogout} from '../../hooks/useLogout'
const Header = () => {
  const {logout}=useLogout();
  const handleLogout=()=>{
    logout();
  }
  return (
    <div className="bg-white h-[64px] min-h-[64px] px-4 flex justify-between items-center border-b border-gray-200">
      <div className="relative">
        <HiOutlineSearch
          size={20}
          className="text-gray-400 absolute top-1/2 -translate-y-1/2 left-3"
        />
        <input
          type="text"
          placeholder="Search"
          className="text-sm focus:outline-none active:outline-none h-10 w-[24rem] border border-gray-300 rounded-md pl-11 pr-4"
        />
      </div>
        <div>
          <button className="p-1 bg-red-600 rounded-lg hover:bg-red-800 duration-150 " onClick={handleLogout} >Logout</button>
        </div>
      </div>
  );
};

export default Header;
