import React from 'react';
import Button from "@/Component/Button/Button";
import HotelRoom from "@/Component/Cards/HotelRoom/HotelRoom";

const ChooseRoom = () => {
    return (
        <section className={`card-shadow p-5 md:p-6 xl:p-7 rounded-2xl`}>

            <h1 className="text-xl leading-none md:text-3xl md:leading-none text-brand-neutral-800 font-bold mb-3.5 md:mb-4 xl:mb-5">
                Choose Room
            </h1>
            {/*         all cards       */}
            <div
                className="mx-auto max-w-md md:max-w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-6 sm:mb-8 md:mb-10 lg:mb-12">
                <HotelRoom/>
                <HotelRoom/>
                <HotelRoom/>
            </div>
            <div className={`flex items-center justify-center`}>
                <Button variant={'primary'}>
                    See More Rooms
                </Button>
            </div>

        </section>
    );
};

export default ChooseRoom;
