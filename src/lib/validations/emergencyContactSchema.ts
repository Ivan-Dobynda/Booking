import * as yup from "yup";

const EmergencyContactSchema = yup.object().shape({
    firstName: yup.string().nullable().transform(value => value === null ? undefined : value),
        lastName: yup.string().nullable().transform(value => value === null ? undefined : value),
        mobile: yup.string().nullable().transform(value => value === null ? undefined : value),
    
});

export default EmergencyContactSchema;
