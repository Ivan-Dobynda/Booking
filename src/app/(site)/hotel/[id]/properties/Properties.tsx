'use client'
import React, {useState} from 'react';
import Button from "@/Component/Button/Button";
import {Tab, TabList, TabPanel, Tabs} from 'react-tabs';
import Overview from "@/app/(site)/hotel/[id]/properties/Overview";
import {classNames} from "@/lib/helpers";
import ChooseRoom from "@/app/(site)/hotel/[id]/properties/ChooseRoom";
import AboutHotel from "@/app/(site)/hotel/[id]/properties/AboutHotel";
import Amenities from "@/app/(site)/hotel/[id]/properties/Amenities/Amenities";
import Policies from "@/app/(site)/hotel/[id]/properties/Policies";
import Nearby from "@/app/(site)/hotel/[id]/properties/Nearby";
import GuestReviews from "@/app/(site)/hotel/[id]/properties/GuestReviews";

const tabValues: string[] = [
    "Overview",
    "Choose Room",
    "About Hotel",
    "Amenities",
    "Policies",
    "Nearby",
    "Guest Reviews",
];

const Properties = () => {
    const [tabIndex, setTabIndex] = useState(0);

    return (
        <div>
            {/*     Tabs        */}
            <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
                <div className={`justify-center place-items-center lg:place-items-start grid lg:grid-cols-[auto,auto] lg:justify-between gap-4 items-center broder border-b-2`}>

                    <TabList className={`grid gap-2 grid-cols-3 sm:grid-cols-4 md:grid-cols-7 relative h-full`}>
                        {tabValues.map((value, index) => (
                            <Tab key={value}
                                 className={classNames(`text-sm md:text-base focus:outline-none cursor-pointer py-2 relative flex items-center justify-center`, index === tabIndex ? `text-brand-blue-300` : 'text-brand-neutral-500')}>
                                <p className={`text-center text-nowrap`}>
                                    {value}
                                </p>
                                {tabIndex === index && (
                                    <div className={`absolute bottom-[-2px] w-full bg-brand-blue-300 h-[2px]`}/>
                                )}
                            </Tab>
                        ))}

                    </TabList>

                    <div className={`py-2`}>
                        <Button size={'small'}>
                            Reserve a Room
                        </Button>
                    </div>
                </div>

                <TabPanel>
                    <Overview/>
                </TabPanel>
                <TabPanel>
                    <ChooseRoom/>
                </TabPanel>
                <TabPanel>
                    <AboutHotel/>
                </TabPanel>
                <TabPanel>
                    <Amenities/>
                </TabPanel>
                <TabPanel>
                    <Policies/>
                </TabPanel>
                <TabPanel>
                    <Nearby/>
                </TabPanel>
                <TabPanel>
                    <GuestReviews/>
                </TabPanel>


            </Tabs>
        </div>
    );
};

export default Properties;
