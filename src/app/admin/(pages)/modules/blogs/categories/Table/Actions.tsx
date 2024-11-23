"use client";
import React, { useState } from "react";
import { PiPencilSimple } from "react-icons/pi";
import { BlogCategory } from "@prisma/client";

import CategoryModal from "../Modal/CategoryModal";
import { RiDeleteBinLine } from "react-icons/ri";
import DangerModal from "@/components/Modals/DangerModal";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { deleteCategory } from "@/app/admin/_queries/blogCategoryQueries";

interface ActionsProps {
  category: BlogCategory;
}
const Actions = ({ category }: ActionsProps) => {
  const [editModalOpen, setEditModalOpen] = useState(false);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const router = useRouter();

  const handleDelete = async () => {
    setIsDeleting(true);

    setDeleteModalOpen(false);
    setIsDeleting(true);

    const deleted = await deleteCategory(category?.id);

    setIsDeleting(false);

    if (deleted) {
      toast.success("Category has been deleted");
      router.refresh();
    } else {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="flex gap-2.5 items-center">
      <div>
        <CategoryModal
          category={category}
          open={editModalOpen}
          setOpen={setEditModalOpen}
        />
        <button
          onClick={() => setEditModalOpen(true)}
          className="inline-block p-2 text-lg rounded-lg text-white bg-blue-500 hover:bg-blue-600 transition"
        >
          <PiPencilSimple />
        </button>
      </div>

      <div>
        <DangerModal
          open={deleteModalOpen}
          setOpen={(open) => setDeleteModalOpen(open)}
          primaryClick={() => handleDelete()}
          title="Delete Category"
          description="Are you sure want to delete the category?"
        />
        <button
          onClick={() => setDeleteModalOpen(true)}
          disabled={isDeleting}
          className="inline-block p-2 text-lg rounded-lg text-white bg-red-500 hover:bg-red-600 transition disabled:bg-red-500 disabled:opacity-80"
        >
          <RiDeleteBinLine />
        </button>
      </div>
    </div>
  );
};

export default Actions;
