import React, {useState} from 'react';
import TextInput from "@/Component/Form/TextInput";
import SelectInput from "@/Component/Form/SelectInput";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import travelDocumentsSchema from "@/lib/validations/travelDocumentsSchema";
import {updateProfile} from "@/lib/services/profileService";
import {toast} from "react-toastify";
import Button from "@/Component/Button/Button";
import {useProfileInfoContext} from "@/context/ProfileInfoContext";
import {formatDate} from "@/lib/helpers";
import {useRouter} from "next/navigation";
import {MdOutlineClose} from "react-icons/md";
import ConfirmChangesModal from "@/Component/Modals/ConfirmChangesModal";
import {useGlobalContext} from "@/context/GlobalContext";

interface TravelDocumentsEditProps {
    closeModal: () => void
}

interface TravelDocuments {
    passportNumber?: string,
    country?: string,
    expiryDate?: string,

}

const TravelDocumentsEdit = ({closeModal}: TravelDocumentsEditProps) => {
    const {profileInfo: {travelDocuments}} = useProfileInfoContext();
    const [isChangesModalOpen, setIsChangesModalOpen] = useState(false);
    const router = useRouter();

    const defaultValues = {
        passportNumber: travelDocuments?.passportNumber,
        country: travelDocuments?.country,
        expiryDate: travelDocuments?.expiryDate ? formatDate(travelDocuments?.expiryDate, "YYYY-MM-DD") : undefined,
    } as TravelDocuments;

    const {
        register,
        handleSubmit,
        trigger,
        watch,
        formState: {errors, dirtyFields, isValid, isDirty, isSubmitting},
    } = useForm({defaultValues, resolver: yupResolver(travelDocumentsSchema)})

    const updateBasicInfo = async (data: typeof defaultValues) => {
        const payload: any = {...defaultValues, ...data}
        if (payload.expiryDate) {
            payload.expiryDate = new Date(payload.expiryDate)
        }

        const res = await updateProfile({travelDocuments: { ...payload}})

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

    const onSubmit = async (data: typeof defaultValues) => {
        await updateBasicInfo(data);
    }
    const onCloseClickHandler = async () => {
        if (!isDirty || Object.keys(dirtyFields)?.length === 0) {
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

        type FormValues = typeof defaultValues;

        let dataToUpdate: Partial<FormValues> = {};
        Object.keys(dirtyFields).forEach((key) => {
            dataToUpdate[key as keyof FormValues] = watch(key as keyof FormValues);
        });

        await updateBasicInfo(dataToUpdate as FormValues);

    }

    const {countries} = useGlobalContext();

    return (
        <section className='relative bg-white rounded-2xl card-shadow p-4 sm:p-5 lg:p-6 max-w-2xl'>
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
                    Travel Documents
                </h1>
            </header>
            <p className='mb-4'>
                {`Your passport is essential for international travel. We'll share reminders about travel restrictions
                and passport validity that may impact your trip.`}
            </p>
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
                <SelectInput
                    label='Country' id='country'
                    error={errors?.country?.message as string}
                    {...register("country")}
                >
                    <option value=''>Select</option>
                    {countries.map(val => (
                        <option key={val.id} value={val.country}>{val.country}</option>
                    ))}
                </SelectInput>
                <TextInput
                    label='Passport number'
                    id='passport-number'
                    type='text'
                    error={errors.passportNumber?.message}
                    {...register("passportNumber")}
                />
                <TextInput
                    label='Expiry date'
                    id='expiry-date'
                    type='date'
                    error={errors.expiryDate?.message}
                    {...register("expiryDate")}
                />
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

export default TravelDocumentsEdit;
