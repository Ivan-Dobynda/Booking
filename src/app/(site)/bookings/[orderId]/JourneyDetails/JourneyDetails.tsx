import React from "react";
import Slice from "./Slice/Slice";

interface JourneyDetailsProps {
  slices: any[];
}

const JourneyDetails = ({ slices }: JourneyDetailsProps) => {
  return (
    <section className="bg-white card-shadow p-4 md:p-5 xl:p-6 rounded-2xl">
      <h2 className="text-lg leading-none md:text-xl md:leading-none text-brand-neutral-800 font-semibold mb-4 md:mb-5 xl:mb-6">
        Journey details
      </h2>

      <div className="space-y-6 divide-y">
        {slices?.map((slice: any, index: number) => (
          <div key={index} className={index > 0 ? "pt-6" : ""}>
            <Slice key={index} slice={slice} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default JourneyDetails;
