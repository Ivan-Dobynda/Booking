"use client";
import React, { useEffect, useState } from "react";
import SearchIcon from "@admin/_assets/icons/Search.svg";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

interface SearchFilterProps {
  searchParams: any;
}

const SearchFilter = ({ searchParams }: SearchFilterProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const [searchValue, setSearchValue] = useState(searchParams?.search);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    router.push(
      `${pathname}${
        searchValue
          ? `?search=${searchValue}${
              searchParams?.per_page
                ? `&per_page=${searchParams?.per_page}`
                : ""
            }`
          : `${
              searchParams?.per_page
                ? `?per_page=${searchParams?.per_page}`
                : ""
            }`
      }`
    );
  };

  return (
    <form onSubmit={handleSubmit} className="relative flex items-center w-80">
      <input
        type="text"
        name="text"
        id="text"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        className="block w-full rounded-md border-0 pl-5 pr-12 py-4 text-neutral-500 ring-1 ring-inset ring-gray-200 placeholder:text-neutral-400 focus:ring-inset focus:ring-gray-300 sm:text-sm sm:leading-[22px]"
        placeholder="Search what you need"
      />
      <button className="absolute p-1 right-4">
        <Image src={SearchIcon} alt="Search"></Image>
      </button>
    </form>
  );
};

export default SearchFilter;
