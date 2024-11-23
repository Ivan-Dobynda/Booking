"use server";

import { getServerSession } from "next-auth";

import {
  createBlog,
  deleteBlog,
  getAllBlogs,
  getBlogById,
  getTotalBlogsCount,
  updateBlog,
} from "@admin/_queries/blogQueries";
import authOptions from "@/lib/auth/authOptions";
import { IBlog } from "../_utils/interfaces";
import { getBlogCategories } from "../_queries/blogCategoryQueries";

type Targs = {
  search?: string;
  currentPage?: string;
};

export const getAllBlogsAction = async (args: Targs) => {
  const data = {
    search: args.search,
    currentPage: args.currentPage,
  };
  return await getAllBlogs(data);
};

export const getBlogCategoriesAction = async () => {
  return await getBlogCategories();
};

export const fetchTotalBlogsCountAction = async (search?: string) => {
  return await getTotalBlogsCount(search);
};

export const getBlogAction = async (id: string) => {
  return await getBlogById(id);
};

// Tip: Fix any Type
export const createBlogAction = async (data: any) => {
  await getServerSession(authOptions);

  return await createBlog({
    ...data,
  });
};

export const updateBlogAction = async (data: IBlog, id: string) => {
  return await updateBlog(data, id);
};

export const deleteBlogAction = async (id: string) => {
  return await deleteBlog(id);
};
