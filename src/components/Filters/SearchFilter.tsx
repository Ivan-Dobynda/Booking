import React from "react";
import TextInput from "../Form/TextInput";
import { CiSearch } from "react-icons/ci";

const SearchFilter = () => {
  return (
    <form className="relative flex items-center gap-3">
      <span className="absolute text-2xl left-3 pointer-events-none">
        <CiSearch />
      </span>
      <div className="flex-1">
        <TextInput placeholder="Hotel name" className="pl-11 h-auto w-full" />
      </div>
      <button className="text-2xl text-white p-1 bg-brand-blue hover:bg-brand-blue-500 transition rounded-lg w-11 h-11 flex justify-center items-center">
        <CiSearch />
      </button>
    </form>
  );
};

export default SearchFilter;
