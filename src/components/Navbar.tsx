import React, { useState } from "react";
import { BiSearchAlt } from "react-icons/bi";
import { AiFillHeart, AiOutlineClose } from "react-icons/ai";
import { MdShoppingCart } from "react-icons/md";
import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";

interface IState {
  toggle: boolean;
  search: string;
}

const Navbar: React.FC = () => {
  const [state, setState] = useState<IState>({
    toggle: false,
    search: "",
  });

  //   const navigate = useNavigate();

  const handleSearchClick = () => {
    setState({
      ...state,
      toggle: !state.toggle,
      search: "",
    });
  };

  return (
    <div className="fixed w-full flex bg-white justify-center shadow-lg items-center">
      <div className="relative max-w-7xl w-full py-3 px-5 flex justify-between items-center">
        <div
          className={`w-fit transition-transform duration-300 flex justify-center items-center border-2 rounded ${
            state.toggle ? "border-gray-600" : "border-transparent"
          }`}
        >
          <input
            className={`duration-300 transition-[width] outline-none ${
              state.toggle ? "w-40 px-2" : "w-0"
            }`}
            placeholder="Search ..."
            type="text"
            name="search"
            value={state.search}
            onChange={(e) => setState({ ...state, search: e.target.value })}
          />
          <button onClick={handleSearchClick} type="button">
            {state.toggle ? (
              <AiOutlineClose
                // onClick={() => setState({ ...state, search: "" })}
                className="text-xl text-gray-700"
              />
            ) : (
              <BiSearchAlt className="text-2xl text-gray-500" />
            )}
          </button>
        </div>

        <Link
          to={"/"}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer text-3xl font-bold select-none"
        >
          Men's Shop
        </Link>

        <div className="gap-8 text-2xl flex justify-center items-center">
          <Link
            to={"/login"}
            className=" w-24 h-10 duration-300 text-gray-100 ease-in transition-all flex justify-center items-center pb-1 rounded hover:rounded-full hover:bg-gray-500 bg-gray-400"
            type="button"
          >
            Login
          </Link>
          <AiFillHeart />
          <div>
            <MdShoppingCart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
