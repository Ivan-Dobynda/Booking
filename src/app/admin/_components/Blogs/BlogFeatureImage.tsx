"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { PencilIcon } from "@heroicons/react/24/outline";
import { toast } from "react-toastify";

// lib
import { fileUploader, getAssetPath } from "@/lib/fileUploader";

interface CompanyLogoProps {
  image: string;
  onChange: (logo: any) => void;
}

const BlogFeatureImage = ({ image, onChange }: CompanyLogoProps) => {
  const fileInputRef = useRef<any>(null);
  const [profileImg, setProfileImg] = useState(image);
  const [isLoading, setIsLoading] = useState(false);

  const handleEditClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files?.length) {
      setIsLoading(true);
      let result = await fileUploader(event.target?.files[0], "blog");
      if (result?.file) {
        setProfileImg(result.file);
        onChange(result.file);

        setIsLoading(false);
      }
    }
  };

  return (
    <div className="mx-auto sm:mx-0 w-32 h-32 relative overflow-hidden">
      <button
        type="button"
        disabled={isLoading}
        className="absolute z-10 -top-0 -right-0 rounded-full bg-orange-400 hover:bg-orange-400/80 transition p-2 text-white disabled:bg-secondary disabled:opacity-70"
        onClick={handleEditClick}
      >
        <PencilIcon className="w-5 h-5" />
      </button>
      <Image
        className="rounded-full object-cover object-center w-full h-full"
        src={getAssetPath(profileImg)}
        width={128}
        height={128}
        alt={`Blog Feature logo`}
      />
      <input
        type="file"
        onChange={handleImageChange}
        hidden
        ref={fileInputRef}
        accept="image/*"
      />
    </div>
  );
};

export default BlogFeatureImage;
