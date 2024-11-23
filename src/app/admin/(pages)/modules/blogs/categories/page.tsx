"use client";

import React, { useEffect, useState } from "react";
import Header from "./Header";
import Table from "./Table/Table";

import PageLoading from "@/components/Loading/PageLoading";

import SearchFilter from "@admin/_components/Filters/SearchFilter";
import Pagination from "@admin/_components/Pagination/Pagination";
import { Blog, BlogCategory } from "@prisma/client";
import {
  fetchTotalBlogsCountAction,
  getAllBlogsAction,
} from "@/app/admin/_actions/blogActions";
import { getBlogCategories } from "@/app/admin/_queries/blogCategoryQueries";

interface AdminBlogCategoriesProps {
  searchParams: {
    page?: string;
    search?: string;
  };
}

const AdminBlogCategories = ({ searchParams }: AdminBlogCategoriesProps) => {
  const [isLoading, setIsLoading] = useState(false);
  // const [totalCategoriesCount, setTotalCategoriesCount] = useState(0);
  const [categories, setCategories] = useState<BlogCategory[]>([]);

  useEffect(() => {
    const getCategories = async () => {
      setIsLoading(true);
      const allCategories = await getBlogCategories();

      setCategories(allCategories || []);
      setIsLoading(false);
    };
    getCategories();
  }, [searchParams]);

  // useEffect(() => {
  //   const getTotalCount = async () => {
  //     const totalBlogCount = await fetchTotalBlogsCountAction();
  //     setTotalCategoriesCount(totalBlogCount || 0);
  //   };
  //   getTotalCount();
  // }, [searchParams]);

  return (
    <>
      <Header />

      {isLoading ? (
        <div>
          <PageLoading />
        </div>
      ) : null}
      <section className="p-6 bg-white rounded-2xl space-y-6">
        {/* <div className="flex items-center justify-between">
          <div className="gap-5 mb-5">
            <div className="sm:w-96 max-w-full">
              <SearchFilter searchParams={searchParams} />
            </div>
          </div>
        </div> */}
        <Table categories={categories} />
      </section>
    </>
  );
};

export default AdminBlogCategories;
