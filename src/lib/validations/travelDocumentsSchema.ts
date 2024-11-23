import * as yup from "yup";

const travelDocumentsSchema = yup.object().shape({
    country: yup.string(),
    passportNumber: yup.string(),
    expiryDate: yup.string(),
});

export default travelDocumentsSchema;
