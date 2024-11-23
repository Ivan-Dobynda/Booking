"use client";
import React, { useRef, useState } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";

import loginSchema from "@/lib/validations/loginSchema";

import TextInput from "@/components/Form/TextInput";
import Button from "@/components/Button/Button";
import GoogleLogin from "@/components/Button/GoogleLogin";
import FacebookLogin from "@/components/Button/FacebookLogin";

const defaultValues = {
  email: "",
  password: "",
};

const LoginForm = () => {
  const linkRef = useRef<HTMLAnchorElement | null>(null);
  const router = useRouter();

  const [enableTwoFactor, setEnableTwoFactor] = useState<boolean>(false);
  const [verificationMethod, setVerificationMethod] = useState({
    isDefault: true,
    value: "mobile",
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues, resolver: yupResolver(loginSchema) });

  const [otp, setOtp] = useState<number | string>("");

  const onSubmit = async (data: typeof defaultValues) => {
    const res = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
      twoFactorAuth:
        enableTwoFactor && verificationMethod.isDefault ? "true" : "false",
      verifyOTP: enableTwoFactor ? otp : undefined,
      verificationMethod: verificationMethod.value,
    });


    if (!res?.error && res?.status === 200) {
      linkRef?.current?.click();
      router.refresh();
    }

    if (
      res?.error &&
      (res?.error?.includes("Please verify you OTP") ||
        "Please add the mobile number to get the OTP") &&
      !res?.error?.includes("Invalid credentials.")
    ) {
      setVerificationMethod((prev) => ({ ...prev, isDefault: true }));
      setEnableTwoFactor(true);
      return toast.info(res?.error);
    } else {
      return toast.error(res?.error);
    }
  };

  return (
    <>
      <Link ref={linkRef} hidden className="hidden" href={"/"} />

      {!enableTwoFactor ? (
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
                  href="/forgot"
                  className="text-brand-blue-300 hover:underline leading-none text-sm"
                >
                  Forgot password?
                </Link>
              </div>
            </div>
          </div>
          <div className="space-y-3.5 mb-5 lg:mb-6">
            <Button className="w-full" disabled={isSubmitting}>
              Sign In
            </Button>
            <GoogleLogin />
            {/* <FacebookLogin /> */}
          </div>
          <div>
            <div className="text-center">
              <span className="text-brand-neutral-700 leading-none">
                Don&apos;t have an account?
              </span>{" "}
              <Link
                href="/register"
                className="text-brand-blue-300 hover:underline font-medium"
              >
                Sign up
              </Link>
            </div>
          </div>
        </form>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="space-y-3.5 sm:space-y-4 lg:space-y-5 mb-8">
            <TextInput
              label={`Verify Your OTP through ${verificationMethod.value}`}
              id="otp"
              type="number"
              className="bg-[rgba(0,51,102,0.03)]"
              placeholder="Enter your OTP here"
              value={otp}
              onChange={(e) => {
                const enteredValue = e.target.value;
                // Only allow input if it's a number and length is less than or equal to 6
                if (/^\d*$/.test(enteredValue) && enteredValue.length <= 6) {
                  setOtp(enteredValue);
                }
              }}
            />
          </div>

          <div className=" space-y-3.5 mb-5 lg:mb-6">
            <label
              className="leading-none text-sm sm:text-[15px] md:text-base text-brand-neutral-700 mb-2 sm:mb-2.5 inline-block"
              style={{ lineHeight: 1 }}
            >
              Get OTP via:
            </label>
            <div className="flex gap-5 items-center">
              <input
                type="radio"
                value="mobile"
                checked={verificationMethod.value === "mobile"}
                onChange={() =>
                  setVerificationMethod({
                    isDefault: false,
                    value: "mobile",
                  })
                }
              />
              <label>SMS</label>
            </div>
            <div className="flex gap-5 items-center">
              <input
                type="radio"
                value="email"
                checked={verificationMethod.value === "email"}
                onChange={() =>
                  setVerificationMethod({
                    isDefault: false,
                    value: "email",
                  })
                }
              />
              <label>Email</label>
            </div>
          </div>

          <div className="space-y-3.5 mb-5 lg:mb-6">
            <Button
              onClick={handleSubmit(onSubmit)}
              className="w-full"
              disabled={isSubmitting}
            >
              Send Token
            </Button>
            <Button className="w-full" disabled={isSubmitting}>
              Verify Token
            </Button>
          </div>
        </form>
      )}
    </>
  );
};

export default LoginForm;
