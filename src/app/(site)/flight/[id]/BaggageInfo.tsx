import React from "react";
import { MdLuggage, MdOutlineLuggage, MdShoppingBag } from "react-icons/md";

interface BaggageInfoProps {
  baggages: any[];
}

const BaggageInfo = ({ baggages }: BaggageInfoProps) => {
  return (
    <section className="card-shadow p-5 md:p-6 xl:p-7 rounded-2xl flex flex-col md:flex-row items-start gap-4 sm:gap-5 md:gap-6">
      <div className="text-3xl md:text-4xl p-2 rounded-full bg-brand-blue text-white">
        <MdLuggage />
      </div>
      <div className="w-full">
        <div className="">
          <h2 className="text-[17px] leading-none sm:text-lg sm:leading-none md:text-xl font-bold text-brand-neutral-800 mb-3 sm:mb-3.5 md:mb-4">
            Baggage Information (Per person)
          </h2>
          <div>
            {/* <div className="mb-5">
              <h3 className="text-base md:text-lg md:leading-none font-medium text-brand-neutral-800 mb-3 leading-none">
                Departure Flight DOH - LHR
              </h3>
              <h4 className="text-sm md:text-base md:leading-none text-brand-neutral-600 leading-none">
                Qatar Airways | Cabin: Coach | Brand Name: Cabin Class
              </h4>
            </div> */}
            <div className="flex flex-row gap-x-5 sm:gap-x-6 md:gap-x-8 gap-y-4">
              {baggages?.map((baggageInfo, index) => (
                <div key={index} className="items-center gap-1 flex">
                  <div className="text-2xl text-brand-neutral-600">
                    {baggageInfo?.type === "carry_on" ? (
                      <MdShoppingBag />
                    ) : null}

                    {baggageInfo?.type === "checked" ? (
                      <MdOutlineLuggage />
                    ) : null}
                  </div>
                  <div>
                    <h5 className="text-brand-neutral-800 text-[15px] font-medium leading-none">
                      {baggageInfo?.quantity}{" "}
                      {baggageInfo?.type?.replace("_", "-")} bag
                    </h5>
                    {/* <h6 className="text-brand-neutral-600 text-sm md:text-[15px] mb-1">
                      Purse, small backpack, briefcase
                    </h6>
                    <ul className="space-y-0.5">
                      <li className="flex gap-1.5 items-center text-sm md:text-[15px] text-brand-neutral-600">
                        <span className="text-brand-neutral-600">
                          <FaCheck />
                        </span>
                        <span>Included</span>
                      </li>
                      <li className="flex gap-1.5 items-center text-sm md:text-[15px] text-brand-neutral-600">
                        <span>Upto - 7kg</span>
                      </li>
                    </ul> */}
                  </div>
                </div>
              ))}

              {/* <div className="items-start space-y-2">
                <div className="text-2xl text-brand-neutral-600">
                  <BsFillLuggageFill />
                </div>
                <div>
                  <h5 className="text-brand-neutral-800 text-[15px] md:text-base">
                    Carry-on bag
                  </h5>
                  <ul className="space-y-0.5">
                    <li className="flex gap-1.5 items-center text-sm md:text-[15px] text-brand-neutral-600">
                      <span className="text-red-500">
                        <MdClose />
                      </span>
                      <span>Not Included</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="items-start space-y-2">
                <div className="text-2xl text-green-500">
                  <BsFillLuggageFill />
                </div>
                <div>
                  <h5 className="text-brand-neutral-800 text-[15px] md:text-base">
                    Personal Item
                  </h5>
                  <ul className="space-y-0.5">
                    <li className="flex gap-1.5 items-center text-sm md:text-[15px] text-brand-neutral-600">
                      <span className="text-green-500">
                        <FaCheck />
                      </span>
                      <span>Included</span>
                    </li>
                    <li className="flex gap-1.5 items-center text-sm md:text-[15px] text-brand-neutral-600">
                      <span>Upto - 7kg</span>
                    </li>
                  </ul>
                </div>
              </div> */}
            </div>
            {/* <p className="text-brand-blue flex items-center font-medium text-sm md:text-base">
              Qatar Air Baggage Policy
              <span className="pl-2 text-base md:text-lg">
                <FiCheckSquare />
              </span>
            </p> */}
          </div>
        </div>
        {/* <div>
          <h2 className="text-[17px] leading-none sm:text-lg sm:leading-none md:text-xl font-bold text-brand-neutral-800 mb-3.5 sm:mb-4 md:mb-5">
            Baggage Information (Per person)
          </h2>
          <div>
            <div className="mb-5">
              <h3 className="text-base md:text-lg md:leading-none font-medium text-brand-neutral-800 mb-3 leading-none">
                Departure Flight DOH - LHR
              </h3>
              <h4 className="text-sm md:text-base md:leading-none text-brand-neutral-600 leading-none">
                Qatar Airways | Cabin: Coach | Brand Name: Cabin Class
              </h4>
            </div>

            <div className="flex flex-col sm:flex-row justify-between gap-x-3.5 sm:gap-x-4 md:gap-x-6 gap-y-4 mb-3">
              <div className="items-start space-y-2">
                <div className="text-2xl text-green-500">
                  <BsFillLuggageFill />
                </div>
                <div>
                  <h5 className="text-brand-neutral-800 text-[15px] md:text-base">
                    Personal Item
                  </h5>
                  <h6 className="text-brand-neutral-600 text-sm md:text-[15px] mb-1">
                    Purse, small backpack, briefcase
                  </h6>
                  <ul className="space-y-0.5">
                    <li className="flex gap-1.5 items-center text-sm md:text-[15px] text-brand-neutral-600">
                      <span className="text-green-500">
                        <FaCheck />
                      </span>
                      <span>Included</span>
                    </li>
                    <li className="flex gap-1.5 items-center text-sm md:text-[15px] text-brand-neutral-600">
                      <span>Upto - 7kg</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="items-start space-y-2">
                <div className="text-2xl text-brand-neutral-600">
                  <BsFillLuggageFill />
                </div>
                <div>
                  <h5 className="text-brand-neutral-800 text-[15px] md:text-base">
                    Carry-on bag
                  </h5>
                  <ul className="space-y-0.5">
                    <li className="flex gap-1.5 items-center text-sm md:text-[15px] text-brand-neutral-600">
                      <span className="text-red-500">
                        <MdClose />
                      </span>
                      <span>Not Included</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="items-start space-y-2">
                <div className="text-2xl text-green-500">
                  <BsFillLuggageFill />
                </div>
                <div>
                  <h5 className="text-brand-neutral-800 text-[15px] md:text-base">
                    Personal Item
                  </h5>
                  <ul className="space-y-0.5">
                    <li className="flex gap-1.5 items-center text-sm md:text-[15px] text-brand-neutral-600">
                      <span className="text-green-500">
                        <FaCheck />
                      </span>
                      <span>Included</span>
                    </li>
                    <li className="flex gap-1.5 items-center text-sm md:text-[15px] text-brand-neutral-600">
                      <span>Upto - 7kg</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <p className="text-brand-blue flex items-center font-medium text-sm md:text-base">
              Qatar Air Baggage Policy
              <span className="pl-2 text-base md:text-lg">
                <FiCheckSquare />
              </span>
            </p>
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default BaggageInfo;
