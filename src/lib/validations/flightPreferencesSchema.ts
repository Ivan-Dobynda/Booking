import * as yup from "yup";

const flightPreferencesSchema = yup.object().shape({
    seatPreferences: yup.string().optional(),
    mealPreferences: yup.string().optional(),
    connectionPreferences: yup.string().optional(),
    notificationPreferences: yup.string().optional(),
    aircraftPreferences: yup.string().optional(),
    loyaltyPreferences: yup.string().optional(),
});

export default flightPreferencesSchema;
