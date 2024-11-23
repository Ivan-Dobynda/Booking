import { classNames } from "@/lib/helpers";
import React, { ReactNode } from "react";
import Loading from "../../../../components/Loading/Loading";

interface ButtonProps {
  className?: string;
  children: ReactNode;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  loading?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const Button = ({
  className,
  children,
  startIcon,
  endIcon,
  loading,
  onClick,
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className={classNames(
        "relative inline-flex items-center justify-center transition rounded-md bg-brand-blue hover:bg-brand-blue-400 px-6 py-3 text-sm font-medium text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
        className
      )}
    >
      {startIcon}
      <span className={loading ? "opacity-0" : ""}>{children}</span>
      {endIcon}

      {loading ? (
        <span
          className={classNames(
            "inline-block absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10"
          )}
        >
          <Loading />
        </span>
      ) : null}
    </button>
  );
};

export default Button;
