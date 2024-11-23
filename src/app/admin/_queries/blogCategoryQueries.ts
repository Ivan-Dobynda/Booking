"use server";
import { prisma } from "@/lib/prisma";
import { BlogCategory } from "@prisma/client";

export const getBlogCategories = async () => {
  //   const limit = process.env.NEXT_PAGINATION_LIMIT as string;
  //   const currentPage = searchParams.page || 1;

  try {
    const categories = await prisma.blogCategory.findMany({
      where: {
        isActive: true,
      },
      //   skip: (currentPage - 1) * parseInt(limit),
      //   take: parseInt(limit),
      //   orderBy: [{ createdAt: "desc" }],
    });

    return categories;
  } catch (err) {
    console.log("err: ", err);
  }
};

export const getTotalBlogCategoriesCount = async () => {
  try {
    const categoriesCount = await prisma.blogCategory.count({
      where: {
        isActive: true,
      },
    });

    return categoriesCount;
  } catch (err) {
    console.log("err: ", err);
  }
};

export const createBlogCategory = async (data: {
  title: string;
  slug: string;
}) => {
  try {
    const alreadyExists = await prisma.blogCategory.findFirst({
      where: {
        slug: data.slug,
        isActive: true,
      },
      select: {
        title: true,
        slug: true,
      },
    });

    if (alreadyExists) {
      return {
        errorMessage: "Slug already exists",
      };
    }

    const newCategory = await prisma.blogCategory.create({
      data,
    });

    return { message: "Successfully created category" };
  } catch (err) {
    console.log("err: ", err);
    return { errorMessage: "Something went wrong" };
  }
};

export const editBlogCategory = async (data: {
  id: string;
  title: string;
  slug: string;
}) => {
  try {
    const alreadyExists = await prisma.blogCategory.findFirst({
      where: {
        id: {
          not: {
            equals: data.id,
          },
        },
        slug: data.slug,
        isActive: true,
      },
      select: {
        title: true,
        slug: true,
      },
    });

    if (alreadyExists) {
      return {
        errorMessage: "Slug already exists",
      };
    }

    const updatedCategory = await prisma.blogCategory.update({
      where: {
        id: data.id,
      },
      data: {
        title: data.title,
        slug: data.slug,
      },
    });

    return { message: "Successfully updated category" };
  } catch (err) {
    console.log("err: ", err);
    return { errorMessage: "Something went wrong" };
  }
};

export const deleteCategory = async (id: string) => {
  try {
    const category = await prisma.blogCategory.update({
      where: {
        id,
      },
      data: {
        isActive: false,
      },
    });

    return category?.isActive ? false : true;
  } catch (err) {
    console.log("err: ", err);
    return false;
  }
};
