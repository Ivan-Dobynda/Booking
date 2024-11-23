import React from "react";
import ModalWrapper from "./ModalWrapper";
import { IoMdClose } from "react-icons/io";
import Filters from "@/app/(site)/cars/Filters/Filters";

interface CarsFiltersModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const CarsFiltersModal = ({ open, setOpen }: CarsFiltersModalProps) => {
  return (
    <ModalWrapper
      className="max-w-lg rounded-2xl mt-9 sm:mt-12 sm:m-5 p-5 bg-white w-full"
      open={open}
      setOpen={setOpen}
    >
      <button
        onClick={() => setOpen(false)}
        className="text-3xl text-white absolute -top-10 -right-0"
      >
        <IoMdClose />
      </button>
      <div>
        <Filters />
      </div>
    </ModalWrapper>
  );
};

export default CarsFiltersModal;
