import React from 'react';
import ImagesGrid from "@/app/(site)/hotel/[id]/ImagesGrid";
import Properties from "@/app/(site)/hotel/[id]/properties/Properties";
import {fetchHotelDetails} from "@/lib/services/hotelService";
import HotelContextProvider from "@/context/HotelContext";

interface HotelBookingProps {
    params: { id: string };
}

const Page = async ({params}: HotelBookingProps) => {
    const {id} = params;
    const hotelDetails = await fetchHotelDetails(id);

    return (
        <HotelContextProvider hotelData={hotelDetails}>
            <main className="pb-12 sm:pb-16 md:pb-20 lg:pb-24 xl:pb-32 relative">
                <div className={`base-container`}>
                    <ImagesGrid/>
                    <Properties/>
                </div>
            </main>
        </HotelContextProvider>
    );
};

export default Page;
