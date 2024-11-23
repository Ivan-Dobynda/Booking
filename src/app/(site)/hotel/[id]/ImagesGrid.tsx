'use client'
import React from 'react';
import Image from "next/image";
import {useHotelContext} from "@/context/HotelContext";

const ImagesGrid = () => {
    const {hotelData} = useHotelContext();
    const images = hotelData?.hotel?.images;

    return (
        <div className={`grid md:grid-cols-2 gap-4`}>
            <div>
                <Image
                    width={608}
                    height={460}
                    className="object-cover object-center w-full h-full"
                    src={`http://photos.hotelbeds.com/giata/bigger/${images[0].path}`}
                    alt="Marina Bay Sands Resort"
                ></Image>
            </div>
            <div className={`grid grid-cols-2 gap-4`}>
                {images.slice(1, 5).map((image: { path: string }, index: number) => (
                    <div className={`relative`} key={index}>
                        <Image
                            key={index}
                            width={296}
                            height={222}
                            className="object-cover object-center w-full h-full"
                            src={`http://photos.hotelbeds.com/giata/bigger/${image.path}`}
                            alt="Marina Bay Sands Resort"
                        ></Image>
                        {/*     overlay  */}
                        {index > 2 && (
                            <div className={`absolute top-0 left-0 w-full h-full bg-black/50 flex items-center justify-center`}>
                                <p className={`text-white text-base md:text-xl`}>+20 Photos</p>
                            </div>
                        )}

                    </div>
                ))}

            </div>

        </div>
    );
};

export default ImagesGrid;
