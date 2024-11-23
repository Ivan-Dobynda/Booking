"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-toastify";

import resetSchema from "@/lib/validations/resetSchema";

import Button from "@/components/Button/Button";
import TextInput from "@/components/Form/TextInput";

const ResetForm = () => {
  const router = useRouter();
  const params = useParams();

  const defaultValues = {
    password: "",
    confirmPassword: "",
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues, resolver: yupResolver(resetSchema) });

  const onSubmit = async (data: typeof defaultValues) => {
    try {
      const res = await fetch("/api/auth/reset", {
        method: "POST",
        body: JSON.stringify({ password: data.password, token: params.token }),
      }).then((res) => res.json());

      if (res.error) toast.error(res.error);

      if (res.message) {
        toast.success(res.message);

        router.replace("/login");
      }
    } catch (err) {
      console.log("err: ", err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="space-y-3.5 sm:space-y-4 lg:space-y-5 mb-8">
        <TextInput
          label="Password"
          id="password"
          type="password"
          className="bg-[rgba(0,51,102,0.03)]"
          placeholder="New password"
          error={errors?.password?.message}
          {...register("password")}
        />

        <TextInput
          label="Confirm Password"
          id="confirmPassword"
          type="password"
          className="bg-[rgba(0,51,102,0.03)]"
          placeholder="Confirm password"
          error={errors?.confirmPassword?.message}
          {...register("confirmPassword")}
        />
      </div>
      <div className="space-y-4 mb-5 lg:mb-6">
        <Button className="w-full" disabled={isSubmitting}>
          Reset Password
        </Button>
      </div>
    </form>
  );
};

export default ResetForm;
