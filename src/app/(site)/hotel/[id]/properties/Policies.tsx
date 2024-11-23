import React from 'react';
import {FaRegCalendarAlt} from "react-icons/fa";
import IconWithText from "@/Component/utils/IconWithText";
import {FaCheck} from "react-icons/fa6";
import Amex from '@/assets/payment-icons/amex.png'
import Payoneer from '@/assets/payment-icons/payoneer.png'
import Discover from '@/assets/payment-icons/discover.png'
import Visa from '@/assets/payment-icons/visa.png'
import Paypal from '@/assets/payment-icons/paypal.png'
import Webmoney from '@/assets/payment-icons/webmoney.png'
import Image from "next/image";

const Policies = () => {
    const paymentOptions = [
        Amex,Payoneer,Discover,Visa,Paypal,Webmoney
    ]

    return (
        <section className={`card-shadow p-5 md:p-6 xl:p-7 rounded-2xl text-brand-neutral-700`}>
            <h1 className="text-xl leading-none md:text-3xl md:leading-none text-brand-neutral-800 font-bold mb-3.5 md:mb-4 xl:mb-5">
                Policies
            </h1>
            <div className={`flex flex-col gap-6`}>
                <div>
                    <h2 className={`hotel-details-h2`}>
                        Hotel Policies
                    </h2>
                    <div className={`border border-brand-blue-300 inline-flex gap-4 rounded-2xl px-6 `}>
                        <div className={`py-6 border-r border-dashed pr-6 border-brand-blue-300 flex gap-2`}>
                            <div className={'mt-1'}>
                                <FaRegCalendarAlt className={`text-lg`}/>
                            </div>
                            <div className={`text-brand-neutral-700`}>
                                <p className={`font-semibold text-xl`}>Check-in</p>
                                <p>Tue, Jan 16, 2024 01:00 PM</p>
                            </div>

                        </div>
                        <div className={`py-6 pl-6 flex gap-2`}>
                            <div className={'mt-1'}>
                                <FaRegCalendarAlt className={`text-lg`}/>
                            </div>
                            <div className={`text-brand-neutral-700`}>
                                <p className={`font-semibold text-xl`}>Check-out</p>
                                <p>Sat, Jan 19, 2024 11:00 AM</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <h2 className={`hotel-details-h2`}>
                        Early Check-in
                    </h2>
                    <p>
                        {`Early check-in only after 10 AM is possible but can be confirmed, subject to availability upon
                        arrival at the hotel and not in advance. For check-in prior to 10 AM, an extra half day's tariff
                        shall be applicable.`}
                    </p>
                </div>

                <div>
                    <h2 className={`hotel-details-h2`}>
                        Late check-out
                    </h2>
                    <p>
                        {`Late check-out between 12 pm and 1 pm is possible (free of charge) but can be confirmed, subject
                        to availability, only at the time of check-out and not in advance. For check-out after 1 PM, an
                        extra night's tariff shall be applicable.`}
                    </p>
                </div>

                <div>
                    <h2 className={`hotel-details-h2`}>
                        Special check-in instructions
                    </h2>
                    <p>
                        Front desk staff will greet guests on arrival
                    </p>
                </div>

                <div>
                    <h2 className={`hotel-details-h2`}>
                        Children and extra beds
                    </h2>
                    <div className={`flex gap-4 flex-wrap`}>
                       <IconWithText icon={ <FaCheck/>} text={'Children are welcome'}/>
                       <IconWithText icon={ <FaCheck/>} text={'Rollaway/extra beds are not available'}/>
                       <IconWithText icon={ <FaCheck/>} text={'Cribs (infant beds) are not available'}/>
                    </div>
                </div>

                <div>
                    <h2 className={`hotel-details-h2`}>
                        Property payment types
                    </h2>
                    <div className={`flex gap-4 flex-wrap`}>
                        <IconWithText icon={ <FaCheck/>} text={'Children are welcome'}/>
                        <IconWithText icon={ <FaCheck/>} text={'Rollaway/extra beds are not available'}/>
                        <IconWithText icon={ <FaCheck/>} text={'Cribs (infant beds) are not available'}/>
                    </div>
                </div>

                <div>
                    <h2 className={`hotel-details-h2`}>
                        Property payment types
                    </h2>
                    <div className={`flex gap-4 items-center mt-1`}>
                        {paymentOptions.map((val, index) => (
                            <Image key={index} src={val} alt={'payment option'}/>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
};

export default Policies;
