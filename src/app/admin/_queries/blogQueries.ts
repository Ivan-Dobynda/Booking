"use server";

import { prisma } from "@/lib/prisma";
import { IBlog } from "../_utils/interfaces";

export const getAllBlogs = async (data: any) => {
  const { search, currentPage } = data;
  const limit = process.env.NEXT_PAGINATION_LIMIT as string;
  const page: any = currentPage || 1;
  let whereClause: any = {};
  if (search) {
    whereClause.OR = [
      {
        body: {
          contains: search?.toLowerCase(),
          mode: "insensitive",
        },
      },
      {
        title: {
          contains: search?.toLowerCase(),
          mode: "insensitive",
        },
      },
    ];
  }

  return prisma.blog.findMany({
    where: whereClause,
    skip: (page - 1) * parseInt(limit),
    take: parseInt(limit),
    orderBy: [{ createdAt: "desc" }],
  });
};

export const getTotalBlogsCount = async (search?: string) => {
  let whereClause: any = {};
  if (search) {
    whereClause.OR = [
      {
        body: {
          contains: search?.toLowerCase(),
          mode: "insensitive",
        },
      },
      {
        title: {
          contains: search?.toLowerCase(),
          mode: "insensitive",
        },
      },
    ];
  }

  return prisma.blog.count({
    where: whereClause,
  });
};

export const getBlogById = async (id: string) => {
  return prisma.blog.findUnique({
    where: {
      id: id,
    },
  });
};

export const createBlog = async (data: IBlog) => {
  return prisma.blog.create({
    data: {
      lang: data.lang,
      title: data.title,
      body: data.body,
      slug: data.slug,
      metaTitle: data.metaTitle,
      metaKeywords: data.metaKeywords,
      metaDescription: data.metaDescription,
      featured: data.featured,
      isActive: data.isActive,
      blogCategoryId: data.blogCategoryId,
      image: data.image,
    },
  });
};

export const updateBlog = async (data: IBlog, id: string) => {
  return prisma.blog.update({
    where: {
      id: id,
    },
    data: {
      lang: data.lang,
      title: data.title,
      body: data.body,
      slug: data.slug,
      metaTitle: data.metaTitle,
      metaKeywords: data.metaKeywords,
      metaDescription: data.metaDescription,
      featured: data.featured,
      isActive: data.isActive,
      blogCategoryId: data.blogCategoryId,
      image: data.image,
    },
  });
};

export const deleteBlog = async (id: string) => {
  return prisma.blog.delete({
    where: {
      id: id,
    },
  });
};

// Front App
export const getBlogPosts = () => {
  return prisma.blog.findMany({
    where: {
      isActive: true,
    },
    include: {
      blogCategory: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};
