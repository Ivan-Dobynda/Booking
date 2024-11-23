"use client";

import React, { useEffect, useState } from "react";
import Header from "./Header";
import Table from "./Table/Table";

import PageLoading from "@/components/Loading/PageLoading";

import SearchFilter from "@admin/_components/Filters/SearchFilter";
import Pagination from "@admin/_components/Pagination/Pagination";
import { Blog } from "@prisma/client";
import {
  fetchTotalBlogsCountAction,
  getAllBlogsAction,
} from "@/app/admin/_actions/blogActions";
import Button from "@/app/admin/_components/Button/Button";
import Link from "next/link";

interface AdminCompaniesProps {
  searchParams: {
    page?: string;
    search?: string;
  };
}

const AdminBlog = ({ searchParams }: AdminCompaniesProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [totalBlogsCount, setTotalBlogsCount] = useState(0);
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    const getBlogs = async () => {
      setIsLoading(true);
      const payload = {
        search: searchParams?.search,
        currentPage: searchParams?.page,
      };
      const allBlogs = await getAllBlogsAction(payload);
      setBlogs(allBlogs || []);
      setIsLoading(false);
    };
    getBlogs();
  }, [searchParams]);

  useEffect(() => {
    const getTotalCount = async () => {
      const totalBlogCount = await fetchTotalBlogsCountAction(
        searchParams?.search
      );
      setTotalBlogsCount(totalBlogCount || 0);
    };
    getTotalCount();
  }, [searchParams.search]);

  return (
    <>
      <Header />

      {isLoading ? (
        <div>
          <PageLoading />
        </div>
      ) : null}
      <section className="p-6 bg-white rounded-2xl space-y-6">
        {/* <div className="flex items-center justify-between"> */}
        <div className="gap-5 mb-5 flex justify-between items-center">
          <div className="sm:w-96 max-w-full">
            <SearchFilter searchParams={searchParams} />
          </div>
          <Link href="/admin/modules/blogs/categories">
            <Button>Manage Categories</Button>
          </Link>
        </div>
        {/* </div> */}

        <Table
          blogs={blogs}
          setBlogs={setBlogs}
          setTotalBlogsCount={setTotalBlogsCount}
        />

        <Pagination
          searchParams={searchParams}
          totalRecords={totalBlogsCount.toLocaleString()}
        />
      </section>
    </>
  );
};

export default AdminBlog;
