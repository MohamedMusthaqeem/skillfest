import React from "react";
import { FcFlashOn } from "react-icons/fc";
import {
  DASHBOARD_BOTTOM_LINKS,
  DASHBOARD_TOP_LINKS,
} from "../../lib/req/Utilities";
import { Link, useLocation } from "react-router-dom";
import classNames from "classnames";

const Sidebar = () => {
  return (
    <div className="bg-gradient-to-b from-blue-900 to-blue-700 w-64 min-h-screen p-5 flex flex-col text-white shadow-lg">
      <div className="flex items-center gap-3 px-2 py-4 border-b border-blue-400">
        <FcFlashOn size={30} />
        <span className="uppercase font-bold text-xl tracking-wide">
          Skill Fest
        </span>
      </div>
      <nav className="flex-1 mt-6 space-y-2">
        {DASHBOARD_TOP_LINKS.map((item) => (
          <SidebarLink key={item.key} item={item} />
        ))}
      </nav>
      <div className="mt-auto border-t border-blue-400 pt-4">
        {DASHBOARD_BOTTOM_LINKS.map((item) => (
          <SidebarLink key={item.key} item={item} />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;

const SidebarLink = ({ item }) => {
  const { pathname } = useLocation();
  return (
    <Link
      to={item.path}
      className={classNames(
        "flex items-center gap-3 px-4 py-3 rounded-lg transition-all",
        pathname === item.path
          ? "bg-yellow-500 text-blue-900 shadow-md"
          : "hover:bg-blue-600 hover:text-yellow-400"
      )}
    >
      <span className="text-lg">{item.icon}</span>
      <span className="font-medium text-lg">{item.name}</span>
    </Link>
  );
};
