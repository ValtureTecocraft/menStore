import React, { useEffect, useState } from "react";
import loginBg from "../assets/login-bg.jpg";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

import { auth, googleProvider } from "../config/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  signInWithEmailAndPassword,
} from "firebase/auth";

interface IState {
  IEmail: boolean;
  IPassword: boolean;
  isLogedIn: boolean;
}

const loginSchema = Yup.object({
  email: Yup.string().email().required("Please enter your email."),
  password: Yup.string().min(6).required("Please enter your password."),
});

/*  ************ RRTURN ************** */
export const SignIn: React.FC = () => {
  const [state, setState] = useState<IState>({
    IEmail: false,
    IPassword: false,
    isLogedIn: false,
  });
  const navigate = useNavigate();

  const signIn = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setState({ ...state, isLogedIn: true });
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setState({ ...state, isLogedIn: true });
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  const signinWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error(error);
    }
  };

  const logOut = async () => {
    try {
      await signOut(auth);
      setState({ ...state, isLogedIn: false });
    } catch (error) {
      console.error(error);
    }
  };

  // console.log(auth?.currentUser?.email);

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: loginSchema,
      onSubmit: async (values, actions) => {
        // signIn(values.email, values.password);
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
    if (auth?.currentUser?.email) {
      setState({ ...state, isLogedIn: true });
    } else {
      setState({ ...state, isLogedIn: false });
    }
  }, []);

  return (
    <>
      <div className="fixed z-0 top-1/2 left-1/2 scale-110 bg-[#676675] -translate-x-1/2 -translate-y-1/2 w-full h-screen overflow-hidden flex justify-center items-center">
        <img
          className="min-w-[1120px] w-screen h-screen"
          src={loginBg}
          alt="bg img Login"
        />
      </div>
      <div className="z-10 w-full h-screen flex justify-center items-center">
        <Link
          to={"/"}
          className="fixed z-30 top-5 left-5 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent cursor-pointer text-3xl font-bold select-none"
        >
          Men's Shop
        </Link>
        <form
          onSubmit={handleSubmit}
          className="w-80 h-fit shadow-xl backdrop-blur-[4px] bg-white/10 border border-white/10 rounded-lg px-6 py-5 gap-4 flex flex-col"
        >
          <h2 className="text-3xl text-center font-semibold uppercase">
            Login
          </h2>
          <div className="relative mt-8">
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

          {state.isLogedIn ? (
            <button
              onClick={logOut}
              className="w-full h-10 mt-3 duration-300 text-white bg-black/80 hover:bg-black/90 font-semibold rounded-md"
              type="button"
            >
              Logout
            </button>
          ) : (
            <>
              <button
                onClick={() => signIn(values.email, values.password)}
                className="w-full h-10 mt-3 duration-300 text-white bg-green-500/80 hover:bg-green-500/90 font-semibold rounded-md"
                type="button"
              >
                Login
              </button>

              <button
                onClick={() => signUp(values.email, values.password)}
                className="w-full h-10 mt-3 duration-300 bg-white/80 hover:bg-white/90 font-semibold rounded-md"
                type="button"
              >
                Sign Up
              </button>

              <button
                onClick={signinWithGoogle}
                className="w-full h-10 mt-3 duration-300 text-white bg-black/80 hover:bg-black/90 font-semibold rounded-md"
                type="button"
              >
                SignIn with Google
              </button>
            </>
          )}

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