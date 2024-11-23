import React, {useEffect, useState} from 'react';
import {FiAlertTriangle} from "react-icons/fi";
import SelectInput from "@/Component/Form/SelectInput";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {toast} from "react-toastify";
import {useRouter} from "next/navigation";
import Button from "@/Component/Button/Button";
import selectCountryAndLeagueSchema from "@/lib/validations/selectCountryAndLeagueSchema";
import {useGlobalContext} from "@/context/GlobalContext";
import {updateProfile} from "@/lib/services/profileService";

interface SelectCountryAndLanguageProps {
    fnAfterSubmit: () => void;
}

const SelectCountryAndLanguage = ({fnAfterSubmit}: SelectCountryAndLanguageProps) => {
    const {countries} = useGlobalContext();
    const {user} = useGlobalContext();
    const [selectedRegion, setSelectedRegion] = useState<typeof countries[0] | null>();
    const router = useRouter();

    const defaultValues = {
        countryId: user?.countryId as string,
        languageId: user?.languageId as string,
        currencyId: user?.currencyId as string,
    }

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: {errors, isSubmitting},
    } = useForm({defaultValues, resolver: yupResolver(selectCountryAndLeagueSchema)})


    const onSubmit = async (data: typeof defaultValues) => {
        const {countryId, languageId, currencyId} = data;

        const res = await updateProfile({countryId: countryId, languageId, currencyId})

        console.log(data, 'this is data')

        if (res.data) {
            fnAfterSubmit();
            router.refresh()
        }

        if (res.error) {
            toast.error(res.error)
            return
        }
        toast.success(res.message)
    }

    useEffect(() => {
        if (countries) {
            const currentRegion = countries.find(val => val.id === user?.countryId);
            setSelectedRegion(currentRegion as typeof selectedRegion);
            setValue('countryId', currentRegion?.id ?? '');
        }
    }, [user, countries]);

    useEffect(() => {
        const currentCurrency = selectedRegion?.currencies?.find(val => val.id === user?.currencyId);
        const currentLanguage = selectedRegion?.languages?.find(val => val.id === user?.languageId);

        setValue('currencyId', currentCurrency?.id ?? '');
        setValue('languageId', currentLanguage?.id ?? '');
    }, [selectedRegion]);

    const countryId = watch('countryId')
    useEffect(() => {
        const currentRegion = countries.find(val => val.id === countryId);
        setSelectedRegion(currentRegion as typeof selectedRegion);
    }, [countryId]);

    const activeCountries = countries?.filter(value => value?.isActive );

    return (
        <section className='bg-white max-w-3xl rounded-2xl card-shadow p-4 sm:p-5 lg:p-6'>
            <header className='border-b-2 mb-3.5 sm:mb-4 lg:mb-5'>
                <h1
                    className='text-lg lg:text-xl lg:text-[22px] font-semibold text-brand-neutral-800 inline-block pb-3.5 border-brand-blue'
                    style={{lineHeight: 1}}
                >
                    Display settings
                </h1>
            </header>
            <h2 className={`flex gap-4 mb-4`}>
                <FiAlertTriangle className={'text-2xl'}/>
                <p className={`font-bold `}>
                    Changing your country could change your rewards programme
                </p>
            </h2>
            <p>
                One Key™ is a new rewards programme for the US only for now. To stay with your current rewards programme
                (where applicable), keep your country the same.
            </p>
            <form
                onSubmit={handleSubmit(onSubmit)}
                noValidate className='mt-8 grid gap-4'>
                <SelectInput label='Country' id='countryId'
                             error={errors.countryId?.message}
                             {...register("countryId")}
                >
                    <option value={''}>Select</option>
                    {activeCountries.map((value) => (
                        <option key={value?.id} value={value?.id}>{value?.country}</option>
                    ))}
                </SelectInput>
                <SelectInput label='Language' id='language'
                             error={errors.languageId?.message}
                             {...register("languageId")}
                >
                    <option value={''}>Select</option>
                    {selectedRegion?.languages?.map((value, index) => (
                        <option key={index} value={value?.id}>{value?.name}</option>
                    ))}
                </SelectInput>
                <SelectInput label='Currency' id='currency'
                             error={errors.currencyId?.message}
                             {...register("currencyId")}
                >
                    <option value={''}>Select</option>
                    {selectedRegion?.currencies?.map((value, index) => (
                        <option key={index} value={value?.id}>{value.name}</option>
                    ))}
                </SelectInput>
                <div className='col-span-full flex justify-end pt-1 lg:pt-2'>
                    <Button disabled={isSubmitting}>Save Changes</Button>
                </div>
            </form>
        </section>
    );
};

SelectCountryAndLanguage.displayName = 'SelectCountryAndLanguage';

export default SelectCountryAndLanguage;
