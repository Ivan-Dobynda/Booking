"use client";
import React from "react";
import Image from "next/image";

import GoogleLogo from "@/assets/logos/google-logo.png";

import Button from "./Button";
import { signIn } from "next-auth/react";

const GoogleLogin = () => {
  const handleGoogleLogin = () => {
    signIn("google");
  };

  return (
    <Button
      onClick={handleGoogleLogin}
      variant="secondary"
      className="w-full"
      type="button"
      startIcon={
        <Image
          width={32}
          className="mr-2"
          src={GoogleLogo}
          alt="Sign up with Google"
        />
      }
    >
      Continue with Google
    </Button>
  );
};

export default GoogleLogin;
