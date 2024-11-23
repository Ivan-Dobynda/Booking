import * as yup from "yup";

const selectCountryAndLeagueSchema = yup.object().shape({
    countryId: yup.string().required('Region is required'),
    languageId: yup.string().required('Language is required'),
    currencyId: yup.string().required('Currency is required'),
});

export default selectCountryAndLeagueSchema;
