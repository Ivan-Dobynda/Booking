import Button from "@/components/Button/Button";
import TextInput from "@/components/Form/TextInput";
import { classNames } from "@/lib/helpers";
import { Popover, Transition } from "@headlessui/react";
import React, { ReactNode } from "react";
import { BiSolidPlaneAlt } from "react-icons/bi";
import { CiCircleMinus, CiCirclePlus } from "react-icons/ci";
import { FaPersonWalkingLuggage } from "react-icons/fa6";
import { IoIosCloseCircle, IoMdBed } from "react-icons/io";

interface IRoomsCount {
  label: string;
  className?: string;
  icon?: ReactNode;
}

const RoomsCount = ({ label, className }: IRoomsCount) => {
  return (
    <Popover as="div" className={classNames(className, "relative")}>
      <Popover.Button className="flex w-full flex-col text-left rounded-lg border border-gray-300 bg-gray-200 bg-opacity-30 hover:bg-opacity-60 transition px-3.5 py-3.5 h-[68px]">
        <div className="flex w-full justify-between items-center text-brand-neutral-600 mb-auto">
          <span className="text-sm leading-none -mt-0.5">{label}</span>
        </div>
        <div className="text-brand-neutral-700 text-sm leading-none font-medium">
          1 room
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
          className="absolute mt-2.5 z-10 w-96 rounded-lg overflow-hidden bg-white"
          style={{
            boxShadow:
              "0px 4px 12px 0px rgba(24, 39, 75, 0.08), 0px -4px 12px 0px rgba(24, 39, 75, 0.08)",
          }}
        >
          <div className="pt-2.5 pb-7 px-7">
            <div className="flex items-center justify-between pt-4 pb-5">
              <div className="flex items-center gap-1.5 text-brand-neutral-800">
                <span className="text-2xl">
                  <IoMdBed />
                </span>
                <span className="text-base font-medium">Room</span>
              </div>
              <div className="flex items-center gap-3">
                <button className="text-2xl text-brand-neutral-700">
                  <CiCircleMinus />
                </button>
                <span className="text-brand-neutral-800 font-medium text-lg leading-none">
                  1
                </span>
                <button className="text-2xl text-green-500">
                  <CiCirclePlus />
                </button>
              </div>
            </div>
            <div className="flex justify-end">
              <Button
                style={{ minHeight: "45px", width: "90px", fontSize: "15px" }}
              >
                Done
              </Button>
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
};

export default RoomsCount;
