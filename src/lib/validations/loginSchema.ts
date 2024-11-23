import * as yup from "yup";
import { emailValidation, passwordValidation } from "./main";

const loginSchema = yup.object().shape({
  email: emailValidation,
  password: passwordValidation,
});

export default loginSchema;
