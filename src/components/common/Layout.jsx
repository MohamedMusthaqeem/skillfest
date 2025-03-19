import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
const Layout = () => {
  return (
    <div className="flex flex-row bg-[#EEEDED] h-screen w-screen ">
      <Sidebar />
      <div className="flex-1 h-screen flex flex-col">
        <Header />
        <div className="max-h-screen overflow-auto overflow-x-hidden">
          {<Outlet />}
        </div>
      </div>
    </div>
  );
};

export default Layout;
