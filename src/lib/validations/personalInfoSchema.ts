import * as yup from "yup";

const personalInfoSchema = yup.object().shape({
  passportNumber: yup.string(),
  nationalId: yup.string(),
});

export default personalInfoSchema;
