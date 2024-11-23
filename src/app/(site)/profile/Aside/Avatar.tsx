"use client";
import React, { useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import Image from "next/image";

import { IoCameraOutline } from "react-icons/io5";

import { fileUploader, getAssetPath } from "@/lib/fileUploader";
import { updateProfileImage } from "@/lib/services/profileService";

import Loading from "@/components/Loading/Loading";

interface AvatarProps {
  image: string | null;
}

const Avatar = ({ image }: AvatarProps) => {
  const fileInputRef = useRef<any>(null);
  const [profileImg, setProfileImg] = useState(image || "");
  const [isLoading, setIsLoading] = useState(false);

  const { update } = useSession();

  const handleEditClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!event.target.files?.length) return;

    setIsLoading(true);

    try {
      let result = await fileUploader(event.target?.files[0], "users");

      if (result?.file) {
        const res = await updateProfileImage({ image: result.file });

        console.log("res: ", res);

        if (res.error) {
          toast.error(res?.error);
          return;
        }
        setProfileImg(result.file);
        update({ image: result.file });
        if (res?.message) toast.success(res?.message);
      }
    } catch (error) {
      console.log("error details >>> ", error);
      alert(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="w-16 lg:w-20 h-16 lg:h-20 shrink-0 relative">
        <Image
          width={80}
          height={80}
          src={getAssetPath(profileImg || "")}
          alt={"Profile Image"}
          className="w-full h-full border border-gray-100 rounded-full object-cover object-center"
        />
        {isLoading ? (
          <div className="absolute inset-0 bg-black/60 rounded-full z-10 flex items-center justify-center">
            <Loading className="text-white h-9 w-9" />
          </div>
        ) : null}
        <button
          disabled={isLoading}
          onClick={handleEditClick}
          className="text-xl text-white bg-brand-black-900 border-2 rounded-full p-[5px] hover:opacity-90 transition absolute -right-1.5 -bottom-1.5 z-20 disabled:opacity-70"
        >
          <IoCameraOutline />
        </button>
      </div>

      <input
        type="file"
        onChange={handleImageChange}
        hidden
        ref={fileInputRef}
        accept="image/*"
      />
    </>
  );
};

export default Avatar;
