import React, {useState} from 'react';
import SelectInput from "@/Component/Form/SelectInput";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import flightPreferencesSchema from "@/lib/validations/flightPreferencesSchema";
import {updateProfile} from "@/lib/services/profileService";
import {toast} from "react-toastify";
import Button from "@/Component/Button/Button";
import {useProfileInfoContext} from "@/context/ProfileInfoContext";
import {useRouter} from "next/navigation";
import {
    aircraftPreferences,
    connectionPreferences,
    loyaltyPreferences,
    mealPreferences,
    notificationPreferences,
    seatPreferences
} from "@/app/(site)/profile/(profile)/sections/FlightPreferenceEdit/data";
import {MdOutlineClose} from "react-icons/md";
import ConfirmChangesModal from "@/Component/Modals/ConfirmChangesModal";

interface FlightPreferencesEditProps {
    closeModal: () => void
}

const FlightPreferencesEdit = ({closeModal}: FlightPreferencesEditProps) => {
    const {profileInfo: {flightPreferences}} = useProfileInfoContext();
    const router = useRouter();
    const [isChangesModalOpen, setIsChangesModalOpen] = useState(false);

    const defaultValues = {
        seatPreferences: (flightPreferences ? flightPreferences?.seatPreferences : '') as string,
        mealPreferences: (flightPreferences ? flightPreferences?.mealPreferences : '') as string,
        connectionPreferences: (flightPreferences ? flightPreferences?.connectionPreferences : '') as string,
        notificationPreferences: (flightPreferences ? flightPreferences?.notificationPreferences : '') as string,
        aircraftPreferences: (flightPreferences ? flightPreferences?.aircraftPreferences : '') as string,
        loyaltyPreferences: (flightPreferences ? flightPreferences?.loyaltyPreferences : '') as string,
    }

    const {
        register,
        handleSubmit,
        trigger,
        watch,
        formState: {errors, dirtyFields, isValid, isDirty, isSubmitting},
    } = useForm({defaultValues, resolver: yupResolver(flightPreferencesSchema)})

    const updateBasicInfo = async (data: Partial<typeof defaultValues>) => {
        const res = await updateProfile({flightPreferences: {...defaultValues, ...data}})

        if (res.data) {
            router.refresh();
            closeModal();
        }

        if (res.error) {
            toast.error(res.error)
            return
        }
        toast.success(res.message)
    }

    const onSubmit = async (data: Partial<typeof defaultValues>) => {
        await updateBasicInfo(data);
    }

    const onCloseClickHandler = async () => {
        if (!isDirty) {
            closeModal();
            return;
        }

        if (isDirty) {
            setIsChangesModalOpen(true);
        }
    };

    const saveChangesClickHandler = async () => {
        if (isSubmitting) return;

        if (!isValid) {
            setIsChangesModalOpen(false)
            await trigger();
            return;
        }

        type FormValues = Partial<typeof defaultValues>;

        let dataToUpdate: Partial<FormValues> = {};
        Object.keys(dirtyFields).forEach((key) => {
            dataToUpdate[key as keyof FormValues] = watch(key as keyof FormValues);
        });

        await updateBasicInfo(dataToUpdate as FormValues);
    }

    return (
        <section
            className='relative sm:min-w-[350px] md:min-w-[500px] bg-white rounded-2xl card-shadow p-4 sm:p-5 lg:p-6 max-w-2xl'>
            <button
                onClick={onCloseClickHandler}
                className={`absolute top-5 right-5 font-xl`}
            >
                <MdOutlineClose/>
            </button>
            <header className='border-b-2 mb-3.5 sm:mb-4 lg:mb-5'>
                <h1
                    className='text-lg lg:text-xl lg:text-[22px] font-semibold text-brand-neutral-800 inline-block pb-3.5 border-brand-blue'
                    style={{lineHeight: 1}}
                >
                    Flight Preferences
                </h1>
            </header>

            <form onSubmit={handleSubmit(onSubmit)} className='grid sm:grid-cols-2 flex-col gap-4'>
                <SelectInput
                    label='Seat preferences' id='seat-preferences'
                    error={errors?.seatPreferences?.message as string}
                    {...register("seatPreferences")}
                >
                    <option value=''>Select</option>
                    {seatPreferences.map(val => (
                        <option key={val} value={val}>{val}</option>
                    ))}
                </SelectInput>
                <SelectInput
                    label='Meal preferences' id='meal-preferences'
                    error={errors?.mealPreferences?.message as string}
                    {...register("mealPreferences")}
                >
                    <option value=''>Select</option>
                    {mealPreferences.map(val => (
                        <option key={val} value={val}>{val}</option>
                    ))}
                </SelectInput>

                <SelectInput
                    label='Connection preferences' id='connection-preferences'
                    error={errors?.connectionPreferences?.message as string}
                    {...register("connectionPreferences")}
                >
                    <option value=''>Select</option>
                    {connectionPreferences.map(val => (
                        <option key={val} value={val}>{val}</option>
                    ))}
                </SelectInput>

                <SelectInput
                    label='Notification preferences' id='notification-preferences'
                    error={errors?.notificationPreferences?.message as string}
                    {...register("notificationPreferences")}
                >
                    <option value=''>Select</option>
                    {notificationPreferences.map(val => (
                        <option key={val} value={val}>{val}</option>
                    ))}
                </SelectInput>

                <SelectInput
                    label='Aircraft preferences' id='aircraft-preferences'
                    error={errors?.aircraftPreferences?.message as string}
                    {...register("aircraftPreferences")}
                >
                    <option value=''>Select</option>
                    {aircraftPreferences.map(val => (
                        <option key={val} value={val}>{val}</option>
                    ))}
                </SelectInput>

                <SelectInput
                    label='Loyalty preferences' id='loyalty-preferences'
                    error={errors?.loyaltyPreferences?.message as string}
                    {...register("loyaltyPreferences")}
                >
                    <option value=''>Select</option>
                    {loyaltyPreferences.map(val => (
                        <option key={val} value={val}>{val}</option>
                    ))}
                </SelectInput>

                <div className='col-span-full flex justify-end pt-1 lg:pt-2'>
                    <Button size='small' type='submit' disabled={isSubmitting}>Save Changes</Button>
                </div>
            </form>
            <ConfirmChangesModal
                disabledSave={isSubmitting}
                open={isChangesModalOpen}
                setOpen={setIsChangesModalOpen}
                onCancelClickHandler={closeModal}
                onSaveClickHandler={saveChangesClickHandler}
            />
        </section>
    );
};

FlightPreferencesEdit.displayName = 'FlightPreferencesEdit';

export default FlightPreferencesEdit;
