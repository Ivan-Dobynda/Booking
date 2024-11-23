import React from 'react';
import IconWithText from "@/Component/utils/IconWithText";
import {LiaVectorSquareSolid} from "react-icons/lia";
import {BsFillPeopleFill} from "react-icons/bs";
import {FaBed} from "react-icons/fa";
import {TbSquare, TbSquareCheckFilled} from "react-icons/tb";

import Link from "next/link";
import {FiChevronRight} from "react-icons/fi";
import Button from "@/Component/Button/Button";
import HotelRoomImageCarousel from "@/Component/Cards/HotelRoom/HotelRoomImageCarousel";

const HotelRoom = () => {
    return (
        <div className={`p-5 border border-[rgba(5, 15, 21, 0.10)] rounded-2xl`}>
            <HotelRoomImageCarousel/>
            <div className={`mt-5`}>
                <h2 className={`font-[600] text-xl`}>
                    Room, 2 Queen Beds, Non Smoking (Drinks & Snacks)
                </h2>
                <p className={`mt-2 text-brand-neutral-800 text-sm`}>
                    8.9/10 Very Good
                </p>
            </div>
            <div className={`mt-5 flex gap-3 flex-col`}>
                <div>
                    <p className={`font-[500] text-brand-neutral-700`}>Info</p>
                    <div className={`mt-2 flex flex-wrap gap-3`}>
                        <IconWithText icon={<LiaVectorSquareSolid/>} text={'297 sq ft'}/>
                        <IconWithText icon={<BsFillPeopleFill/>} text={'Sleeps 2'}/>
                        <IconWithText icon={<FaBed/>} text={'1 King bed'}/>
                    </div>
                </div>
                <div className={`h-[1px] w-full bg-[rgba(5,15,21,0.10)]`}/>
                <div>
                    <p className={`font-[500] text-brand-neutral-700`}>Extras</p>
                    <div className={`mt-2 flex flex-col gap-2`}>
                        <div className={`flex justify-between items-center gap-4`}>
                            <IconWithText icon={<TbSquareCheckFilled/>} text={'High-speed internet'}/>
                            <p className={`text-sm text-brand-neutral-700`}>+$0</p>
                        </div>
                        <div className={`flex justify-between items-center gap-4`}>
                            <IconWithText icon={<TbSquare/>} text={'WiFi + Resort credit'}/>
                            <p className={`text-sm text-brand-neutral-700`}>+$0</p>
                        </div>
                        <div className={`flex justify-between items-center gap-4`}>
                            <IconWithText icon={<TbSquare/>} text={'Breakfast buffet'}/>
                            <p className={`text-sm text-brand-neutral-700`}>+$0</p>
                        </div>
                    </div>
                </div>
                <div className={`h-[1px] w-full bg-[rgba(5,15,21,0.10)]`}/>
                <div>
                    <p className={`font-[500] text-brand-neutral-700`}>Cancellation Policy</p>
                    <div className={`mt-2 flex flex-col gap-2`}>
                        <div className={`flex justify-between items-center gap-4`}>
                            <IconWithText icon={<TbSquareCheckFilled/>} text={'Fully refundable before - Jan 20'}/>
                            <p className={`text-sm text-brand-neutral-700`}>+$0</p>
                        </div>
                        <div className={`flex justify-between items-center gap-4`}>
                            <IconWithText icon={<TbSquare/>} text={'Fully refundable before - Jan 24'}/>
                            <p className={`text-sm text-brand-neutral-700`}>+$4</p>
                        </div>
                        <div className={`flex justify-between items-center gap-4`}>
                            <IconWithText icon={<TbSquare/>} text={'Fully refundable before - Jan 28'}/>
                            <p className={`text-sm text-brand-neutral-700`}>+$10</p>
                        </div>
                    </div>
                </div>
                <div className={`h-[1px] w-full bg-[rgba(5,15,21,0.10)]`}/>
                <Link className={`flex items-center gap-[6px] text-brand-blue-300`} href={'/'}>
                    More Details
                    <FiChevronRight/>
                </Link>
                <div className={`mt-5 flex items-center justify-between`}>
                    <div className={`flex flex-col gap-1`}>
                        <p className={`text-brand-neutral-900 text-xl font-[500]`}>$160</p>
                        <p className={`text-brand-neutral-900 text-sm font-[500]`}>Total $205</p>
                        <p className={`text-brand-neutral-600 text-xs`}>includes taxes & fees</p>
                    </div>
                    <Button variant={'primary'}>
                        Reserve
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default HotelRoom;
