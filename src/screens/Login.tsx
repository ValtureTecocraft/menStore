// using formik and yup

import React, { useEffect, useState } from "react";
import loginBg from "../assets/login-bg.jpg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth";
import { useFormik } from "formik";
import { loginSchema } from "../schemas";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { fetchUsers, getUser } from "../store/features/authSlice";

interface IState {
  IEmail: boolean;
  IPassword: boolean;
}

const Login: React.FC = () => {
  const [state, setState] = useState<IState>({
    IEmail: false,
    IPassword: false,
  });

  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const RedirectPath = location.state?.path || "/";

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: loginSchema,
      onSubmit: async (values, actions) => {
        console.log(values);
        debugger;
        const user = await dispatch(getUser(values));
        console.log(user);
        debugger;
        if (user.payload.length !== 0) {
          console.log("you are logged in.");
          auth.login(values.email);
          localStorage.setItem("user", user.payload[0].email);
          navigate(RedirectPath, { replace: true });
        } else {
          console.log("user.error.message");
        }
        actions.resetForm();
      },
    });

  useEffect(() => {
    setState((prevState) => ({
      ...prevState,
      IEmail: values.email.length !== 0,
      IPassword: values.password.length !== 0,
    }));
  }, [values.email, values.password]);

  useEffect(() => {
    const getData = async () => {
      const data = await dispatch(fetchUsers());
      // console.log(data.payload);
      return data.payload;
    };
    getData();
  }, []);

  return (
    <>
      <div className="fixed z-0 top-1/2 left-1/2 bg-[#676675] -translate-x-1/2 -translate-y-1/2 w-full h-screen overflow-hidden flex justify-center items-center">
        <img
          className="min-w-[1120px] w-screen h-screen"
          src={loginBg}
          alt="bg img Login"
        />
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
          className="w-80 h-fit shadow-xl bg-white/10 border border-white/10 rounded-lg px-6 py-5 gap-4 flex flex-col"
        >
          <div></div>
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
              className="w-full h-10 px-2 bg-white/20 border border-white/20 rounded-md outline-none"
              type="email"
              id="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <div className="h-5">
              {errors.email && touched.email ? (
                <p className="errorMsg pl-1">{errors.email}</p>
              ) : null}
            </div>
          </div>
          <div className="relative">
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
              className="w-full h-10 px-2 bg-white/20 border border-white/20 rounded-md outline-none"
              type="password"
              id="password"
              name="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <div className="h-5">
              {errors.password && touched.password ? (
                <p className="errorMsg pl-1">{errors.password}</p>
              ) : null}
            </div>
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
