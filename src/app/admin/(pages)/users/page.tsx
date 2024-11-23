import React from "react";
import Link from "next/link";
import { AiOutlinePlus } from "react-icons/ai";

import Button from "@admin/_components/Button/Button";
import H1 from "@admin/_components/Typo/H1";

import Table from "./Table/Table";

const page = () => {
  return (
    <>
      <header className="mb-8 flex items-center justify-between">
        <div>
          <H1>Admin Users</H1>
          <h3 className="text-neutral-500 text-base">
            Empowering Control and Efficiency in System Management
          </h3>
        </div>
        <div>
          <Link href="/admin/users/create">
            <Button
              className="gap-2 h-full"
              startIcon={
                <span className="text-xl">
                  <AiOutlinePlus />
                </span>
              }
            >
              Add New
            </Button>
          </Link>
        </div>
      </header>
      <section className="p-6 bg-white rounded-2xl space-y-6">
        {/* <div className="flex items-center justify-between">
          <PerPageFilter />
          
          <div className="flex gap-5">
            <SearchFilter />
            <Link href="/admin/users/create">
              <Button
                className="gap-2 h-full"
                startIcon={
                  <span className="text-xl">
                    <AiOutlinePlus />
                  </span>
                }
              >
                Add New
              </Button>
            </Link>
          </div>
        </div> */}
        <Table />
        {/* <Pagination /> */}
      </section>
    </>
  );
};

export default page;
