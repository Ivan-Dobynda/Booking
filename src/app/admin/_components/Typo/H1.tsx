import React, { ReactNode } from "react";

interface H1Props {
  children: ReactNode;
}

const H1 = ({ children }: H1Props) => {
  return (
    <h1 className="text-neutral-800 text-2xl font-semibold mb-1">{children}</h1>
  );
};

export default H1;
