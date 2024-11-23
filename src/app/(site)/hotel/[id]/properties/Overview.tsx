import React from 'react';
import {FaCheck} from "react-icons/fa6";
import {BiCalendar, BiRestaurant} from "react-icons/bi";
import {FiCheck} from "react-icons/fi";
import {MdFlightTakeoff} from "react-icons/md";
import {PiMapPinLineFill} from "react-icons/pi";
import GoogleMapReact from 'google-map-react';
import {useHotelContext} from "@/context/HotelContext";

const Overview = () => {
    const {hotelData} = useHotelContext();
    const hotel = hotelData?.hotel;
    const coordinates = hotel.coordinates;

    return (
        <section className={`card-shadow p-5 md:p-6 xl:p-7 rounded-2xl`}>
            <div className={`grid gap-2 md:grid-cols-[auto,300px]`}>
                <div>
                    <h1 className="text-xl leading-none md:text-3xl md:leading-none text-brand-neutral-800 font-bold mb-3.5 md:mb-4 xl:mb-5">
                        Overview
                    </h1>
                    <div className={`flex flex-col gap-6`}>
                        {/*         Marina Bay Sands Resort        */}
                        <div className={`flex flex-col gap-2`}>
                            <h2 className={`text-lg md:text-2xl text-brand-neutral-800 font-semibold`}>
                                {hotel?.name?.content}
                            </h2>
                            <p className={`text-brand-neutral-700`}>
                                5 Star Property
                            </p>
                            <div className={`flex items-center gap-2 text-brand-blue-300`}>
                                <FaCheck/> Fully refundable
                            </div>

                            <div className={`flex gap-2`}>
                                <div
                                    className={`text-white bg-[#EE9D00] w-[32px] h-[32px] flex items-center justify-center rounded-md`}>
                                    8.1
                                </div>
                                <div className={`text-brand-neutral-800 font-[500] text-lg`}>
                                    Very Good <span
                                    className={`inline-block text-sm text-brand-neutral-600`}>(1991 reviews)</span>
                                </div>
                            </div>

                        </div>

                        {/*         Popular Amenities       */}
                        <div className={`flex flex-col gap-2`}>
                            <h2 className={`text-lg md:text-2xl text-brand-neutral-800 font-semibold`}>
                                Popular Amenities
                            </h2>
                            <div className={`flex gap-6 items-center flex-wrap`}>
                                <div className={`flex gap-2 items-center`}>
                                    <BiRestaurant/>
                                    <p className={`text-brand-neutral-700`}>Restaurant</p>
                                </div>
                                <div className={`flex gap-2 items-center`}>
                                    <BiRestaurant/>
                                    <p className={`text-brand-neutral-700`}>Restaurant</p>
                                </div>
                                <div className={`flex gap-2 items-center`}>
                                    <BiRestaurant/>
                                    <p className={`text-brand-neutral-700`}>Restaurant</p>
                                </div>
                                <div className={`flex gap-2 items-center`}>
                                    <BiRestaurant/>
                                    <p className={`text-brand-neutral-700`}>Restaurant</p>
                                </div>
                            </div>

                        </div>

                        {/*         Check-in & Check-out       */}
                        <div className={`flex flex-col gap-2`}>
                            <h2 className={`text-lg md:text-2xl text-brand-neutral-800 font-semibold`}>
                                Check-in & Check-out
                            </h2>
                            <div className={`flex gap-6 items-center flex-wrap`}>
                                <div className={`flex gap-2 items-center`}>
                                    <BiCalendar/>
                                    <p className={`text-brand-neutral-700`}>Check-in: Tue, Jan 16, 2024 01:00 PM</p>
                                </div>

                                <div className={`flex gap-2 items-center`}>
                                    <BiCalendar/>
                                    <p className={`text-brand-neutral-700`}>Check-out: Sat, Jan 19, 2024 11:00 AM</p>
                                </div>

                            </div>

                        </div>

                        {/*         Nearby Attractions       */}
                        <div className={`flex flex-col gap-2`}>
                            <h2 className={`text-lg md:text-2xl text-brand-neutral-800 font-semibold`}>
                                Nearby Attractions
                            </h2>
                            <div className={`flex gap-6 items-center flex-wrap`}>
                                <div className={`flex gap-2 items-center`}>
                                    <FiCheck/>
                                    <p className={`text-brand-neutral-700`}>Russell Square (2-3 mins walk)</p>
                                </div>

                                <div className={`flex gap-2 items-center`}>
                                    <FiCheck/>
                                    <p className={`text-brand-neutral-700`}>The Museum (6-8 mins walk)</p>
                                </div>

                                <div className={`flex gap-2 items-center`}>
                                    <FiCheck/>
                                    <p className={`text-brand-neutral-700`}>Harvard University (8-10 mind drive) </p>
                                </div>

                            </div>

                        </div>

                        {/*         Restaurant on Site       */}
                        <div className={`flex flex-col gap-2`}>
                            <h2 className={`text-lg md:text-2xl text-brand-neutral-800 font-semibold`}>
                                Restaurant on Site
                            </h2>
                            <div className={`flex gap-6 items-center flex-wrap`}>
                                <div className={`flex gap-2 items-center`}>
                                    <FiCheck/>
                                    <p className={`text-brand-neutral-700`}>Lobby Bar</p>
                                </div>

                                <div className={`flex gap-2 items-center`}>
                                    <FiCheck/>
                                    <p className={`text-brand-neutral-700`}>The Garden Grill</p>
                                </div>

                                <div className={`flex gap-2 items-center`}>
                                    <FiCheck/>
                                    <p className={`text-brand-neutral-700`}>The Pool Bar</p>
                                </div>

                            </div>

                        </div>

                        {/*         Nearby Airports       */}
                        <div className={`flex flex-col gap-2`}>
                            <h2 className={`text-lg md:text-2xl text-brand-neutral-800 font-semibold`}>
                                Nearby Airports
                            </h2>
                            <div className={`flex gap-6 items-center flex-wrap`}>
                                <div className={`flex gap-2 items-center`}>
                                    <MdFlightTakeoff/>
                                    <p className={`text-brand-neutral-700`}>LCY (10.5 miles)</p>
                                </div>

                                <div className={`flex gap-2 items-center`}>
                                    <MdFlightTakeoff/>
                                    <p className={`text-brand-neutral-700`}>LHR (5.5 miles)</p>
                                </div>

                                <div className={`flex gap-2 items-center`}>
                                    <MdFlightTakeoff/>
                                    <p className={`text-brand-neutral-700`}>LNT (20.4 miles)</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/*             right side map      */}
                <div>
                    <div className={`w-full h-[320px] rounded-lg overflow-hidden`}>
                        <GoogleMapReact
                            bootstrapURLKeys={{key: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY as string}}
                            defaultCenter={{
                                lat: coordinates?.latitude,
                                lng: coordinates.longitude
                            }}
                            defaultZoom={10}
                        >
                        </GoogleMapReact>
                    </div>
                    <div className={`flex gap-2 items-center mt-4`}>
                        <PiMapPinLineFill/>
                        <p className={`text-xs`}>{hotel?.address?.content}</p>
                    </div>
                </div>
            </div>

        </section>
    );
};

export default Overview;
