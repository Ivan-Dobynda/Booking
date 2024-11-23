import * as yup from "yup";

const AddressSchema = yup.object().shape({
    country: yup.string().required("Country is required"),
    line1: yup.string().required("Line 1 is required"),
    line2: yup.string(), //.required("Line 2 is required"),
    aptSuiteFloor: yup.string().required("Apt, Suite, Floor is required"),
    city: yup.string(), //.required("City is required"),
    state: yup.string(), //.required("State is required"),
    postCode: yup.string(), //.required("PostCode is required"),
});

export default AddressSchema;
