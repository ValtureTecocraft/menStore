import React, { useEffect, useState } from "react";
import loginBg from "../assets/login-bg.jpg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth";

interface IState {
  email: string;
  password: string;
  IEmail: boolean;
  IPassword: boolean;
}

const Login: React.FC = () => {
  const [state, setState] = useState<IState>({
    email: "",
    password: "",
    IEmail: false,
    IPassword: false,
  });

  useEffect(() => {
    if (state.email.length !== 0) {
      setState({ ...state, IEmail: true });
    } else {
      setState({ ...state, IEmail: false });
    }
    if (state.password.length !== 0) {
      setState({ ...state, IPassword: true });
    } else {
      setState({ ...state, IPassword: false });
    }
  }, [state.email, state.password]);

  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const RedirectPath = location.state?.path || "/";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleFocusEmail = () => {
    setState({ ...state, IEmail: true });
  };

  const handleFocusPassword = () => {
    setState({ ...state, IPassword: true });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (state.email && state.password) {
      auth.login(state.email);
      navigate(RedirectPath, { replace: true });
    }
  };

  return (
    <>
      <div className="fixed z-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-screen overflow-hidden">
        <img className="w-screen h-screen" src={loginBg} alt="bg img Login" />
      </div>
      <div className="z-10 backdrop-blur w-full h-screen flex justify-center items-center">
        <Link
          to={"/"}
          className="fixed z-30 top-5 left-5 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent cursor-pointer text-3xl font-bold select-none"
        >
          Men's Shop
        </Link>
        <form
          onSubmit={handleSubmit}
          className="w-80 h-fit shadow-xl bg-white/10 rounded-lg px-6 py-5 gap-4 flex flex-col"
        >
          <h2 className="text-3xl text-center font-semibold">Login</h2>
          <div className="relative mt-4">
            <label
              className={`absolute duration-300 ${
                state.IEmail
                  ? "-top-5 left-1 text-sm font-medium"
                  : "top-2 left-3"
              }`}
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="w-full h-10 px-2 bg-white/20 rounded-md outline-none"
              type="email"
              id="email"
              name="email"
              onChange={handleChange}
              onFocus={handleFocusEmail}
              onBlur={() =>
                state.email.length !== 0
                  ? setState({ ...state, IEmail: true })
                  : setState({ ...state, IEmail: false })
              }
            />
          </div>
          <div className="relative mt-4">
            <label
              className={`absolute duration-300 ${
                state.IPassword
                  ? "-top-5 left-1 text-sm font-medium"
                  : "top-2 left-3"
              }`}
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="w-full h-10 px-2 bg-white/20 rounded-md outline-none"
              type="password"
              id="password"
              name="password"
              onChange={handleChange}
              onFocus={handleFocusPassword}
              onBlur={() =>
                state.email.length !== 0
                  ? setState({ ...state, IPassword: true })
                  : setState({ ...state, IPassword: false })
              }
            />
          </div>

          <button
            className="w-full h-10 mt-3 duration-300 bg-white/80 hover:bg-white/90 font-semibold rounded-md"
            type="submit"
          >
            Login
          </button>

          <p className="text-center text-sm">
            Don't have account?{" "}
            <span className="font-medium duration-300 hover:text-blue-900">
              <Link to={"/signup"}>Click Here</Link>
            </span>
          </p>
        </form>
      </div>
    </>
  );
};

export default Login;
