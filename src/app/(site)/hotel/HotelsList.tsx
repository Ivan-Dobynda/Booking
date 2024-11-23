'use client'
import React from 'react';
import Filters from "@/app/(site)/hotel/Filters";
import Sortby from "@/Component/Filters/Sortby";
import HotelCard from "@/Component/Cards/HotelCard";
import Button from "@/Component/Button/Button";
import {useHotelsContext} from "@/context/HotelsContext";
import Link from "next/link";

const HotelsList = () => {
    const {hotelsData} = useHotelsContext();
    console.log(hotelsData, 'hotels data')
    return (
        <div className="base-container">
            <div className="flex gap-8">
                <Filters/>
                <section className="flex-1">
                    <div className="mb-6 flex justify-between items-center">
                        <h3 className="text-lg text-brand-neutral-600 font-medium">
                            20 results
                        </h3>
                        <Sortby/>
                    </div>
                    <ul className="space-y-8 mb-12">
                        {hotelsData.hotels.map(val => (
                            <li key={val.code}>
                                <Link href={`/hotel/${val.code}`}>
                                    <HotelCard hotel={val}/>
                                </Link>
                            </li>
                        ))}

                    </ul>
                    <div className="text-center">
                        <Button>Show More</Button>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default HotelsList;
