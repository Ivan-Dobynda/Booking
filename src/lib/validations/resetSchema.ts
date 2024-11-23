import * as yup from "yup";
import { confirmPasswordValidation, passwordValidation } from "./main";

const resetSchema = yup.object().shape({
  password: passwordValidation,
  confirmPassword: confirmPasswordValidation,
});

export default resetSchema;
