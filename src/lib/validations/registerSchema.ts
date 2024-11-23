import * as yup from "yup";
import {
  confirmPasswordValidation,
  emailValidation,
  passwordValidation,
} from "./main";

const registerSchema = yup.object().shape({
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
  email: emailValidation,
  password: passwordValidation,
  confirmPassword: confirmPasswordValidation,
});

export default registerSchema;
