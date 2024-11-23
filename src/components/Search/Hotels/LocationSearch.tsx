import TextInput from "@/components/Form/TextInput";
import { classNames } from "@/lib/helpers";
import { Popover, Transition } from "@headlessui/react";
import React, { ReactNode } from "react";
import { BiSolidPlaneAlt } from "react-icons/bi";
import { FaMapLocationDot } from "react-icons/fa6";
import { IoIosCloseCircle } from "react-icons/io";

interface ILocationSearch {
  label: string;
  className?: string;
  icon?: ReactNode;
}

const LocationSearch = ({ label, className, icon }: ILocationSearch) => {
  return (
    <Popover as="div" className={classNames(className, "relative")}>
      <Popover.Button className="flex w-full flex-col text-left rounded-lg border border-gray-300 bg-gray-200 bg-opacity-30 hover:bg-opacity-60 transition px-3.5 py-3.5 h-[68px]">
        <div className="flex w-full justify-between items-center text-brand-neutral-600 mb-auto">
          <span className="text-sm leading-none -mt-0.5">{label}</span>
          <span className="text-base">{icon}</span>
        </div>
        <div className="text-brand-neutral-700 text-sm leading-none font-medium">
          Singapore
        </div>
      </Popover.Button>
      <Transition
        className="origin-top-left"
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
      >
        <Popover.Panel
          className="absolute mt-2.5 z-10 w-[460px] rounded-lg overflow-hidden bg-white"
          style={{
            boxShadow:
              "0px 4px 12px 0px rgba(24, 39, 75, 0.08), 0px -4px 12px 0px rgba(24, 39, 75, 0.08)",
          }}
        >
          <form action="#" className="border-b relative">
            <div className="flex items-center relative">
              <TextInput
                placeholder="Search"
                className="text-xl px-6 h-[60px] font-bold"
                style={{ borderRadius: 0, boxShadow: "none" }}
              />
              <button className="text-2xl absolute right-5 text-red-500 hover:text-red-600 transition">
                <IoIosCloseCircle />
              </button>
            </div>
          </form>
          <ul>
            <li>
              <button className="flex items-center w-full gap-4 py-4 px-6 text-brand-neutral-800 hover:bg-gray-50 transition">
                <div className="text-2xl">
                  <FaMapLocationDot />
                </div>
                <div>
                  <h5 className="text-base font-medium text-brand-neutral-800 leading-none mb-1.5">
                    Atlanta (ATL -All Airports)
                  </h5>
                  <address className="text-sm text-brand-neutral-600 leading-none text-left not-italic">
                    Georgia, United States
                  </address>
                </div>
              </button>
            </li>
            <li>
              <button className="flex items-center w-full gap-4 py-4 px-6 text-brand-neutral-800 hover:bg-gray-50 transition">
                <div className="text-2xl">
                  <FaMapLocationDot />
                </div>
                <div>
                  <h5 className="text-base font-medium text-brand-neutral-800 leading-none mb-1.5">
                    Atlanta (ATL -All Airports)
                  </h5>
                  <address className="text-sm text-brand-neutral-600 leading-none text-left not-italic">
                    Georgia, United States
                  </address>
                </div>
              </button>
            </li>
            <li>
              <button className="flex items-center w-full gap-4 py-4 px-6 text-brand-neutral-800 hover:bg-gray-50 transition">
                <div className="text-2xl">
                  <FaMapLocationDot />
                </div>
                <div>
                  <h5 className="text-base font-medium text-brand-neutral-800 leading-none mb-1.5">
                    Atlanta (ATL -All Airports)
                  </h5>
                  <address className="text-sm text-brand-neutral-600 leading-none text-left not-italic">
                    Georgia, United States
                  </address>
                </div>
              </button>
            </li>
            <li>
              <button className="flex items-center w-full gap-4 py-4 px-6 text-brand-neutral-800 hover:bg-gray-50 transition">
                <div className="text-2xl">
                  <FaMapLocationDot />
                </div>
                <div>
                  <h5 className="text-base font-medium text-brand-neutral-800 leading-none mb-1.5">
                    Atlanta (ATL -All Airports)
                  </h5>
                  <address className="text-sm text-brand-neutral-600 leading-none text-left not-italic">
                    Georgia, United States
                  </address>
                </div>
              </button>
            </li>
            <li>
              <button className="flex items-center w-full gap-4 py-4 px-6 text-brand-neutral-800 hover:bg-gray-50 transition">
                <div className="text-2xl">
                  <FaMapLocationDot />
                </div>
                <div>
                  <h5 className="text-base font-medium text-brand-neutral-800 leading-none mb-1.5">
                    Atlanta (ATL -All Airports)
                  </h5>
                  <address className="text-sm text-brand-neutral-600 leading-none text-left not-italic">
                    Georgia, United States
                  </address>
                </div>
              </button>
            </li>
          </ul>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
};

export default LocationSearch;
