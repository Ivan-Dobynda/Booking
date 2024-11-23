import React from "react";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";

const Pagination = () => {
  return (
    <div className="max-w-2xl flex items-center justify-between mx-auto">
      <button className="flex items-center gap-2 text-brand-neutral-600 hover:text-brand-neutral-800 transition">
        <span className="text-xl">
          <FiArrowLeft />
        </span>
        <span className="text-base font-medium">Previous</span>
      </button>
      <ul className="flex items-center gap-1">
        <li>
          <button className="w-10 h-10 flex text-[15px] items-center justify-center rounded-full text-white bg-brand-blue">
            <span className="leading-none">1</span>
          </button>
        </li>
        <li>
          <button className="w-10 h-10 flex text-[15px] font-medium items-center justify-center rounded-full text-brand-neutral-600 hover:text-brand-neutral-800 hover:bg-gray-100 transition">
            <span className="leading-none">2</span>
          </button>
        </li>
        <li>
          <button className="w-10 h-10 flex text-[15px] font-medium items-center justify-center rounded-full text-brand-neutral-600 hover:text-brand-neutral-800 hover:bg-gray-100 transition">
            <span className="leading-none">3</span>
          </button>
        </li>
        <li>
          <button className="w-10 h-10 flex text-[15px] items-center justify-center">
            <span>...</span>
          </button>
        </li>
        <li>
          <button className="w-10 h-10 flex text-[15px] font-medium items-center justify-center rounded-full text-brand-neutral-600 hover:text-brand-neutral-800 hover:bg-gray-100 transition">
            <span className="leading-none">8</span>
          </button>
        </li>
        <li>
          <button className="w-10 h-10 flex text-[15px] font-medium items-center justify-center rounded-full text-brand-neutral-600 hover:text-brand-neutral-800 hover:bg-gray-100 transition">
            <span className="leading-none">9</span>
          </button>
        </li>
        <li>
          <button className="w-10 h-10 flex text-[15px] font-medium items-center justify-center rounded-full text-brand-neutral-600 hover:text-brand-neutral-800 hover:bg-gray-100 transition">
            <span className="leading-none">10</span>
          </button>
        </li>
      </ul>
      <button className="flex items-center gap-2 text-brand-neutral-600 hover:text-brand-neutral-800 transition">
        <span className="text-base font-medium">Next</span>
        <span className="text-xl">
          <FiArrowRight />
        </span>
      </button>
    </div>
  );
};

export default Pagination;
