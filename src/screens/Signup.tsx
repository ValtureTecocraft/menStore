// using React-hook-form & yup

import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import loginBg from "../assets/login-bg.jpg";
import { Link } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { signupSchema } from "../schemas";
import { useForm } from "react-hook-form";
// import { DevTool } from "@hookform/devtools";
// import dayjs from "dayjs";
// import * as isLeapYear from "dayjs/plugin/isLeapYear"; // import plugin
import "dayjs/locale/zh-cn"; // import locale

interface IState {
  errName: boolean;
  errEmail: boolean;
  errPassword: boolean;
  IName: boolean;
  IEmail: boolean;
  IPassword: boolean;
}

interface FormValues {
  name: string;
  email: string;
  password: string;
}

const Signup: React.FC = () => {
  const [state, setState] = useState<IState>({
    errName: false,
    errEmail: false,
    errPassword: false,
    IName: false,
    IEmail: false,
    IPassword: false,
  });

  const form = useForm<FormValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    resolver: yupResolver(signupSchema),
  });
  const { register, control, handleSubmit, formState, watch } = form;
  const { errors } = formState;

  const onSubmit = (data: FormValues) => {
    console.log("Form Submited:", data);
  };

  // console.log(dayjs().format("DD/MM/YYYY"));

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

  useEffect(() => {
    setState((prevState) => ({
      ...prevState,
      errName: !!errors.name?.message,
      errEmail: !!errors.email?.message,
      errPassword: !!errors.password?.message,
      IName: !!watch("name"),
      IEmail: !!watch("email"),
      IPassword: !!watch("password"),
    }));
  }, [watch("name"), watch("email"), watch("password"), errors]);

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
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="w-80 h-fit shadow-xl bg-white/10 border border-white/10 rounded-lg px-6 py-5 gap-4 flex flex-col"
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
              className={`w-full h-10 px-2 border ${
                state.errName
                  ? "border-red-400 bg-red-500/20"
                  : "border-white/20 bg-white/20"
              } rounded-md outline-none`}
              type="text"
              id="name"
              {...register("name", {
                // required: {
                //   value: true,
                //   message: "Name is required",
                // },
              })}
              // name={name}
              // ref={ref}
              // onChange={onChange}
              // onBlur={onBlur}
            />
            <p className="error">{errors.name?.message}</p>
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
              className={`w-full h-10 px-2 border ${
                state.errEmail
                  ? "border-red-400 bg-red-500/20"
                  : "border-white/20 bg-white/20"
              } rounded-md outline-none`}
              type="email"
              id="email"
              {...register("email", {
                // required: {
                //   value: true,
                //   message: "Email is required.",
                // },
                pattern: {
                  value:
                    /^(?:(?!.*?[.]{2})[a-zA-Z0-9](?:[a-zA-Z0-9.+!%-]{1,64}|)|\"[a-zA-Z0-9.+!% -]{1,64}\")@[a-zA-Z0-9][a-zA-Z0-9.-]+(.[a-z]{2,}|.[0-9]{1,})$/,
                  message: "Invalid email.",
                },
              })}
              // name={name}
              // ref={ref}
              // onChange={onChange}
              // onBlur={onBlur}
            />
            <p className="error">{errors.email?.message}</p>
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
              className={`w-full h-10 px-2 border ${
                state.errPassword
                  ? "border-red-400 bg-red-500/20"
                  : "border-white/20 bg-white/20"
              } rounded-md outline-none`}
              type="password"
              id="password"
              {...register("password", {
                // required: {
                //   value: true,
                //   message: "Password is required.",
                // },
              })}
              // name={name}
              // ref={ref}
              // onChange={onChange}
              // onBlur={onBlur}
            />
            <p className="error">{errors.password?.message}</p>
          </div>

          <Button
            sx={{ opacity: 0.9 }}
            variant="contained"
            color="success"
            type="submit"
          >
            SignUp
          </Button>

          {/* <button
            className="w-full h-10 mt-3 duration-300 bg-white/80 hover:bg-white/90 font-semibold rounded-md"
            type="submit"
          >
            SignUp
          </button> */}

          <p className="text-center text-sm">
            Already have account?{" "}
            <span className="font-medium duration-300 hover:text-blue-900">
              <Link to={"/login"}>Click Here</Link>
            </span>
          </p>
        </form>
      </div>
      {/* <DevTool control={control} /> */}
    </>
  );
};

export default Signup;
