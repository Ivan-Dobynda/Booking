import React from "react";
import Link from "next/link";

import H2 from "@/app/admin/_components/Typo/H2";

import UserIcon from "@admin/_assets/icons/user.svg";
import UserCheckIcon from "@admin/_assets/icons/user-check-bottom.svg";
import UserSheildIcon from "@admin/_assets/icons/user-shield.svg";
import StatsCard from "../StatsCard/StatsCard";
import { FaSort } from "react-icons/fa";
import Checkbox from "@/app/admin/_components/Form/Checkbox";

const Users = () => {
  const users = [
    { name: "KeithQuaseAj KeithQuaseaj", email: "iaschimmerwingl@gmail.com" },
    { name: "KeithQuaseAj KeithQuaseaj", email: "iaschimmerwingl@gmail.com" },
    { name: "KeithQuaseAj KeithQuaseaj", email: "iaschimmerwingl@gmail.com" },
    { name: "KeithQuaseAj KeithQuaseaj", email: "iaschimmerwingl@gmail.com" },
  ];
  return (
    <section className="p-5 2xl:p-6 rounded-2xl bg-white">
      <header className="flex items-center justify-between mb-6">
        <div className="space-y-1">
          <H2>Recent Registered User</H2>
          <h4 className="text-xs text-neutral-500 pl-3">
            Stay Updated with Our Latest Members
          </h4>
        </div>
        <div>
          <Link
            href="#"
            className="text-sm text-brand-blue-300 hover:underline"
          >
            View All
          </Link>
        </div>
      </header>
      <div className="grid grid-cols-3 gap-2 mb-6">
        <StatsCard
          image={UserIcon}
          percentage="40.7%"
          title="Today's Users"
          numbers="480"
          color="primary"
        />
        <StatsCard
          image={UserCheckIcon}
          percentage="40.7%"
          title="Active Users"
          numbers="76,805"
          color="indigo"
        />
        <StatsCard
          image={UserSheildIcon}
          percentage="40.7%"
          title="Verified Users"
          numbers="56,200"
          color="green"
        />
      </div>
      <div className=" ">
        <table className="min-w-full">
          <thead className="">
            <tr className=" ">
              <th
                scope="col"
                className="bg-[#FAFAFA] rounded-l-[10px] text-left text-sm font-medium text-neutral-700"
              >
                <button className="flex justify-between items-center p-4 w-full">
                  <span>Name</span>
                  <span className="text-neutral-400">
                    <FaSort />
                  </span>
                </button>
              </th>
              <th
                scope="col"
                className="bg-[#FAFAFA] rounded-r-[10px] text-left text-sm font-medium text-neutral-700"
              >
                <button className="flex justify-between items-center p-4 w-full">
                  <span>Email</span>
                  <span className="text-neutral-400">
                    <FaSort />
                  </span>
                </button>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {users?.map((user, index) => (
              <tr key={index}>
                <td className="p-4 text-neutral-800 text-xs font-medium">
                  <div className="flex items-center gap-3">
                    <Checkbox />
                    <span className="">{user?.name}</span>
                  </div>
                </td>
                <td className="p-4 text-neutral-600 text-xs font-medium">
                  {user?.email}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Users;
