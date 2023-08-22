import React from "react";
import { NavLink } from "react-router-dom";

const NavBar: React.FC = () => {
  return (
    <nav className="fixed navLink w-full flex justify-center items-center bg-gray-300 shadow-md drop-shadow-md">
      <ul className="max-w-7xl px-3 py-2 w-full gap-6 flex items-center justify-between">
        <li className="text-blue-500">
          <NavLink to="/">Home</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
