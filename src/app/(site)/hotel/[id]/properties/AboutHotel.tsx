import React from 'react';
import {useHotelContext} from "@/context/HotelContext";

const AboutHotel = () => {
    const {hotelData} = useHotelContext();
    const hotel = hotelData?.hotel;
    return (
        <section className={`card-shadow p-5 md:p-6 xl:p-7 rounded-2xl`}>
            <div className={`grid gap-2 md:grid-cols-[auto,300px]`}>
                <div>
                    <h1 className="text-xl leading-none md:text-3xl md:leading-none text-brand-neutral-800 font-bold mb-3.5 md:mb-4 xl:mb-5">
                        About Hotel
                    </h1>
                    <div className={`flex flex-col gap-6`}>
                        {/*         About Marina Bay Sands Resort        */}
                        <div className={`flex flex-col gap-2`}>
                            <h2 className={`text-lg md:text-2xl text-brand-neutral-800 font-semibold`}>
                                About {hotel?.name?.content}
                            </h2>
                            <p className={`text-brand-neutral-700`}>
                                {hotel?.address?.content}
                            </p>
                            <p className={`text-brand-neutral-700`}>
                                5 Star Property
                            </p>
                        </div>

                        {/*         Location        */}
                        <div className={`flex flex-col gap-2`}>
                            <h2 className={`text-lg md:text-2xl text-brand-neutral-800 font-semibold`}>
                                Location
                            </h2>
                            <p className={`text-brand-neutral-700`}>
                                {hotel?.description?.content}
                                {/*With a stay at Royal National Hotel, you'll be centrally located in London, within a*/}
                                {/*5-minute drive of The British Museum and Leicester Square. This hotel is 1.5 mi (2.4 km)*/}
                                {/*from Trafalgar Square and 1.6 mi (2.5 km) from Oxford Street.*/}
                            </p>
                        </div>

                        {/*         Amenities        */}
                        <div className={`flex flex-col gap-2`}>
                            <h2 className={`text-lg md:text-2xl text-brand-neutral-800 font-semibold`}>
                                Amenities
                            </h2>
                            <p className={`text-brand-neutral-700`}>
                                Make use of convenient amenities such as complimentary wireless Internet access,
                                concierge services, and a vending machine. </p>
                        </div>

                        {/*         Dining        */}
                        <div className={`flex flex-col gap-2`}>
                            <h2 className={`text-lg md:text-2xl text-brand-neutral-800 font-semibold`}>
                                Dining
                            </h2>
                            <p className={`text-brand-neutral-700`}>
                                {`Enjoy a meal at Blooms Cafe or snacks in the hotel's coffee shop/cafe. English
                                breakfasts are available daily from 6:30 AM to 10:30 AM for a fee.`}</p>
                        </div>

                        {/*         Dining        */}
                        <div className={`flex flex-col gap-2`}>
                            <h2 className={`text-lg md:text-2xl text-brand-neutral-800 font-semibold`}>
                                Business Amenities
                            </h2>
                            <p className={`text-brand-neutral-700`}>
                                Featured amenities include dry cleaning/laundry services, a 24-hour front desk, and
                                multilingual staff. This hotel has 5 meeting rooms available for events. Self parking
                                (subject to charges) is available onsite.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutHotel;
