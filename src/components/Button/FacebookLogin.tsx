import React from "react";
import Button from "./Button";
import { FaFacebook } from "react-icons/fa6";

const FacebookLogin = () => {
  return (
    <Button
      variant="secondary"
      className="w-full"
      type="button"
      startIcon={
        <span className="text-2xl mr-2.5 text-[#1877F2]">
          <FaFacebook />
        </span>
      }
    >
      Continue with Facebook
    </Button>
  );
};

export default FacebookLogin;
