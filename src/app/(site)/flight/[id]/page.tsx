import React from "react";
import { fetchOffer } from "@/lib/services/offerService";

import Aside from "./Aside";
import TravelDetails from "./TravelDetails";
import Slice from "./Slice";
import BaggageInfo from "./BaggageInfo";
import FlightDetailErrorMessage from "./ErrorMessage";

const fetchFlightDetails = async (id: string) => {
  const data = await fetchOffer(id);

  return data.result;
};

interface FlightBookingProps {
  params: { id: string };
}

const FlightBooking = async ({ params }: FlightBookingProps) => {
  const { slices, passengers, baggages, errors, ...flightDetails } =
    await fetchFlightDetails(params?.id);

  if (errors?.[0]?.message)
    return <FlightDetailErrorMessage message={errors?.[0]?.message} />;

  return (
    <main className="pt-6 sm:pt-10 md:pt-14 lg:pt-16 pb-12 sm:pb-16 md:pb-20 lg:pb-24 xl:pb-32 relative">
      <div className="base-container flex flex-col-reverse lg:flex-row justify-between">
        <div className="lg:max-w-[calc(100%-350px)] xl:max-w-[calc(100%-420px)] 2xl:max-w-[calc(100%-440px)] w-full space-y-5 sm:space-y-6 md:space-y-7">
          <section className="card-shadow p-5 md:p-6 xl:p-7 rounded-2xl">
            <h1 className="text-xl leading-none md:text-2xl md:leading-none text-brand-neutral-800 font-bold mb-3.5 md:mb-4 xl:mb-5">
              Flight Details
            </h1>
            {/* <div className="py-2.5 xl:py-3 px-3 xl:px-4 rounded-lg border border-green-500 mb-5 lg:mb-6">
              <div className="flex flex-col md:flex-row lg:flex-col xl:flex-row xl:items-center gap-1.5 sm:gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-lg xl:text-xl text-green-500">
                    <AiFillCheckCircle />
                  </span>
                  <p className="text-brand-neutral-600 text-[13px] leading-none sm:leading-none sm:text-sm">
                    Book now our{" "}
                    <strong className="text-brand-neutral-800 text-sm leading-none sm:text-base sm:leading-none font-medium">
                      Price Match Promise
                    </strong>
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-lg xl:text-xl text-neutral-600">
                    <FaInfoCircle />
                  </span>
                  <p className="text-brand-neutral-600 text-[13px] leading-none sm:leading-none sm:text-sm">
                    and 32 hours cancellation, for a fee
                  </p>
                  <span className="text-lg xl:text-xl text-neutral-600">
                    <FaInfoCircle />
                  </span>
                </div>
              </div>
            </div> */}
            {/* <div className="border border-neutral-800 rounded-lg p-4">
              <div>
                <h3 className="flex gap-2.5 lg:gap-3 items-center text-base leading-none sm:text-lg sm:leading-none font-medium text-brand-neutral-800  mb-4 lg:mb-5">
                  <span className="text-lg sm:text-xl">
                    <IoGrid />
                  </span>
                  <span>Fusion Fare (multi-tickets)</span>
                </h3>
                <ul className="grid gap-2.5 lg:gap-3">
                  <li className="flex gap-2 text-brand-neutral-600">
                    <span>
                      <FaCheck />
                    </span>
                    <span className="text-sm -mt-0.5">
                      Combines multiple one-way tickets
                    </span>
                  </li>
                  <li className="flex gap-2 text-brand-neutral-600">
                    <span>
                      <FaCheck />
                    </span>
                    <span className="text-sm -mt-0.5">
                      If one of your flights is changed or canceled, it will not
                      automatically alter the other flight
                    </span>
                  </li>
                  <li className="flex gap-2 text-brand-neutral-600">
                    <span>
                      <FaCheck />
                    </span>
                    <span className="text-sm -mt-0.5">
                      Each subject to its own rules and restrictions
                    </span>
                  </li>
                  <li className="flex gap-2 text-brand-neutral-600">
                    <span>
                      <FaCheck />
                    </span>
                    <span className="text-sm -mt-0.5">
                      hanges to the other flight may incur a charge
                    </span>
                  </li>
                </ul>
              </div>
            </div> */}
            <hr className="border-gray-200 my-4 sm:my-5" />
            <Slice slice={slices?.[0]}></Slice>
          </section>
          {slices?.map((slice: any, index: number) =>
            index > 0 ? (
              <section
                key={index}
                className="card-shadow p-5 md:p-6 xl:p-7 rounded-2xl"
              >
                <Slice key={index} slice={slice} />
              </section>
            ) : (
              <React.Fragment key={index}></React.Fragment>
            )
          )}

          <BaggageInfo baggages={baggages} />
          <TravelDetails
            passengers={passengers}
            offerId={flightDetails?.id}
            slices={slices}
          />
        </div>
        <div>
          <Aside
            total_currency={flightDetails?.total_currency}
            total_amount={flightDetails?.total_amount}
            base_currency={flightDetails?.base_currency}
            base_amount={flightDetails?.base_amount}
            tax_currency={flightDetails?.tax_currency}
            tax_amount={flightDetails?.tax_amount}
            passengers={passengers || []}
            owner={flightDetails?.owner}
            flightType={flightDetails?.flight_type}
          />
        </div>
      </div>
    </main>
  );
};

export default FlightBooking;
