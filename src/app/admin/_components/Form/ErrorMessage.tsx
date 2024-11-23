import { classNames } from "@/lib/helpers";
import React from "react";

interface ErrorMessageProps {
  error?: string | null;
  size?: "default" | "small";
}

const ErrorMessage = ({ error, size = "default" }: ErrorMessageProps) => {
  if (!error) return null;

  return (
    <p
      className={classNames(
        size === "default" ? "text-[15px]" : "",
        size === "small" ? "text-sm" : "",
        "text-red-600 mt-1"
      )}
    >
      {error}
    </p>
  );
};

export default ErrorMessage;
