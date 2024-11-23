import React from "react";
import { DuffelAncillaries } from "@duffel/components";

import { classNames } from "@/lib/helpers";
// import { fetchSeatMap } from "@/lib/services/seatsMapService";

import { FaCheck } from "react-icons/fa6";
import { MdEventSeat } from "react-icons/md";
import { useSearchParams } from "next/navigation";

interface SeatsSelectionProps {
  offerId: string;
  slices: any[];
  passengers?: any[];
  offer?: any;
  setSeatServices: React.Dispatch<React.SetStateAction<any[]>>;
}

const SeatsSelection = ({
  offerId,
  slices,
  passengers,
  offer,
  setSeatServices,
}: SeatsSelectionProps) => {
  const searchParams = useSearchParams();
  // const [seatsMap, setSeatsMap] = useState<any[]>([]);
  // const [selectedSliceIndex, setSelectedSliceIndex] = useState(0);

  // const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

  // useEffect(() => {
  //   const getSeatMap = async () => {
  //     const res = await fetchSeatMap(offerId);

  //     if (res.result.data) setSeatsMap(res.result.data);
  //   };
  //   getSeatMap();
  // }, []);

  // console.log("seatsMap: ", seatsMap);

  // const onSelectSeat = (seat: any) => {
  //   setSelectedSeats((prevSeats) => {
  //     let prevSeatsCopy = [...prevSeats];

  //     if (prevSeatsCopy.includes(seat.id)) {
  //       prevSeatsCopy = prevSeatsCopy.filter((id) => id !== seat.id);
  //     } else {
  //       prevSeatsCopy.push(seat.id);
  //     }

  //     return prevSeatsCopy;
  //   });
  // };

  // if (!seatsMap?.length) return null;

  return (
    <div>
      <section className="card-shadow p-5 md:p-6 xl:p-7 rounded-2xl">
        <h2 className="text-[17px] leading-none sm:text-lg sm:leading-none md:text-xl md:leading-none font-bold text-brand-neutral-800  mb-3.5 sm:mb-4 md:mb-5">
          Select Seat
        </h2>
        <ul className="mb-4 sm:mb-5 md:mb-6 space-y-2">
          <li className="flex items-start gap-2 text-brand-neutral-600">
            <span className="text-lg inline-block translate-y-0.5 text-green-500">
              <FaCheck />
            </span>
            <span className="text-sm sm:text-base">
              Get peace of mind by selecting your preferred seat now
            </span>
          </li>
          <li className="flex items-start gap-2 text-brand-neutral-600">
            <span className="text-lg inline-block translate-y-0.5 text-green-500">
              <FaCheck />
            </span>
            <span className="text-sm sm:text-base">
              Request a seat next to friends and family
            </span>
          </li>
          <li className="flex items-start gap-2 text-brand-neutral-600">
            <span className="text-lg inline-block translate-y-0.5 text-green-500">
              <FaCheck />
            </span>
            <span className="text-sm sm:text-base">
              Select from mostly window and aisle seats
            </span>
          </li>
        </ul>
        {/* <div className="rounded-2xl border border-brand-neutral-300 py-4 px-6 lg:px-9 flex flex-col md:flex-row flex-wrap items-center md:items-stretch gap-5 mb-5">
          {slices.map((slice, index) => (
            <React.Fragment key={index}>
              {slice.segments.map((segment: any, index: number) => (
                <button
                  type="button"
                  key={index}
                  className="flex items-center text-left px-5 py-3 md:pt-0 bg-gray-100 rounded-lg md:rounded-none md:bg-transparent gap-3.5 sm:gap-4 md:gap-5 md:border-b-2 border-brand-blue"
                >
                  <div className="w-16 h-16 overflow-hidden">
                    <Image
                      width={64}
                      height={64}
                      src={segment?.airline_logo}
                      alt="flight logo"
                      className="object-contain object-center h-full w-full"
                    />
                  </div>
                  <div>
                    <h4 className="text-sm sm:leading-none sm:text-base font-medium text-brand-blue leading-none mb-2">
                      Flight {segment?.flight_number}
                    </h4>
                    <h5 className="text-xs sm:leading-none sm:text-sm leading-none text-brand-blue">
                      {segment?.origin_iata_city_code} -{" "}
                      {segment?.destination_iata_city_code}
                    </h5>
                  </div>
                </button>
              ))}
            </React.Fragment>
          ))}
        </div> */}
        {/* <p className="text-brand-neutral-600 text-sm sm:text-base">
          <strong className="font-medium text-brand-neutral-800">
            Qatar Airway
          </strong>{" "}
          Boeing 157-3 Dreamiliner 295-360 STD SEAT
        </p> */}
        <div className="flex gap-4 mt-8 overflow-auto pb-3.5">
          {/* {seatsMap[selectedSliceIndex]?.cabins?.map(
            (cabin: any, index: number) => (
              <div key={index} className="flex gap-5">
                {cabin?.rows?.map((row: any, rowIndex: number) => (
                  <div key={rowIndex} className="flex flex-col-reverse gap-3">
                    {row?.sections?.map(
                      (section: any, sectionIndex: number) => {
                        return (
                          <div
                            key={sectionIndex}
                            className="flex-1 flex flex-col-reverse justify-center gap-1 relative"
                          >
                            {section?.elements?.map(
                              (element: any, index: number) => (
                                <React.Fragment key={index}>
                                  <Element
                                    onSelectSeat={onSelectSeat}
                                    rowNumber={
                                      element.designator?.slice(0, -1) !==
                                      section?.elements?.[
                                        index - 1
                                      ]?.designator?.slice(0, -1)
                                        ? element.designator?.slice(0, -1)
                                        : ""
                                    }
                                    designator={element.designator}
                                    element={element}
                                    available={
                                      element?.available_services?.length
                                    }
                                    selected={selectedSeats.includes(
                                      element.id
                                    )}
                                  />
                                </React.Fragment>
                              )
                            )}
                          </div>
                        );
                      }
                    )}
                  </div>
                ))}
              </div>
            )
          )} */}
          {searchParams.get("client_key") ? (
            <DuffelAncillaries
              offer_id={offerId}
              client_key={searchParams.get("client_key") || ""}
              services={["seats"]}
              passengers={passengers || []}
              onPayloadReady={(data, metadata) => {
                setSeatServices(metadata.seat_services);
              }}
            />
          ) : null}
        </div>
      </section>
    </div>
  );
};

export default SeatsSelection;

interface ElementProps {
  element: any;
  onSelectSeat: (seat: any) => void;
  selected: boolean;
  available: boolean;
  rowNumber: string;
  designator: string;
}

const Element = ({
  element,
  onSelectSeat,
  selected,
  available,
  designator,
  rowNumber,
}: ElementProps) => {
  return (
    <div className="relative flex gap-3">
      {element.type === "seat" ? (
        <div>
          <button
            type="button"
            onClick={() => onSelectSeat(element)}
            className={classNames(
              "inline-block text-2xl transition",
              !available ? "text-red-500 cursor-default" : "",
              available && selected ? "text-green-600" : "text-gray-600"
            )}
          >
            <MdEventSeat />
          </button>
          {rowNumber ? (
            <div className="text-sm text-center">{rowNumber}</div>
          ) : (
            ""
          )}
        </div>
      ) : null}
    </div>
  );
};
