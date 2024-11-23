"use client";
import React, { useRef } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { getSession, signIn } from "next-auth/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { usePathname, useRouter } from "next/navigation";

import loginSchema from "@/lib/validations/loginSchema";

import TextInput from "@/components/Form/TextInput";
import Button from "@/components/Button/Button";

import { fetchAdminUser } from "../../_queries/userQueries";

const defaultValues = {
  email: "",
  password: "",
};

const LoginForm = () => {
  const linkRef = useRef<HTMLAnchorElement | null>(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues, resolver: yupResolver(loginSchema) });

  const pathname = usePathname();

  const onSubmit = async (data: typeof defaultValues) => {
    try {
      const res = await signIn("credentials", {
        email: data?.email,
        password: data?.password,
        isAdmin: true,
        redirect: false,
        twoFactorAuth: false
      });

      if (res?.error) {
        toast.error(res?.error);
        return;
      }

      if (!res?.ok) return;

      if (pathname === "/admin") {
        router.refresh();
        return;
      }

      linkRef.current?.click?.();
    } catch (err) {
      console.log("err: ", err);

      toast.error("Error during login. Try again later.");
    }
  };

  return (
    <>
      <Link ref={linkRef} hidden className="hidden" href={"/admin"} />

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="space-y-3.5 lg:space-y-4 mb-8">
          <TextInput
            label="Email"
            id="email"
            type="email"
            className="bg-[rgba(0,51,102,0.03)]"
            placeholder="Enter your email"
            error={errors.email?.message}
            {...register("email")}
          />
          <div>
            <div className="mb-2.5">
              <TextInput
                label="Password"
                id="password"
                type="password"
                className="bg-[rgba(0,51,102,0.03)]"
                placeholder="Enter your password"
                error={errors.password?.message}
                {...register("password")}
              />
            </div>
            <div className="flex justify-between items-center">
              {/* <Checkbox label="Remember for 30 days" /> */}

              <div></div>
              <Link
                href="/admin/forgot"
                className="text-brand-blue-300 hover:underline leading-none"
              >
                Forgot password?
              </Link>
            </div>
          </div>
        </div>
        <div className="space-y-3.5">
          <Button className="w-full" disabled={isSubmitting}>
            Sign In
          </Button>
        </div>
      </form>
    </>
  );
};

export default LoginForm;
