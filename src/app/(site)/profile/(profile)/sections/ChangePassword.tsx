"use client";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import Button from "@/components/Button/Button";
import TextInput from "@/components/Form/TextInput";

import changePasswordSchema from "@/lib/validations/changePasswordSchema";
import { updatePassword } from "@/lib/services/profileService";

const ChangePassword = () => {
   const defaultValues = {
    currentPassword: "",
    newPassword: "",
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
      } = useForm({
    defaultValues,
    resolver: yupResolver(changePasswordSchema),
  });

  const onSubmit = async (data: typeof defaultValues) => {
    const res = await updatePassword(data);

    if (res.error) {
      toast.error(res.error);
      return;
    }

    toast.success(res.message);
    reset();
  };

  return (
    <section className="bg-white rounded-2xl card-shadow p-4 sm:p-5 lg:p-6">
      <header className="border-b-2 mb-3.5 sm:mb-4 lg:mb-5">
        <h3
          className="text-lg lg:text-xl lg:text-[22px] font-semibold text-brand-neutral-800 inline-block pb-3.5 border-brand-blue"
          style={{ lineHeight: 1 }}
        >
          Change Password
        </h3>
      </header>
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="grid sm:grid-cols-2 gap-x-5 gap-y-3.5 sm:gap-y-4"
      >
        <TextInput
          label="Current Password"
          id="password"
          type="password"
          error={errors.currentPassword?.message}
          {...register("currentPassword")}
        />
        <TextInput
          label="New Password"
          id="confirm-password"
          type="password"
          error={errors.newPassword?.message}
          {...register("newPassword")}
        />
        <div className="col-span-full flex justify-end pt-1 lg:pt-2">
          <Button disabled={isSubmitting}>Change Password</Button>
        </div>
      </form>
    </section>
  );
};

export default ChangePassword;
