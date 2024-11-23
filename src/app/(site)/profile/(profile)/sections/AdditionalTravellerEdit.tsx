"use client"
import React, {useState} from "react"
import {toast} from "react-toastify"

import {useForm} from "react-hook-form"
import {yupResolver} from "@hookform/resolvers/yup"

import Button from "@/components/Button/Button"
import SelectInput from "@/components/Form/SelectInput"
import TextInput from "@/components/Form/TextInput"

import {formatDate} from "@/lib/helpers"
import {useRouter} from "next/navigation"
import {useProfileInfoContext} from "@/context/ProfileInfoContext";
import PhoneNumberInput from "@/Component/Form/PhoneNumberInput";
import additionalTravelerEditSchema from "@/lib/validations/additionalTravelerEditSchema";
import {updateAdditionalTraveller} from "@/lib/services/additionalTravelerService";
import {MdOutlineClose} from "react-icons/md";
import ConfirmChangesModal from "@/Component/Modals/ConfirmChangesModal";

interface ProfileInfoProps {
    closeModal: () => void;
}

type FormValues = {
    firstName: string;
    lastName: string;
    mobile: string;
    dob: string;
    gender: string;
    emergencyContact?: {
        firstName?: string | null;
        lastName?: string | null;
        mobile?: string | null;
    };
}

const AdditionalTravellerEdit = ({closeModal}: ProfileInfoProps) => {
    const {  travellerToEdit} = useProfileInfoContext();
    const router = useRouter()
    const [isChangesModalOpen, setIsChangesModalOpen] = useState(false);

    const defaultValues = {
        firstName: (travellerToEdit?.firstName || "") as string,
        lastName: (travellerToEdit?.lastName || "") as string,
        mobile: (travellerToEdit?.mobile || "") as string,
        dob: (formatDate(travellerToEdit?.dob, "YYYY-MM-DD") || "") as string,
        gender: (travellerToEdit?.gender || "") as string,
        emergencyContact: travellerToEdit?.emergencyContact || {firstName: "", lastName: "", mobile: ""},
    }

    const {
        register,
        handleSubmit,
        trigger,
        formState: {errors,isValid, dirtyFields, isDirty, isSubmitting},

        watch,
        setValue,
    } = useForm({defaultValues, resolver: yupResolver(additionalTravelerEditSchema)})

    const updateAdditionalTravellers = async (data: FormValues) => {
        const payload: any = {...data}
        payload.dob = new Date(payload.dob)

        if (travellerToEdit) {
            payload.id = travellerToEdit.id;
        }

        const res = await updateAdditionalTraveller(payload);

        if (res.data) {
            closeModal();
            router.refresh()
        }

        if (res.error) {
            toast.error(res.error)
            return
        }
        toast.success(res.message)
    }

    const onSubmit = async (data: FormValues) => {
       await updateAdditionalTravellers(data);
    }

    const emergencyContactMobile = watch('emergencyContact.mobile')
    const mobile = watch('mobile')

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

        let dataToUpdate: Partial<FormValues> = {};
        Object.keys(dirtyFields).forEach((key) => {
            // @ts-ignore - todo fix type error
            dataToUpdate[key as keyof FormValues] = watch(key as keyof FormValues);
        });

        await updateAdditionalTravellers(dataToUpdate as FormValues);
    }


    return (
        <section className='relative bg-white rounded-2xl card-shadow p-4 sm:p-5 lg:p-6'>
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
                    Basic information
                </h1>
            </header>
            <form onSubmit={handleSubmit(onSubmit)} noValidate
                  className='grid sm:grid-cols-2 gap-x-5 gap-y-3.5 sm:gap-y-4'>
                <TextInput label='First Name' id='first-name'
                           error={errors.firstName?.message} {...register("firstName")} />
                <TextInput label='Last Name' id='last-name'
                           error={errors.lastName?.message} {...register("lastName")} />
                <TextInput label='Date of Birth' id='dob' type='date'
                           error={errors.dob?.message} {...register("dob")} />
                <SelectInput label='Gender' id='gender' error={errors.gender?.message} {...register("gender")}>
                    <option value=''>Select</option>
                    <option value='MALE'>Male</option>
                    <option value='FEMALE'>Female</option>
                </SelectInput>

                <PhoneNumberInput
                    label="Mobile Number"
                    id="mobile-number"
                    error={errors?.mobile?.message}
                    value={mobile}
                    onChange={(val: any) => {
                        setValue("mobile", val);
                    }}
                />

                <div className={`col-span-2`}>
                    <p className={"font-bold mb-2"}>Emergency Contact</p>
                    <div className="grid sm:grid-cols-2 gap-x-5 gap-y-3.5 sm:gap-y-4">
                        <TextInput
                            label="First Name"
                            id="emergency-contact-first-name"
                            error={errors.emergencyContact?.message}
                            {...register("emergencyContact.firstName")}
                        />
                        <TextInput
                            label="Last Name"
                            id="emergency-contact-last-name"
                            error={errors.emergencyContact?.lastName?.message}
                            {...register("emergencyContact.lastName")}
                        />
                        <PhoneNumberInput
                            label="Mobile Number"
                            id="emergency-contact-mobile-number"
                            error={errors.emergencyContact?.mobile?.message}
                            value={emergencyContactMobile}
                            onChange={(val: any) => {
                                setValue("emergencyContact.mobile", val);
                            }}
                        />
                    </div>
                </div>
                <div className='col-span-full flex justify-end pt-1 lg:pt-2'>
                    <Button size={'small'} disabled={isSubmitting}>Save Changes</Button>
                </div>
                <ConfirmChangesModal
                    disabledSave={isSubmitting}
                    open={isChangesModalOpen}
                    setOpen={setIsChangesModalOpen}
                    onCancelClickHandler={closeModal}
                    onSaveClickHandler={saveChangesClickHandler}
                />
            </form>
        </section>
    )
}

export default AdditionalTravellerEdit
