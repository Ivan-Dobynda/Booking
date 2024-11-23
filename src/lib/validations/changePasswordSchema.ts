import * as yup from "yup";
import { passwordValidation } from "./main";

const changePasswordSchema = yup.object().shape({
  currentPassword: yup.string().required("Password is required"),
  newPassword: passwordValidation,
  enableTwoFA: yup.boolean() 
});

export default changePasswordSchema;
