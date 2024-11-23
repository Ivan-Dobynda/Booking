import * as yup from "yup";

export const emailValidation = yup
  .string()
  .email("Invalid email")
  .required("Email is required");

export const passwordValidation = yup
  .string()
  .required("Password is required")
  .min(8, "Password must be at least 8 characters");

export const confirmPasswordValidation = yup
  .string()
  .required("Confirm Password is required")
  .oneOf([yup.ref("password") as unknown as string], "Passwords must match");
