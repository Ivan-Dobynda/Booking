"use client";
import React, { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { yupResolver } from "@hookform/resolvers/yup";

import * as yup from "yup";
import { useRouter } from "next/navigation";
import { Blog, BlogCategory } from "@prisma/client";

import { IBlog } from "@admin/_utils/interfaces";

import {
  createBlogAction,
  getBlogCategoriesAction,
  updateBlogAction,
} from "@admin/_actions/blogActions";

import SelectInput from "@admin/_components/Form/SelectInput";
import Checkbox from "@admin/_components/Form/Checkbox";
import TextInput from "@admin/_components/Form/TextInput";
import TextArea from "@admin/_components/Form/TextArea";
import Button from "@admin/_components/Button/Button";
// import TextEditor from "@/_components/Forms/TextEditor";

import BlogFeatureImage from "./BlogFeatureImage";
import TextEditor from "../Form/TextEditor";

const validationSchema = yup.object().shape({
  lang: yup.string().required("Language is required"),
  blogCategoryId: yup.string().required("blog Category is required"),
  title: yup.string().required("Question is required"),
  slug: yup.string().required("Answer is required"),
  body: yup.string().required("Content is required"),
  metaTitle: yup.string(),
  metaKeywords: yup.string(),
  metaDescription: yup.string(),
  featured: yup.boolean(),
  isActive: yup.boolean(),
  image: yup.string(),
});

export type TOptions = {
  name: string;
  value: string;
};
type blogDetail = {
  blogDetail?: Blog | null;
  categories?: BlogCategory[] | null;
};
const languages = [
  {
    name: "English",
    value: "en",
  },
  {
    name: "Arabic",
    value: "ar",
  },
];

const BlogForm = (blog: blogDetail) => {
  const blogDetail = blog?.blogDetail;
  const blogId = blog?.blogDetail?.id;

  const blogCategoriesOptions = blog?.categories?.map((blogCategory) => ({
    name: blogCategory.title,
    value: blogCategory.id,
  }));

  const defaultValues = {
    lang: blogDetail?.lang || "",
    blogCategoryId: blogDetail?.blogCategoryId || "",
    title: blogDetail?.title || "",
    slug: blogDetail?.slug || "",
    body: blogDetail?.body || "",
    metaTitle: blogDetail?.metaTitle || "",
    metaKeywords: blogDetail?.metaKeywords || "",
    metaDescription: blogDetail?.metaDescription || "",
    featured: blogDetail?.featured || false,
    isActive: blogDetail?.isActive || false,
    image: blogDetail?.image || "",
  };

  const {
    handleSubmit,
    control,
    register,
    watch,
    formState: { isSubmitting, errors },
    setValue,
  } = useForm({
    defaultValues: { ...defaultValues },
    resolver: yupResolver(validationSchema),
  });

  const router = useRouter();

  const onSubmit: SubmitHandler<IBlog> = async (data) => {
    console.log("data: ", data);

    if (blogId) {
      const res = await updateBlogAction(data, blogId);
      if (!res?.id) {
        toast.error("An error occurred while updating Blog");
        return;
      }
      toast.success("Blog updated successfully");
      router.push("/admin/modules/blogs");
    } else {
      const res = await createBlogAction({ ...data });
      if (!res?.id) {
        toast.error("An error occurred while creating Blog");
        return;
      }
      toast.success("Blog created successfully");
      router.push("/admin/modules/blogs");
    }
  };

  // useEffect(() => {
  //   const getBlogCategories = async () => {
  //     const allblogCategories = await getBlogCategoriesAction();
  //     if (allblogCategories?.length) {
  //       const options = allblogCategories.map((blogCategory) => ({
  //         name: blogCategory.title,
  //         value: blogCategory.id,
  //       }));
  //       setBlogCategoriesOptions(options);
  //     }
  //   };
  //   getBlogCategories();
  // }, []);

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid sm:grid-cols-2 gap-x-6 gap-y-4">
          <div className="col-span-full">
            <Controller
              control={control}
              name="image"
              render={({ field }) => (
                <BlogFeatureImage
                  image={field.value || ""}
                  onChange={(image: string) => setValue("image", image)}
                />
              )}
            />
          </div>

          <div className="mt-5">
            <SelectInput
              label="Language"
              id="lang"
              className="w-full"
              options={languages}
              error={errors?.lang?.message}
              {...register("lang", { required: "Language is required" })}
            >
              <option value="">Select</option>
            </SelectInput>
          </div>

          <div className="flex mt-5">
            <div className="m-5">
              <Controller
                name="isActive"
                control={control}
                render={({ field }) => (
                  <Checkbox
                    label="Is active"
                    checked={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
            </div>
            <div className="m-5">
              <Controller
                name="featured"
                control={control}
                render={({ field }) => (
                  <Checkbox
                    label="Featured"
                    checked={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
            </div>
          </div>

          <SelectInput
            label="Blog Category"
            id="blogCategoryId"
            className="w-full"
            options={blogCategoriesOptions}
            error={errors?.blogCategoryId?.message}
            {...register("blogCategoryId", {
              required: "Blog Category is required",
            })}
          >
            <option value="">Select</option>
          </SelectInput>

          <div className="col-span-full">
            <TextInput
              type="text"
              label="Job Title"
              id="title"
              placeholder="title"
              className="w-full"
              error={errors?.title?.message}
              {...register("title", { required: "Job Title is required" })}
            />
          </div>

          <div className="col-span-full">
            <TextInput
              type="text"
              label="Slug"
              id="slug"
              placeholder="slug"
              className="w-full"
              error={errors?.slug?.message}
              {...register("slug", { required: "Slug is required" })}
            />
          </div>

          <div className="col-span-full">
            <Controller
              control={control}
              name="body"
              render={({ field }) => (
                <div className="col-span-full">
                  <TextEditor
                    label=""
                    error={errors?.[field.name]?.message}
                    value={field.value}
                    onChange={field.onChange}
                  />
                </div>
              )}
            />
          </div>

          <h3 className="text-neutral-500 text-base">SEO</h3>

          <div className="col-span-full">
            <TextInput
              type="text"
              label="Meta title"
              id="metaTitle"
              placeholder="meta title"
              className="w-full"
              error={errors?.metaTitle?.message}
              {...register("metaTitle")}
            />
          </div>

          <div className="col-span-full">
            <TextInput
              type="text"
              label="Meta keywords"
              id="metaKeywords"
              placeholder="meta keywords"
              className="w-full"
              error={errors?.metaKeywords?.message}
              {...register("metaKeywords")}
            />
          </div>

          <div className="col-span-full">
            <TextArea
              label="Meta description"
              placeholder="meta description"
              id="metaDescription"
              rows={5}
              error={errors?.metaDescription?.message}
              {...register("metaDescription")}
            />
          </div>

          <div className="col-span-full">
            <Button loading={isSubmitting} className="mt-5 font-medium">
              {!!blogDetail ? "Save" : "Create"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default BlogForm;
