import React from "react";
import Slice from "./Slice";

interface FlightInformationProps {
  slices: any[];
}

const FlightInformation = ({ slices }: FlightInformationProps) => {
  return (
    <div>
      <h2 className="text-lg leading-none md:text-xl md:leading-none text-brand-neutral-800 font-semibold mb-4 md:mb-5 xl:mb-6">
        Flight information
      </h2>
      <ul className="space-y-3">
        {slices.map((slice, index) => (
          <Slice key={index} slice={slice} />
        ))}
      </ul>
    </div>
  );
};

export default FlightInformation;
