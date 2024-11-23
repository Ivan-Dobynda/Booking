import * as yup from "yup";
import EmergencyContactSchema from "@/lib/validations/emergencyContactSchema";

const phoneNumberSchema = yup.string().matches(/^\+?\d+$/, "Phone number must be valid").required();

const additionalTravelerEditSchema = yup.object().shape({
    firstName: yup.string().required("First name is required"),
    lastName: yup.string().required("Last name is required"),
    gender: yup.string().required("Gender is required"),
    dob: yup.string().required("Date of Birth is required"),
    mobile: phoneNumberSchema,
    emergencyContact: EmergencyContactSchema.optional()
});

export default additionalTravelerEditSchema;
