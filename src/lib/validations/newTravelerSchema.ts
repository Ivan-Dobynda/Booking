import * as yup from "yup"
import { emailValidation } from "./main"

const newTravelerSchema = yup.object().shape({
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
  email: emailValidation,
  mobile: yup.string().required("Mobile Number is required"),
  dob: yup.string().required("Date of Birth is required"),
  gender: yup.string().required("Gender is required"),
  emergencyContact: yup.object().shape({
    firstName: yup.string().required("First Name is required"),
    lastName: yup.string().required("Last Name is required"),
    mobile: yup.string().required("Mobile Number is required"),
  }),
})

export default newTravelerSchema
