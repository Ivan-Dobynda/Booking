import React from "react";

interface ErrorMessageProps {
  error?: string | null;
}

const ErrorMessage = ({ error }: ErrorMessageProps) => {
  if (!error) return null;

  return <p className="text-red-500 mt-1 text-[15px]">{error}</p>;
};

export default ErrorMessage;
