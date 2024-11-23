import { classNames } from "@/lib/helpers";
import Link from "next/link";
import React, { ReactNode } from "react";

interface IButton {
  children: ReactNode;
  className?: string;
  variant?: "primary" | "primary-light" | "secondary" | "green";
  size?: 'default' | 'small' ;
  href?: string;
  startIcon?: ReactNode;
  onClick?: () => void;
  style?: React.CSSProperties;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

const Button = ({
  href,
  children,
  className,
  variant = "primary",
    size='default',
  startIcon,
  onClick,
  style,
  type = "submit",
  disabled,
}: IButton) => {
  return href ? (
    <Link
      href={href}
      style={style}
      className={classNames(className, "button", variant, size)}
    >
      {startIcon}
      <span>{children}</span>
    </Link>
  ) : (
    <button
      type={type}
      onClick={onClick}
      style={style}
      disabled={disabled}
      className={classNames(className, "button", variant,size)}
    >
      {startIcon}
      <span>{children}</span>
    </button>
  );
};

export default Button;
