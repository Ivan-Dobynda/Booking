import React from "react";

const InputLabel = ({ id, label }: { id?: string; label?: string }) => {
  return (
    <label
      htmlFor={id}
      className="leading-none text-sm sm:text-[15px] md:text-base text-brand-neutral-700 mb-2 sm:mb-2.5 inline-block"
      style={{ lineHeight: 1 }}
    >
      {label}
    </label>
  );
};

export default InputLabel;
