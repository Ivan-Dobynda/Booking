"use client";
import React from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";

import forgotSchema from "@/lib/validations/forgotSchema";

import Button from "@/components/Button/Button";
import TextInput from "@/components/Form/TextInput";

const ForgotForm = () => {
  const defaultValues = {
    email: "",
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues, resolver: yupResolver(forgotSchema) });

  const onSubmit = async (data: typeof defaultValues) => {
    try {
      const res = await fetch("/api/auth/forgot", {
        method: "POST",
        body: JSON.stringify(data),
      }).then((res) => res.json());

      if (res?.error) return toast.error(res.error);

      if (res?.message) toast.success(res.message);
    } catch (error) {
      toast.error("Error during Forgot. Try again later.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="space-y-3.5 sm:space-y-4 lg:space-y-5 mb-8">
        <TextInput
          label="Email"
          id="email"
          type="email"
          className="bg-[rgba(0,51,102,0.03)]"
          placeholder="Enter your email"
          error={errors.email?.message}
          {...register("email")}
        />
      </div>
      <div className="space-y-4 mb-5 lg:mb-6">
        <Button disabled={isSubmitting} className="w-full">
          Send Mail
        </Button>
        <div>
          <div className="text-center">
            <span className="text-brand-neutral-700 leading-none">Back to</span>{" "}
            <Link
              href="/login"
              className="text-brand-blue-300 hover:underline font-medium"
            >
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ForgotForm;
