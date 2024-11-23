"use client";
import Link from "next/link";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import forgotSchema from "@/lib/validations/forgotSchema";

import Button from "@/components/Button/Button";
import TextInput from "@/components/Form/TextInput";

interface FormValues {
  email: string;
}

export default function Form() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: yupResolver(forgotSchema),
  });

  const onSubmit = async (data: FormValues) => {
    try {
      const res = await fetch("/api/auth/forgot", {
        method: "POST",
        body: JSON.stringify({ email: data.email, isAdmin: true }),
      }).then((res) => res.json());

      if (res?.error) return toast.error(res.error);

      if (res?.message) toast.success(res.message);
    } catch (error) {
      toast.error("Error during Forgot. Try again later.");
    }
  };

  return (
    <>
      <h1 className="mb-5 sm:mb-7 text-center text-2xl sm:text-3xl font-bold leading-none text-gray-800">
        Forgot Password?
      </h1>
      <form
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 sm:space-y-5"
      >
        <div>
          <TextInput
            label="Email Address"
            id="email"
            type="email"
            className="bg-[rgba(0,51,102,0.03)] w-full"
            placeholder="Email Address"
            {...register("email")}
          />
          {errors.email && (
            <div className="text-red-500">{errors.email.message}</div>
          )}
        </div>

        <div>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-lg mb-5 sm:text-lg"
          >
            Send Mail
          </Button>
          <div className="text-dark-1 text-opacity-80 text-lg text-center leading-8">
            Back to{" "}
            <Link
              href="/admin/login"
              className="hover:underline text-brand-blue"
            >
              Sign In
            </Link>
          </div>
        </div>
      </form>
    </>
  );
}
