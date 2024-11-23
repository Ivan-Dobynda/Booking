import Search from "@/components/Search/Search";
import React from "react";
import {fetchHotels} from "@/lib/services/hotelService";
import HotelsContextProvider from "@/context/HotelsContext";
import HotelsList from "@/app/(site)/hotel/HotelsList";

const Hotels = async () => {
    const hotels = await fetchHotels();

    return (
        <HotelsContextProvider hotelsData={hotels}>
            <main className="pt-16 pb-32">
                <section className="mb-24">
                    <Search activeTab="hotels"/>
                </section>
                <HotelsList/>
            </main>
        </HotelsContextProvider>
    );
};

export default Hotels;
