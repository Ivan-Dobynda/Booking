import React from "react";
import Link from "next/link";
import { Blog } from "@prisma/client";

import { formatDate, removeHtmlTags, truncateString } from "@/lib/helpers";

import DeleteBlogButton from "./DeleteJobButton";
import { PiPencilSimple } from "react-icons/pi";

type TableProps = {
  blogs: Blog[];
  setBlogs: Function;
  setTotalBlogsCount: Function;
};

const Table = ({ blogs, setBlogs, setTotalBlogsCount }: TableProps) => {
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
                <span>Content</span>
              </div>
            </th>
            <th
              scope="col"
              className="bg-[#FAFAFA] text-left text-sm font-medium text-neutral-700"
            >
              <div className="p-4 w-full">
                <span>Active</span>
              </div>
            </th>
            <th
              scope="col"
              className="bg-[#FAFAFA] text-left text-sm font-medium text-neutral-700"
            >
              <div className="p-4 w-full">
                <span>Last updated</span>
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
          {blogs?.map((blog) => (
            <tr key={blog.id}>
              <td className="whitespace-nowrap py-3 pl-4 pr-3 text-sm text-gray-900 sm:pl-6">
                <a
                  href={blog.slug ?? ""}
                  target="_blank"
                  className="hover:text-primary"
                >
                  {truncateString(blog.title ?? "", 30)}
                </a>
              </td>

              <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-600">
                {truncateString(removeHtmlTags(blog.body ?? ""), 30)}
              </td>

              <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-600">
                {blog.isActive ? (
                  <span className="text-xs bg-blue-500 text-white px-2.5 py-1 rounded-full">
                    Active
                  </span>
                ) : (
                  <span className="text-xs bg-red-300 px-2.5 py-1 rounded-full">
                    In-active
                  </span>
                )}
              </td>

              <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-600">
                {formatDate(blog.updatedAt, "MMM DD, YYYY")}
              </td>

              <td className="px-4 py-3.5 text-neutral-800">
                <div className="flex gap-2.5 items-center">
                  <Link
                    href={`/admin/modules/blogs/${blog.id}/edit`}
                    className="inline-block p-2 text-lg rounded-lg text-white bg-blue-500 hover:bg-blue-600 transition"
                  >
                    <PiPencilSimple />
                  </Link>
                  <DeleteBlogButton
                    id={blog.id}
                    setBlogs={setBlogs}
                    setTotalBlogsCount={setTotalBlogsCount}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Table;
