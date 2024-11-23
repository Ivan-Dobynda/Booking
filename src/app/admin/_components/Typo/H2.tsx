import React, { ReactNode } from "react";

interface H2Props {
  children: ReactNode;
}

const H2 = ({ children }: H2Props) => {
  return (
    <h2 className="flex items-center gap-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="4"
        height="20"
        viewBox="0 0 4 20"
        fill="none"
      >
        <path
          d="M0 10H4V18C4 19.1046 3.10457 20 2 20C0.895431 20 0 19.1046 0 18V10Z"
          fill="#FFCC99"
        />
        <path
          d="M0 2C0 0.89543 0.895431 0 2 0C3.10457 0 4 0.895431 4 2V10H0V2Z"
          fill="#003366"
        />
      </svg>
      <span className="text-neutral-800 text-xl font-medium">{children}</span>
    </h2>
  );
};

export default H2;
