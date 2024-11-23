import React from 'react';
import AmenityItem from "@/app/(site)/hotel/[id]/properties/Amenities/AmenityItem";

const amenities = [
    {
        heading: "Internet",
        icon: "", // Globe icon for Internet
        options: ["Available in some public areas: Free WiFi"]
    },
    {
        heading: "Restaurants on site",
        icon: "️", // Fork and knife icon for restaurants
        options: ["Lobby Bar", "The Garden Grill", "The Pool Bar"]
    },
    {
        heading: "Food and drink",
        options: ["Buffet breakfast available for a fee"]
    },
    {
        heading: "Family friendly",
        icon: "", // Family icon
        options: ["Outdoor pool"]
    },
    {
        heading: "Parking and transportation",
        icon: "", // Parking icon
        options: ["Offsite parking available (MXN 165 per day)", "Wheelchair-accessible parking and van parking available"]
    },
    {
        heading: "Business services",
        icon: "", // Briefcase icon
        options: ["24-hour business center", "3 meeting rooms", "Computer station", "Coworking space"]
    },
    {
        heading: "Guest services",
        icon: "️", // Bellhop bell icon
        options: ["Change of bedsheets on request", "Change of towels on request"]
    },
    {
        heading: "Conveniences",
        icon: "",
        options: ["24-hour front desk", "24-hour health club", "Daily housekeeping", "Luggage storage", "Safe at front desk"]
    },
    {
        heading: "Things to do",
        icon: "", // Surfing icon for activities
        options: ["Outdoor pool", "Shopping"]
    },
    {
        heading: "Outdoors",
        icon: "", // Tree icon for outdoors
        options: ["Pool loungers"]
    }
];

const Amenities = () => {
    return (
        <section className={`card-shadow p-5 md:p-6 xl:p-7 rounded-2xl`}>
            <div className={``}>
                <div>
                    <h1 className="text-xl leading-none md:text-3xl md:leading-none text-brand-neutral-800 font-bold mb-3.5 md:mb-4 xl:mb-5">
                        Amenities
                    </h1>
                    <div className={`flex flex-col gap-6`}>
                        {/*         Marina Bay Sands Resort        */}
                        <div className={`flex flex-col gap-4`}>
                            <h2 className={`text-lg md:text-2xl text-brand-neutral-800 font-semibold`}>
                                Property Amenities
                            </h2>

                            <div className={` md:columns-2 lg:columns-3  gap-y-4 gap-x-16  `}>
                                {amenities.map((val, index) => (
                                <AmenityItem icon={''} title={val.heading} options={val.options} key={index}/>
                                ))}
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Amenities;
