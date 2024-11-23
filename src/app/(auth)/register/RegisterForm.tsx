"use client";
import React from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { yupResolver } from "@hookform/resolvers/yup";

import registerSchema from "@/lib/validations/registerSchema";

import Button from "@/components/Button/Button";
import TextInput from "@/components/Form/TextInput";
import GoogleLogin from "@/components/Button/GoogleLogin";
import FacebookLogin from "@/components/Button/FacebookLogin";
import { toast } from "react-toastify";

const defaultValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const RegisterForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues,
    resolver: yupResolver(registerSchema),
  });

  const onSubmit = async (data: typeof defaultValues) => {
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        body: JSON.stringify(data),
      }).then((res) => res.json());

      if (res?.error) return toast.error(res.error);

      toast.success(res?.message);
      router.replace("/login");
    } catch (error) {
      toast.error("Error during signup. Try again later.");
    } finally {
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="space-y-3.5 sm:space-y-4 lg:space-y-5 mb-8">
        <div className="grid grid-cols-2 gap-4 lg:gap-5">
          <TextInput
            label="First Name"
            id="firstName"
            className="bg-[rgba(0,51,102,0.03)]"
            placeholder="Enter first name"
            error={errors?.firstName?.message}
            {...register("firstName")}
          />

          <TextInput
            label="Last Name"
            id="lastName"
            className="bg-[rgba(0,51,102,0.03)]"
            placeholder="Enter last name"
            error={errors?.lastName?.message}
            {...register("lastName")}
          />
        </div>

        <TextInput
          label="Email"
          id="email"
          type="email"
          className="bg-[rgba(0,51,102,0.03)]"
          placeholder="Enter your email"
          error={errors?.email?.message}
          {...register("email")}
        />

        <TextInput
          label="Password"
          id="password"
          type="password"
          className="bg-[rgba(0,51,102,0.03)]"
          placeholder="Create a password"
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

      <div className="space-y-4 mb-4 lg:mb-6">
        <Button disabled={isSubmitting} className="w-full">
          Sign Up
        </Button>
        <GoogleLogin />
        {/* <FacebookLogin /> */}
      </div>
      <div>
        <p className="text-center xl:text-left text-sm text-brand-blue-400 mb-3">
          By continuing you agree to our Terms of Service and Privacy Policy,
        </p>
        <div className="text-center">
          <span className="text-brand-neutral-700 leading-none">
            Already have an account.
          </span>{" "}
          <Link
            href="/login"
            className="text-brand-blue-300 hover:underline font-medium"
          >
            Sign in
          </Link>
        </div>
      </div>
    </form>
  );
};

export default RegisterForm;
