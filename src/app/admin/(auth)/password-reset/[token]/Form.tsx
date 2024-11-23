"use client";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import resetSchema from "@/lib/validations/resetSchema";

import Button from "@/components/Button/Button";
import PasswordInput from "@/components/Form/TextInput";

export default function Form({ params }: { params: { token?: string } }) {
  const router = useRouter();

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
    if (!params.token) return;

    try {
      const res = await fetch("/api/auth/reset", {
        method: "POST",
        body: JSON.stringify({ password: data.password, token: params.token }),
      }).then((res) => res.json());

      if (res.error) toast.error(res.error);

      if (res.message) {
        toast.success(res.message);

        router.replace("/admin/login");
      }
    } catch (err) {
      console.log("err: ", err);
    }
  };

  return (
    <>
      <h1 className="mb-5 sm:mb-7 text-center text-2xl sm:text-3xl font-bold leading-none text-gray-800">
        Reset Password
      </h1>
      <form
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 sm:space-y-5"
      >
        <div>
          <PasswordInput
            label="Password"
            id="password"
            type="password"
            placeholder="Password"
            className="bg-[rgba(0,51,102,0.03)]"
            error={errors.password?.message}
            {...register("password")}
          />
        </div>
        <div>
          <PasswordInput
            label="Confirm Password"
            id="confirm-password"
            type="password"
            className="bg-[rgba(0,51,102,0.03)] w-full"
            placeholder="Confirm Password"
            error={errors.confirmPassword?.message}
            {...register("confirmPassword")}
          />
        </div>
        <div>
          <Button
            disabled={isSubmitting}
            className="w-full rounded-lg sm:text-lg"
          >
            Reset Password
          </Button>
        </div>
      </form>
    </>
  );
}
