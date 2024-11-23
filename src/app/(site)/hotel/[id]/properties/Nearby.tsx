import React from 'react';
import IconWithText from "@/Component/utils/IconWithText";
import {FaCheck} from "react-icons/fa6";

const Nearby = () => {


    return (
        <section className={`card-shadow p-5 md:p-6 xl:p-7 rounded-2xl`}>
            <h1 className="text-xl leading-none md:text-3xl md:leading-none text-brand-neutral-800 font-bold mb-3.5 md:mb-4 xl:mb-5">
                Nearby
            </h1>

            <div>
                <h2 className={`hotel-details-h2`}>Nearby Attractions</h2>
                <div className={`grid grid-cols-[auto,auto] gap-4 md:gap-x-16 place-content-start`}>
                    <IconWithText icon={<FaCheck/>} text={'Russell Square (2-3 mins walk)'}/>
                    <IconWithText icon={<FaCheck/>} text={'The British Museum (8-12 mins walk)'}/>
                    <IconWithText icon={<FaCheck/>} text={'The Museum (6-8 mins walk)'}/>
                    <IconWithText icon={<FaCheck/>} text={'The Harry Potter Shop at Platform 9 3/4 (10 mins drive)'}/>
                    <IconWithText icon={<FaCheck/>} text={'Harvard University (8-10 mins drive) '}/>
                    <IconWithText icon={<FaCheck/>} text={'Covent Garden Market (10 mins drive) '}/>
                    <IconWithText icon={<FaCheck/>} text={'London Palladium Theatre (1.1 miles)'}/>
                    <IconWithText icon={<FaCheck/>} text={'Oxford Circus (1.1 miles)'}/>

                </div>
            </div>

            <div className={`mt-6`}>
                <h2 className={`hotel-details-h2`}>Nearby Airports</h2>
                <div className={`grid grid-cols-[auto,auto] gap-4 md:gap-x-16 place-content-start`}>
                    <IconWithText icon={<FaCheck/>} text={'LCY (10.6 miles)'}/>
                    <IconWithText icon={<FaCheck/>} text={'LHR (18.2 miles)'}/>
                    <IconWithText icon={<FaCheck/>} text={'LTN (35 miles)'}/>
                    <IconWithText icon={<FaCheck/>} text={'STN (36 miles)'}/>
                    <IconWithText icon={<FaCheck/>} text={'LGW (54.9 miles)'}/>
                </div>
            </div>

        </section>
    );
};

export default Nearby;
