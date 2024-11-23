import React from "react";
import Link from "next/link";
import { Faq } from "@prisma/client";

import { formatDate, removeHtmlTags, truncateString } from "@/lib/helpers";

import { PiPencilSimple } from "react-icons/pi";

import DeleteFAQButton from "./DeleteButton";

interface TableProps {
  faqs: Faq[];
  isFetched: boolean;
}

const Table = ({ faqs, isFetched }: TableProps) => {
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
                <span>Language</span>
              </div>
            </th>
            <th
              scope="col"
              className="bg-[#FAFAFA] text-left text-sm font-medium text-neutral-700"
            >
              <div className="p-4 w-full">
                <span>Question</span>
              </div>
            </th>
            <th
              scope="col"
              className="bg-[#FAFAFA] text-left text-sm font-medium text-neutral-700"
            >
              <div className="p-4 w-full">
                <span>Answer</span>
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
          {faqs?.map((faq) => (
            <tr key={faq.id}>
              <td className="whitespace-nowrap py-3 pl-4 pr-3 text-sm text-gray-900 sm:pl-6">
                {faq.lang}
              </td>

              <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-600">
                {truncateString(removeHtmlTags(faq.question ?? ""), 40)}
              </td>

              <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-600">
                {truncateString(removeHtmlTags(faq.answer ?? ""), 40)}
              </td>
              <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-600">
                {formatDate(faq.createdAt, "MMM DD, YYYY")}
              </td>

              <td className="px-4 py-3.5 text-neutral-800">
                <div className="flex gap-2.5 items-center">
                  <Link
                    href={`/admin/modules/faqs/${faq.id}/edit`}
                    className="inline-block p-2 text-lg rounded-lg text-white bg-blue-500 hover:bg-blue-600 transition"
                  >
                    <PiPencilSimple />
                  </Link>
                  <DeleteFAQButton id={faq.id} />
                </div>
              </td>
            </tr>
          ))}
          {isFetched && !faqs.length ? (
            <tr>
              <td className="py-5 px-4 text-center text-gray-700" colSpan={5}>
                No Faqs Found!
              </td>
            </tr>
          ) : null}
        </tbody>
      </table>
    </>
  );
};

export default Table;
