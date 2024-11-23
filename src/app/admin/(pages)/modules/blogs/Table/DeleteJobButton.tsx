"use client";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { usePathname, useRouter } from "next/navigation";
import { TrashIcon } from "@heroicons/react/24/outline";

import {
  deleteBlogAction,
  fetchTotalBlogsCountAction,
  getAllBlogsAction,
} from "@admin/_actions/blogActions";

import DangerModal from "@/components/Modals/DangerModal";
import { RiDeleteBinLine } from "react-icons/ri";

interface DeleteJobButtonProps {
  id: string;
  setBlogs: Function;
  setTotalBlogsCount: Function;
}

const DeleteBlogButton = ({
  id,
  setBlogs,
  setTotalBlogsCount,
}: DeleteJobButtonProps) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const [confirmationModalOpen, setConfirmationModalOpen] = useState(false);

  const getBlogs = async () => {
    const allBlogs = await getAllBlogsAction({});
    setBlogs(allBlogs || []);
  };

  const getTotalCount = async () => {
    const totalBlogCount = await fetchTotalBlogsCountAction();
    setTotalBlogsCount(totalBlogCount || 0);
  };

  const deleteBlog = async (id: string) => {
    setConfirmationModalOpen(false);
    setIsDeleting(true);
    await deleteBlogAction(id);
    await getBlogs();
    await getTotalCount();

    setIsDeleting(false);
    toast.success("Blog has been deleted");

    router.push("/admin/modules/blogs");
  };

  return (
    <>
      <DangerModal
        open={confirmationModalOpen}
        setOpen={(open) => setConfirmationModalOpen(open)}
        primaryClick={() => deleteBlog(id)}
        title="Delete Blog"
        description="Are you sure want to delete the Blog?"
      />

      <button
        onClick={() => setConfirmationModalOpen(true)}
        disabled={isDeleting}
        className="inline-block p-2 text-lg rounded-lg text-white bg-red-500 hover:bg-red-600 transition disabled:bg-red-500 disabled:opacity-80"
      >
        <RiDeleteBinLine />
      </button>
    </>
  );
};

export default DeleteBlogButton;
