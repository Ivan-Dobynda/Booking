"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import Button from "@/components/Button/Button";
import TextInput from "@/components/Form/TextInput";

import { updatePersonalInfo } from "@/lib/services/profileService";

interface MoreDetailsProps {
  personalInfo?: {
    id: string;
    passportNumber: string | null;
    nationalId: string | null;
  } | null;
}
const MoreDetails = ({ personalInfo }: MoreDetailsProps) => {
  const defaultValues = {
    passportNumber: personalInfo?.passportNumber || "",
    nationalId: personalInfo?.nationalId || "",
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues /* , resolver: yupResolver(personalInfoSchema) */,
  });

  const onSubmit = async (data: typeof defaultValues) => {
    const res = await updatePersonalInfo(data);

    if (res.data) {
      reset({
        passportNumber: res.data.passportNumber || "",
        nationalId: res.data.nationalId || "",
      });
    }

    if (res.error) {
      toast.error(res.error);
      return;
    }
    toast.success(res.message);
  };

  return (
    <section className="bg-white rounded-2xl card-shadow p-4 sm:p-5 lg:p-6">
      <header className="border-b-2 mb-3.5 sm:mb-4 lg:mb-5">
        <h3
          className="text-lg lg:text-xl lg:text-[22px] font-semibold text-brand-neutral-800 inline-block pb-3.5 border-brand-blue"
          style={{ lineHeight: 1 }}
        >
          More Details
        </h3>
      </header>
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="grid sm:grid-cols-2 gap-x-5 gap-y-3.5 sm:gap-y-4"
      >
        <TextInput
          label="Passport Number"
          id="passport-number"
          placeholder="555-0124 333-0124"
          error={errors.passportNumber?.message}
          {...register("passportNumber")}
        />
        <TextInput
          label="National ID"
          id="national-id"
          placeholder="629 555-0129 333-0127"
          error={errors.nationalId?.message}
          {...register("nationalId")}
        />
        <div className="col-span-full flex justify-end pt-1 lg:pt-2">
          <Button disabled={isSubmitting}>Save Changes</Button>
        </div>
      </form>
    </section>
  );
};

export default MoreDetails;
