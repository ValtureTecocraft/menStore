import * as Yup from "yup";

export const loginSchema = Yup.object({
  email: Yup.string().email().required("Please enter your email."),
  password: Yup.string().min(6).required("Please enter your password."),
});

export const signupSchema = Yup.object({
  name: Yup.string().min(2).max(25).required("Yup! Please enter your name."),
  email: Yup.string().email().required("Yup! Please enter your email."),
  password: Yup.string().min(6).required("Yup! Please enter your password."),
  //   confirmPassword: Yup.string()
  //     .oneOf([Yup.ref("password"), undefined], "Passwords must match.")
  //     .required("Please confirm your password.")
  //     .default(undefined),
});
