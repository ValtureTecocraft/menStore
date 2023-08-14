import React from "react";
import { Link } from "react-router-dom";

const NavBar: React.FC = () => {
  return (
    <nav className="w-full flex justify-center items-center">
      <ul className="max-w-7xl w-full h-8 gap-6 flex items-center ">
        <li className="text-blue-500">
          <Link to="/">Home</Link>
        </li>
        <li className="text-blue-500">
          <Link to="/super-heroes">Traditional Super Heroes</Link>
        </li>
        <li className="text-blue-500">
          <Link to="/rq-super-heroes">RQ Super Heroes</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
