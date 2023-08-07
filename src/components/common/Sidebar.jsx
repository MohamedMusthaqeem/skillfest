import React from "react";
import { FcFlashOn } from "react-icons/fc";
import {
  DASHBOARD_BOTTOM_LINKS,
  DASHBOARD_TOP_LINKS,
} from "../../lib/req/Utilities";
import { Link, useLocation } from "react-router-dom";
import classNames from "classnames";

const styles =
  "flex item-center gap-2 font-bold px-3 py-2 text-white hover:bg-yellow-500 rounded-md ";

const Sidebar = () => {
  return (
    <div className="bg-[#071952] w-60 p-3 flex flex-col text-white">
      <div className="flex items-center gap-2 px-1 py-3">
        <FcFlashOn size={25} />
        <span className="uppercase font-signature text-lg font-bold">
          Skill fest
        </span>
      </div>
      <div className="flex-1 py-8 flex flex-col gap-0.5">
        {DASHBOARD_TOP_LINKS.map((items) => (
          <SidebarLink key={items.key} items={items} />
        ))}
      </div>
      <div className="flex flex-col gap-0.5 pt-2 border-t border-white">
        {DASHBOARD_BOTTOM_LINKS.map((items) => (
          <SidebarLink key={items.key} items={items} />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;

const SidebarLink = ({ items }) => {
  const { pathname } = useLocation();
  return (
    <Link
      to={items.path}
      className={classNames(
        pathname === items.path ? "bg-yellow-500 " : "",
        styles
      )}
    >
      <span>{items.icon}</span>
      {items.name}
    </Link>
  );
};
