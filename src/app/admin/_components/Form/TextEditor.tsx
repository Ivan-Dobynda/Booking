"use client";
import { classNames } from "@/lib/helpers";
import React, { useMemo } from "react";

import dynamic from "next/dynamic";
import InputLabel from "./InputLabel";

interface TextEditorProps {
  value?: string;
  error?: string;
  label?: string;
  onChange?(value: string): void;
}

const TextEditor = ({ error, value, label, onChange }: TextEditorProps) => {
  const ReactQuill = useMemo(
    () => dynamic(() => import("react-quill"), { ssr: false }),
    []
  );
  return (
    <div className="w-full">
      {label ? (
        <>
          <InputLabel label={label} />
          <br />
        </>
      ) : null}
      <ReactQuill value={value} onChange={onChange} theme="snow" />
      {error ? <div className="text-red-500 mt-1">{error}</div> : null}
    </div>
  );
};

export default TextEditor;
