import React from "react";
import Link from "next/link";
import { Blog, BlogCategory } from "@prisma/client";

import { formatDate, truncateString } from "@/lib/helpers";

// import DeleteBlogButton from "./DeleteJobButton";
import Actions from "./Actions";

type TableProps = {
  categories: BlogCategory[];
};

const Table = ({ categories }: TableProps) => {
  return (
    <>
      <table className="min-w-full border-b border-gray-100">
        <thead className="">
          <tr>
            <th
              scope="col"
              className="bg-[#FAFAFA] rounded-l-[10px] text-left text-sm font-medium text-neutral-700"
            >
              <div className="p-4 w-full">
                <span>Title</span>
              </div>
            </th>
            <th
              scope="col"
              className="bg-[#FAFAFA] text-left text-sm font-medium text-neutral-700"
            >
              <div className="p-4 w-full">
                <span>Created at</span>
              </div>
            </th>
            <th
              scope="col"
              className="bg-[#FAFAFA] text-left text-sm font-medium text-neutral-700"
            >
              <div className="p-4 w-full">
                <span>Actions</span>
              </div>
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {categories?.map((category) => (
            <tr key={category.id}>
              <td className="whitespace-nowrap py-3 pl-4 pr-3 text-sm text-gray-900 sm:pl-6">
                {truncateString(category.title ?? "", 30)}
              </td>

              <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-600">
                {formatDate(category.createdAt, "MMM DD, YYYY")}
              </td>

              <td className="px-4 py-3.5 text-neutral-800">
                <Actions category={category} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Table;
