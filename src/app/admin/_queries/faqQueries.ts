"use server";

import { prisma } from "@/lib/prisma";
import { IFAQs } from "@admin/_components/FAQs/CreateFAQForm";

const getFaqFilters = (searchParams: any) => {
  const where: any = {};

  if (searchParams?.lang) {
    where.lang = searchParams?.lang;
  }

  if (searchParams?.search) {
    where.OR = [
      {
        question: {
          contains: searchParams?.search?.toLowerCase(),
          mode: "insensitive",
        },
      },
      {
        answer: {
          contains: searchParams?.search?.toLowerCase(),
          mode: "insensitive",
        },
      },
    ];
  }

  return where;
};

export const getAllFAQs = async (searchParams?: any, isFAQPage?: boolean) => {
  // const { search, currentPage, isFAQPage } = data;
  const limit: any = isFAQPage ? isFAQPage : process.env.NEXT_PAGINATION_LIMIT;
  const page = searchParams?.page ? parseInt(searchParams?.page) : 1;

  let orderByClause: {} | [] = isFAQPage
    ? [{ sortOrder: "asc" }, { createdAt: "desc" }]
    : { createdAt: "desc" };

  const searchParamsObject = { ...searchParams };

  if (isFAQPage) searchParamsObject.lang = "en";

  const paginationOptions: any = {};

  if (!isFAQPage) {
    paginationOptions.skip = (page - 1) * parseInt(limit);
    paginationOptions.take = parseInt(limit);
  }

  return prisma.faq.findMany({
    where: getFaqFilters(searchParamsObject),
    orderBy: orderByClause,
    ...paginationOptions,
  });
};

export const getTotalFAQsCount = async (
  searchParams: any,
  isFAQPage?: boolean
) => {
  const searchParamsObject = { ...searchParams };

  if (isFAQPage) searchParamsObject.lang = "en";

  return prisma.faq.count({
    where: getFaqFilters(searchParamsObject),
  });
};

export const getFAQById = async (id: string) => {
  return prisma.faq.findUnique({
    where: {
      id: id,
    },
  });
};

export const createFAQ = async (data: IFAQs) => {
  return prisma.faq.create({
    data: {
      lang: data.language,
      question: data.question,
      answer: data.answer,
      sortOrder: data.order,
    },
  });
};

export const updateFAQ = async (data: IFAQs, id: string) => {
  return prisma.faq.update({
    where: {
      id: id,
    },
    data: {
      answer: data.answer,
      question: data.question,
      lang: data.language,
      sortOrder: data.order,
    },
  });
};

export const deleteFAQ = async (id: string) => {
  return prisma.faq.delete({
    where: {
      id: id,
    },
  });
};
