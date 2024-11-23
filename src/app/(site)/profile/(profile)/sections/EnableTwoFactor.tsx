"use client";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import Button from "@/components/Button/Button";
import TextInput from "@/components/Form/TextInput";

import changePasswordSchema from "@/lib/validations/changePasswordSchema";
import { EnableTwoFactor, updatePassword } from "@/lib/services/profileService";
import { getUserSession } from "@/queries/profile";
import * as yup from "yup";

const twoFactorSchema = yup.object().shape({
  enableTwoFA: yup.boolean(),
});

const ChangePassword = () => {
  const [enableTwoFA, setEnableTwoFA] = useState(false);

  const defaultValues = {
    enableTwoFA: false,
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm({
    defaultValues,
    resolver: yupResolver(twoFactorSchema),
  });

  useEffect(() => {
    (async () => {
      const user = await getUserSession();

      if (user) {
        setEnableTwoFA(user.enableTwoFA);
        reset({
          ...defaultValues,
          enableTwoFA: user.enableTwoFA,
        });
      }
    })();
  }, []);

  const handleToggleEnableTwoFA = () => {
    const newValue = !enableTwoFA;
    setEnableTwoFA(newValue);
    setValue("enableTwoFA", newValue);
  };

  const onSubmit = async (data: any) => {
    const res = await EnableTwoFactor(data);

    if (!res.message.includes("Authentication")) {
      toast.error(res.message);
      return;
    } else {
      toast.success(res.message);
    }

    reset();
  };

  return (
    <section className="bg-white rounded-2xl card-shadow p-4 sm:p-5 lg:p-6">
      <header className="border-b-2 mb-3.5 sm:mb-4 lg:mb-5">
        <h3
          className="text-lg lg:text-xl lg:text-[22px] font-semibold text-brand-neutral-800 inline-block pb-3.5 border-brand-blue"
          style={{ lineHeight: 1 }}
        >
          Two Factor Authentication
        </h3>
      </header>
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="grid sm:grid-cols-2 gap-x-5 gap-y-3.5 sm:gap-y-4"
      >
        <div className="flex items-center col-span-full">
          <input
            type="checkbox"
            id="enableTwoFA"
            checked={enableTwoFA}
            onChange={handleToggleEnableTwoFA}
            className="form-checkbox h-5 w-5 text-indigo-600"
          />
          <label htmlFor="enableTwoFA" className="ml-2 text-gray-700">
            Enable Two-Factor Authentication
          </label>
        </div>
        <div className="col-span-full flex justify-end pt-1 lg:pt-2">
          <Button disabled={isSubmitting}>Update</Button>
        </div>
      </form>
    </section>
  );
};

export default ChangePassword;
