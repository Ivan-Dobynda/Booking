import { Fragment, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { BlogCategory } from "@prisma/client";

import TextInput from "@/app/admin/_components/Form/TextInput";
import {
  createBlogCategory,
  editBlogCategory,
} from "@/app/admin/_queries/blogCategoryQueries";
import { convertToSlug } from "@/lib/helpers";

interface CategoryModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  category?: BlogCategory;
}

export default function CategoryModal({
  open,
  setOpen,
  category,
}: CategoryModalProps) {
  const defaultValues = {
    title: category?.title || "",
    slug: category?.slug || "",
  };

  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues,
  });

  const onSubmit = async (data: typeof defaultValues) => {
    const res = category?.id
      ? await editBlogCategory({
          id: category?.id,
          title: data.title,
          slug: convertToSlug(data.slug),
        })
      : await createBlogCategory({
          title: data.title,
          slug: convertToSlug(data.slug),
        });

    if (res?.message) {
      toast.success(res?.message);
      setOpen(false);
      router.refresh();
      return;
    }

    if (res?.errorMessage) {
      toast.error(res?.errorMessage);
    }
  };

  useEffect(() => {
    if (open) {
      reset({
        title: category?.title || "",
        slug: category?.slug || "",
      });
    }
  }, [open, category]);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div>
                    <header className="text-center">
                      <Dialog.Title
                        as="h3"
                        className="text-base font-semibold leading-6 text-gray-900"
                      >
                        {category?.id ? "Edit Category" : "Add Category"}
                      </Dialog.Title>
                    </header>
                    <div className="mt-6 space-y-5">
                      <TextInput
                        label="Title"
                        inputSize="small"
                        type="text"
                        id="category-title"
                        {...register("title", {
                          required: "Title is required.",
                        })}
                        error={errors?.title?.message}
                      />
                      <TextInput
                        label="Slug"
                        inputSize="small"
                        type="text"
                        id="category-slug"
                        {...register("slug", { required: "Slug is required." })}
                        error={errors?.slug?.message}
                      />
                    </div>
                  </div>
                  <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                    <button
                      disabled={isSubmitting}
                      className="inline-flex justify-center w-full rounded-md bg-brand-blue px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-brand-blue-400 disabled:bg-opacity-70 sm:ml-3 sm:w-20"
                    >
                      {category?.id ? "Edit" : "Add"}
                    </button>
                    <button
                      type="button"
                      className="mt-3 inline-flex justify-center w-full rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-20"
                      onClick={() => setOpen(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
