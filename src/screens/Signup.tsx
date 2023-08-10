// using React-hook-form & yup

import React, { useEffect, useState } from "react";
import loginBg from "../assets/login-bg.jpg";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { signupSchema } from "../schemas";
import { useForm } from "react-hook-form";

interface IState {
  // name: string;
  // email: string;
  // password: string;
  IName: boolean;
  IEmail: boolean;
  IPassword: boolean;
}

const Signup: React.FC = () => {
  const [state, setState] = useState<IState>({
    // name: "",
    // email: "",
    // password: "",
    IName: false,
    IEmail: false,
    IPassword: false,
  });

  const form = useForm();
  const { register } = form;
  // const {name, ref, onBlur, onChange} = register('name')

  // const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
  //   useFormik({
  //     initialValues: {
  //       name: "",
  //       email: "",
  //       password: "",
  //     },
  //     validationSchema: signupSchema,
  //     onSubmit: (values, actions) => {
  //       console.log(values);
  //       actions.resetForm();
  //     },
  //   });

  // console.log(errors);

  // useEffect(() => {
  //   setState((prevState) => ({
  //     ...prevState,
  //     IName: values.name.length !== 0,
  //     IEmail: values.email.length !== 0,
  //     IPassword: values.password.length !== 0,
  //   }));
  // }, [values.name, values.email, values.password]);

  return (
    <>
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-screen overflow-hidden">
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
          className="w-80 h-fit bg-white/10 shadow-xl rounded-lg px-6 py-5 gap-4 flex flex-col"
        >
          <h2 className="text-3xl text-center font-semibold">SignUp</h2>
          <div className="relative mt-4">
            <label
              className={`absolute duration-300 ${
                state.IName
                  ? "-top-5 left-1 text-sm font-medium"
                  : "top-2 left-3"
              }`}
              htmlFor="name"
            >
              Name
            </label>
            <input
              className="w-full h-10 px-2 bg-white/20 rounded-md outline-none"
              type="text"
              id="name"
              {...register("name")}
              // name={name}
              // ref={ref}
              // onChange={onChange}
              // onBlur={onBlur}
            />
          </div>
          <div className="relative mt-2">
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
              {...register("email")}
              // name={name}
              // ref={ref}
              // onChange={onChange}
              // onBlur={onBlur}
            />
            {errors.email && touched.email ? <p>{errors.email}</p> : null}
          </div>
          <div className="relative mt-2">
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
              {...register("password")}
              // name={name}
              // ref={ref}
              // onChange={onChange}
              // onBlur={onBlur}
            />
          </div>

          <button
            className="w-full h-10 mt-3 duration-300 bg-white/80 hover:bg-white/90 font-semibold rounded-md"
            type="submit"
          >
            SignUp
          </button>

          <p className="text-center text-sm">
            Already have account?{" "}
            <span className="font-medium duration-300 hover:text-blue-900">
              <Link to={"/login"}>Click Here</Link>
            </span>
          </p>
        </form>
      </div>
    </>
  );
};

export default Signup;
