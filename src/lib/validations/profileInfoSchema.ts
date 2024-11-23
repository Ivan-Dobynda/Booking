import * as yup from "yup";

const profileInfoSchema = yup.object().shape({
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
  dob: yup.string().required("Date of Birth is required"),
  gender: yup.string().required("Gender is required"),
  accessibilityNeeds: yup.string().required('Accessibility Needs is required'),
  bio: yup.string()
});

export default profileInfoSchema;
