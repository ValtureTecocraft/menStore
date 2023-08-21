import React from "react";
import { NavLink } from "react-router-dom";

const NavBar: React.FC = () => {
  return (
    <nav className="navLink w-full flex justify-center items-center bg-gray-300 shadow-lg">
      <ul className="max-w-7xl px-3 w-full h-8 gap-6 flex items-center">
        <li className="text-blue-500">
          <NavLink to="/">Home</NavLink>
        </li>
        <li className="text-blue-500">
          <NavLink to="/super-heroes">Traditional Super Heroes</NavLink>
        </li>
        <li className="text-blue-500">
          <NavLink to="/rq-super-heroes">RQ Super Heroes</NavLink>
        </li>
        <li className="text-blue-500">
          <NavLink to="/parallel-query">Parallel</NavLink>
        </li>
        <li className="text-blue-500">
          <NavLink to="/dynamic-parallel-query">Dynamic Parallel</NavLink>
        </li>
        <li className="text-blue-500">
          <NavLink to="/paginated">Paginated</NavLink>
        </li>
        <li className="text-blue-500">
          <NavLink to="/infinite-query">Infinite</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
