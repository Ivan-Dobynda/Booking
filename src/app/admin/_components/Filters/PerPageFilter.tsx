import React from "react";

const PerPageFilter = () => {
  return (
    <div>
      <select
        id="per-page"
        name="per-page"
        className="block w-full rounded-md border-0 py-4 pl-3 pr-8 text-neutral-600 ring-1 ring-inset ring-gray-200 focus:ring-2 focus:ring-brand-blue-300 sm:text-sm sm:leading-6"
      >
        <option>Records 10</option>
        <option>Records 15</option>
        <option>Records 30</option>
      </select>
    </div>
  );
};

export default PerPageFilter;
