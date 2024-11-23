"use client";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

import { RiDeleteBinLine } from "react-icons/ri";

import { deleteFAQ } from "@/app/admin/_queries/faqQueries";
import DangerModal from "@/components/Modals/DangerModal";

interface DeleteJobButtonProps {
  id: string;
}

const DeleteFAQButton = ({ id }: DeleteJobButtonProps) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const [confirmationModalOpen, setConfirmationModalOpen] = useState(false);

  const handleDeleteFAQ = async (id: string) => {
    setConfirmationModalOpen(false);

    setIsDeleting(true);
    await deleteFAQ(id);

    setIsDeleting(false);
    toast.success("FAQ has been deleted");

    router.push("/admin/modules/faqs");
  };

  return (
    <>
      <DangerModal
        open={confirmationModalOpen}
        setOpen={(open) => setConfirmationModalOpen(open)}
        primaryClick={() => handleDeleteFAQ(id)}
        title="Delete FAQ"
        description="Are you sure want to delete the FAQ?"
      />
      <button
        onClick={() => setConfirmationModalOpen(true)}
        disabled={isDeleting}
        className="inline-block p-2 text-lg rounded-lg text-white bg-red-500 hover:bg-red-600 transition"
      >
        <RiDeleteBinLine />
      </button>
    </>
  );
};

export default DeleteFAQButton;
