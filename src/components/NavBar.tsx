import React from "react";
import { NavLink } from "react-router-dom";

const NavBar: React.FC = () => {
  return (
    <nav className="navLink w-full flex justify-center items-center bg-gray-300 shadow-lg">
      <ul className="max-w-7xl px-3 py-2 w-full gap-6 flex items-center justify-between">
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
        <li className="text-blue-500">
          <NavLink to="/mutated-query">Mutating</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
