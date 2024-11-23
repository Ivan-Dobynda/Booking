import React from "react";
import Checkbox from "../Form/Checkbox";

interface FilterTypes {
  title: string;
}

const Filter = ({ title }: FilterTypes) => {
  return (
    <div>
      <header className="flex justify-between pb-2.5 lg:pb-3 mb-2.5 lg:mb-3 border-b border-b-gray-200">
        <h4 className="text-sm lg:text-base leading-none font-medium text-brand-neutral-800">
          {title}
        </h4>
        <h4 className="text-sm lg:text-base leading-none font-medium text-brand-neutral-800">
          From
        </h4>
      </header>
      <ul className="space-y-3.5 mb-3">
        <li className="flex justify-between">
          <Checkbox label="United (13)" />
          <span className="leading-none text-brand-neutral-600 text-sm">
            $2.304
          </span>
        </li>
        <li className="flex justify-between">
          <Checkbox label="2+Stops (27)" />
          <span className="leading-none text-brand-neutral-600 text-sm">
            $4.304
          </span>
        </li>
      </ul>
      <div>
        <button className="text-brand-neutral-800 hover:text-brand-neutral-600 transition font-medium leading-none text-xs sm:text-sm">
          Show more
        </button>
      </div>
    </div>
  );
};

export default Filter;
