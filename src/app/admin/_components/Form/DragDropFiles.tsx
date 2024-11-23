"use client";
import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import UploadFileImage from "@admin/_assets/icons/upload-files.png";
import Image from "next/image";

const fileTypes = ["JPG", "PNG", "GIF"];

function DragDropFiles() {
  const [file, setFile] = useState(null);

  const handleChange = (file: any) => {
    setFile(file);
  };

  return (
    <FileUploader handleChange={handleChange} name="file" types={fileTypes}>
      <div className="w-full h-56 rounded-2xl border border-dashed border-[#DFE8F6] flex items-center justify-center text-center cursor-pointer">
        <div>
          <div className="mb-4">
            <Image
              src={UploadFileImage}
              width={54}
              height={54}
              alt="Upload files here..."
              className="mx-auto w-[54px] h-[54px]"
            />
          </div>
          <div className="text-xs text-neutral-400">
            <p>Drag and drop choose file to upload your files.</p>
            <p>All pdf, doc, csv, xlsx types are supported</p>
          </div>
        </div>
      </div>
    </FileUploader>
  );
}

export default DragDropFiles;
