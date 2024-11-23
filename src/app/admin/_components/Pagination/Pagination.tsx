"use client";
import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import PageSelect from "./PageSelect";
import { classNames } from "@/lib/helpers";
import { usePathname, useRouter } from "next/navigation";
import PerPageSelect from "./PerPageSelect";

interface PaginationProps {
  searchParams: any;
  totalRecords: string;
  limitDynamic?: boolean;
}

const Pagination = ({
  searchParams,
  totalRecords,
  limitDynamic,
}: PaginationProps) => {
  const page = searchParams?.page ? Number(searchParams?.page) : 1;
  const limit = limitDynamic
    ? searchParams?.per_page || "20"
    : (process.env.NEXT_PUBLIC_PAGINATION_LIMIT as string);
  const totalPages = Math.ceil(Number(totalRecords) / Number(limit));

  console.log("totalPages: ", totalPages);

  const calculateStartIndex = () => {
    if (page) {
      return (page - 1) * parseInt(limit) + 1;
    } else {
      return 1;
    }
  };

  const calculateEndIndex = () => {
    if (page) {
      const end = page * parseInt(limit);
      return end > parseInt(totalRecords) ? parseInt(totalRecords) : end;
    } else {
      return parseInt(limit) < parseInt(totalRecords)
        ? parseInt(limit)
        : parseInt(totalRecords);
    }
  };

  const getPageQueryString = (page: number) => {
    const queryParams = [];

    // Add the "page" parameter
    queryParams.push(`page=${page}`);

    // Loop through the searchParams and add them to the array
    for (const [param, value] of Object.entries(searchParams)) {
      // Skip the "page" parameter
      if (param === "page") continue;

      // Check if the value is an array
      if (Array.isArray(value)) {
        value.forEach((p) => {
          queryParams.push(`${param}=${p}`);
        });
      } else {
        queryParams.push(`${param}=${value}`);
      }
    }

    // Combine the query parameters into a single string
    return queryParams.join("&");
  };

  const router = useRouter();
  const pathname = usePathname();

  const handlePagination = (action: "prev" | "next" | number) => {
    if (action === "next") {
      router.push(`${pathname}?${getPageQueryString(page + 1)}`);
      return;
    }
    if (action === "prev") {
      router.push(`${pathname}?${getPageQueryString(page - 1)}`);
      return;
    }

    router.push(`${pathname}?${getPageQueryString(action)}`);
  };

  return (
    <div className="flex justify-between items-center">
      {limitDynamic ? <PerPageSelect /> : null}

      <div className="flex gap-5">
        <button
          onClick={() => handlePagination("prev")}
          disabled={page == 1}
          className={classNames(
            page == 1
              ? "text-neutral-500 border-neutral-200 cursor-default"
              : "text-primary border-primary hover:bg-primary/20",
            "border text-[15px] rounded-lg inline-flex items-center justify-center w-8 h-8"
          )}
        >
          <FaChevronLeft />
        </button>

        <div className="border text-sm font-semibold rounded-lg text-primary border-transparent bg-primary/10 inline-flex items-center justify-center min-w-8 h-8">
          <span>{page}</span>
        </div>
        <button
          onClick={() => handlePagination("next")}
          disabled={page == totalPages}
          className={classNames(
            page == totalPages
              ? "text-neutral-500 border-neutral-200 cursor-default"
              : "text-primary border-primary hover:bg-primary/20",
            "border text-[15px] rounded-lg inline-flex items-center justify-center w-8 h-8"
          )}
        >
          <FaChevronRight />
        </button>
      </div>
      <div className="flex items-center gap-4">
        <p className="text-sm text-neutral-500">
          Showing {calculateStartIndex()} to {calculateEndIndex()} of{" "}
          {totalRecords} entries
        </p>

        <PageSelect
          handlePagination={handlePagination}
          page={page}
          totalPages={totalPages}
        />
      </div>
    </div>
  );
};

export default Pagination;
