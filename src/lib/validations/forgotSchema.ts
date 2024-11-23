import * as yup from "yup";
import { emailValidation } from "./main";

const forgotSchema = yup.object().shape({
  email: emailValidation,
});

export default forgotSchema;
