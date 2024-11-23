import * as yup from "yup";
import {emailValidation} from "@/lib/validations/main";
import AddressSchema from "@/lib/validations/AddressSchema";
import EmergencyContactSchema from "@/lib/validations/emergencyContactSchema";

const contactEditSchema = yup.object().shape({
    email: emailValidation,
    mobile: yup.string().required("Mobile Number is required"),
    address: AddressSchema,
    emergencyContact: EmergencyContactSchema.optional(),
});

export default contactEditSchema;
