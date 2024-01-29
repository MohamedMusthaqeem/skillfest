import React from "react";
import menuBar from "../assets/menu.png";
import { Link } from "react-router-dom";

const Deptlisting = ({ listing }) => {
  return (
    <>
      <Link to="Layout" className="bg-[#F0DE36] sm:h-fit md:h-screen  ">
        <nav
          name="navbar"
          className="flex  justify-between p-3 bg-[#071952] sticky  top-0 text-white"
        >
          <ul>
            <li>SKILLFEST</li>
          </ul>
          <img src={menuBar} alt="" className="md:hidden " />
        </nav>
        <h1 className="mx-2 my-4 uppercase text-3xl font-extrabold ">
          Departments
        </h1>
        <div className="grid grid-cols-2  gap-y-2 md:grid md:grid-cols-3  md:gap-x-2 md:gap-y-4  ">
          {listing.map((list) => (
            <div
              key={list.id}
              className=" mx-3 md:mx-8 px-2 py-14 text-2xl cursor-pointer font-bold uppercase bg-[#FAF3F0] rounded-xl hover:shadow-md hover:shadow-blue-950 flex items-center justify-center "
            >
              <div>{list.name}</div>
            </div>
          ))}
        </div>
      </Link>
    </>
  );
};

export default Deptlisting;
