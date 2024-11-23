import Image from "next/image";
import React from "react";

import { fetchAdminUsers } from "@admin/_queries/userQueries";
import { formatDate } from "@/lib/helpers";

import AvatarImage from "@/assets/images/default-avatar.jpg";
import Actions from "./Actions";

const Table = async () => {
  const users = await fetchAdminUsers();

  return (
    <div>
      <table className="min-w-full border-b border-gray-100">
        <thead className="">
          <tr className="">
            <th
              scope="col"
              className="bg-[#FAFAFA] rounded-l-[10px] text-left text-sm font-medium text-neutral-700"
            >
              <div className="flex justify-between items-center p-4 w-full">
                <span>Name</span>
                {/* <span className="text-neutral-400">
                  <FaSort />
                </span> */}
              </div>
            </th>
            <th
              scope="col"
              className="bg-[#FAFAFA] text-left text-sm font-medium text-neutral-700"
            >
              <div className="flex justify-between items-center p-4 w-full">
                <span>Email</span>
                {/* <span className="text-neutral-400">
                  <FaSort />
                </span> */}
              </div>
            </th>
            <th
              scope="col"
              className="bg-[#FAFAFA] text-left text-sm font-medium text-neutral-700"
            >
              <div className="flex justify-between items-center p-4 w-full">
                <span>Role</span>
                {/* <span className="text-neutral-400">
                  <FaSort />
                </span> */}
              </div>
            </th>
            <th
              scope="col"
              className="bg-[#FAFAFA] text-left text-sm font-medium text-neutral-700"
            >
              <div className="flex justify-between items-center p-4 w-full">
                <span>Created at</span>
                {/* <span className="text-neutral-400">
                  <FaSort />
                </span> */}
              </div>
            </th>
            <th
              scope="col"
              className="bg-[#FAFAFA] rounded-r-[10px] text-left text-sm font-medium text-neutral-700"
            >
              <div className="p-4 w-full">
                <span>Actions</span>
              </div>
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 bg-white">
          {users?.map((user, index) => (
            <tr key={index} className="even:bg-[#f9fafb] align-middle">
              <td className="px-4 py-3.5 text-neutral-700 font-medium text-sm">
                {/* <div className="inline-flex items-center gap-3"> */}
                <Image
                  width={34}
                  height={34}
                  className="rounded-full inline-block mr-3"
                  src={AvatarImage}
                  alt="User Image"
                />
                <span>
                  {user?.firstName} {user?.lastName}
                </span>
                {/* </div> */}
              </td>
              <td className="px-4 py-3.5 text-sm text-neutral-700">
                {user.email}
              </td>
              <td className="px-4 py-3.5 text-neutral-800">
                <span className="inline-block px-3 border leading-7 text-sm rounded-full bg-gray-100 text-gray-600">
                  {user.role?.replace("_", " ")}
                </span>
                {/* <span className="inline-block px-2.5 leading-7 text-sm rounded-full bg-cyan-100 text-cyan-500">
                </span> */}
              </td>
              <td className="px-4 py-3.5 text-neutral-800 text-sm">
                {formatDate(user.createdAt)}
              </td>
              <td className="px-4 py-3.5 text-neutral-800">
                <Actions userId={user?.id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
