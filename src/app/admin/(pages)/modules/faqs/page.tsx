"use client";

import React, { useEffect, useState } from "react";
import { Faq } from "@prisma/client";

import Header from "./Header";
import Table from "./Table/Table";

import PageLoading from "@/components/Loading/PageLoading";

import SearchFilter from "@admin/_components/Filters/SearchFilter";
import Pagination from "@admin/_components/Pagination/Pagination";
import { getAllFAQs, getTotalFAQsCount } from "@/app/admin/_queries/faqQueries";

interface AdminCompaniesProps {
  searchParams: {
    page?: string;
    search?: string;
  };
}

const AdminFaqs = ({ searchParams }: AdminCompaniesProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isFetched, setIsFetched] = useState(false);
  const [totalFAQsCount, setTotalFAQsCount] = useState(0);
  const [faqs, setFaqs] = useState<Faq[]>([]);

  useEffect(() => {
    const getFAQs = async () => {
      setIsLoading(true);

      const allFaqs = await getAllFAQs(searchParams);
      setFaqs(allFaqs || []);

      const totalCompaniesCount = await getTotalFAQsCount(searchParams);
      setTotalFAQsCount(totalCompaniesCount || 0);

      setIsFetched(true);

      setIsLoading(false);
    };
    getFAQs();
  }, [searchParams]);

  return (
    <>
      <Header />
      <section className="p-6 bg-white rounded-2xl space-y-6">
        <div className="flex items-center justify-between">
          <div className="gap-5 mb-5">
            <div className="sm:w-96 max-w-full">
              <SearchFilter searchParams={searchParams} />
            </div>
          </div>
        </div>
        {isLoading ? (
          <div>
            <PageLoading />
          </div>
        ) : null}

        <Table faqs={faqs} isFetched={isFetched} />

        {faqs.length > 0 ? (
          <Pagination
            searchParams={searchParams}
            totalRecords={totalFAQsCount.toLocaleString()}
          />
        ) : null}
      </section>
    </>
  );
};

export default AdminFaqs;
