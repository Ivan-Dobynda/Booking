"use client";
import React, {useState} from "react";
import {toast} from "react-toastify";

import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";

import Button from "@/components/Button/Button";
import SelectInput from "@/components/Form/SelectInput";
import TextInput from "@/components/Form/TextInput";

import profileInfoSchema from "@/lib/validations/profileInfoSchema";
import {formatDate} from "@/lib/helpers";
import {updateProfile} from "@/lib/services/profileService";
import {useSession} from "next-auth/react";
import {useRouter} from "next/navigation";
import TextAreaInput from "@/Component/Form/TextAreaInput";
import {useProfileInfoContext} from "@/context/ProfileInfoContext";
import {MdOutlineClose} from "react-icons/md";
import ConfirmChangesModal from "@/Component/Modals/ConfirmChangesModal";

interface ProfileInfoProps {
    closeModal: () => void;
}

interface FormValues {
    firstName: string;
    lastName: string;
    dob: string;
    gender: string;
    accessibilityNeeds: string;
    bio?: string | undefined;
}

const BasicInfoEdit = ({closeModal}: ProfileInfoProps) => {
    const {profileInfo} = useProfileInfoContext();
    const router = useRouter();
    const {update: updateSession} = useSession();
    const [isChangesModalOpen, setIsChangesModalOpen] = useState(false);

    const defaultValues = {
        firstName: profileInfo?.firstName || "",
        lastName: profileInfo?.lastName || "",
        dob: formatDate(profileInfo?.dob, "YYYY-MM-DD") || "",
        gender: profileInfo?.gender || "",
        accessibilityNeeds: profileInfo?.accessibilityNeeds || "",
        bio: profileInfo?.bio || "",
    };

    const {
        register,
        handleSubmit,
        watch,
        trigger,
        formState: {errors,isValid, dirtyFields, isDirty, isSubmitting},
    } = useForm<FormValues>({
        defaultValues,
        resolver: yupResolver(profileInfoSchema),
    });

    const updateBasicInfo = async (data: FormValues) => {
        const payload: any = {...data};
        if (payload.dob) {
            payload.dob = new Date(payload.dob);
        }
        const res = await updateProfile(payload);

        if (res.data) {
            await updateSession({
                name: `${res.data.firstName} ${res.data.lastName}`,
                email: res.data.email,
            });
            closeModal();
            router.refresh();
        }

        if (res.error) {
            toast.error(res.error);
            return;
        }
        toast.success(res.message);
    }

    const onSubmit = async (data: FormValues) => {
        await updateBasicInfo(data);
    };

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
            dataToUpdate[key as keyof FormValues] = watch(key as keyof FormValues);
        });

        await updateBasicInfo(dataToUpdate as FormValues);
    }

    return (
        <section className="relative bg-white rounded-2xl card-shadow p-4 sm:p-5 lg:p-6">
            <button
                onClick={onCloseClickHandler}
                className={`absolute top-5 right-5 font-xl`}
            >
                <MdOutlineClose/>
            </button>
            <header className="border-b-2 mb-3.5 sm:mb-4 lg:mb-5">
                <h1
                    className="text-lg lg:text-xl lg:text-[22px] font-semibold text-brand-neutral-800 inline-block pb-3.5 border-brand-blue"
                    style={{lineHeight: 1}}
                >
                    Basic information
                </h1>
            </header>
            <form
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                className="grid sm:grid-cols-2 gap-x-5 gap-y-3.5 sm:gap-y-4"
            >
                <TextInput
                    label="First Name"
                    id="first-name"
                    error={errors.firstName?.message}
                    {...register("firstName")}
                />
                <TextInput
                    label="Last Name"
                    id="last-name"
                    error={errors.lastName?.message}
                    {...register("lastName")}
                />
                <TextInput
                    label="Date of Birth"
                    id="dob"
                    type="date"
                    error={errors.dob?.message}
                    {...register("dob")}
                />
                <SelectInput
                    label="Gender"
                    id="gender"
                    error={errors.gender?.message}
                    {...register("gender")}
                >
                    <option value="">Select</option>
                    <option value="MALE">Male</option>
                    <option value="FEMALE">Female</option>
                </SelectInput>
                <SelectInput
                    label="Accessibility Needs"
                    id="accessibilityNeeds"
                    error={errors.accessibilityNeeds?.message}
                    {...register("accessibilityNeeds")}
                >
                    <option value="">Select</option>
                    <option value="NOT_PROVIDED">Not Provided</option>
                    <option
                        value={`No, I don't have accessibility needs`}
                    >{`No, I don't have accessibility needs`}</option>
                    <option value={`Yes i have accessibility needs`}>
                        Yes i have accessibility needs
                    </option>
                    <option value={`Rather not say`}>Rather not say</option>
                </SelectInput>
                <div className={"col-span-2"}>
                    <TextAreaInput
                        rows={4}
                        label="Bio"
                        id="bio"
                        error={errors.bio?.message}
                        {...register("bio")}
                    />
                </div>
                <div className="col-span-full flex justify-end pt-1 lg:pt-2">
                    <Button disabled={isSubmitting}>Save Changes</Button>
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

export default BasicInfoEdit;
