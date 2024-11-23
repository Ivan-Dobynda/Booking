import React from 'react';
import ProgressBar from "@/Component/Progress/ProgressBar";
import ReviewCard from "@/Component/Cards/ReviewCard";
import Button from "@/Component/Button/Button";

const GuestReviews = () => {
    return (
        <section className={`card-shadow p-5 md:p-6 xl:p-7 rounded-2xl`}>
            <div className={``}>
                <div className={`flex flex-col gap-8`}>
                    <div>
                        <h1 className="text-xl leading-none md:text-3xl md:leading-none text-brand-neutral-800 font-bold mb-3.5 md:mb-4 xl:mb-5">
                            Guest Reviews
                        </h1>
                        <div className={`flex gap-2`}>
                            <div
                                className={`text-white bg-[#EE9D00] w-[32px] h-[32px] flex items-center justify-center rounded-md`}>
                                8.1
                            </div>
                            <div className={`text-brand-neutral-800 font-[500] text-lg`}>
                                Very Good <span
                                className={`inline-block text-sm text-brand-neutral-600`}>(1991 reviews)</span>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h2 className={`text-lg md:text-2xl text-brand-neutral-800 font-semibold`}>
                            Categories
                        </h2>
                        <div className={`mt-4 grid gap-4 sm:gap-8 sm:grid-cols-2 md:grid-cols-3`}>

                            {/*    Progress bar card   */}

                            <ProgressBar withTopLabel progress={50} title={'Staff'} rating={8.6}/>
                            <ProgressBar withTopLabel progress={50} title={'Staff'} rating={8.6}/>
                            <ProgressBar withTopLabel progress={50} title={'Staff'} rating={8.6}/>
                            <ProgressBar withTopLabel progress={50} title={'Staff'} rating={8.6}/>
                            <ProgressBar withTopLabel progress={50} title={'Staff'} rating={8.6}/>
                            <ProgressBar withTopLabel progress={50} title={'Staff'} rating={8.6}/>
                            <ProgressBar withTopLabel progress={50} title={'Staff'} rating={8.6}/>
                            <ProgressBar withTopLabel progress={50} title={'Staff'} rating={8.6}/>

                        </div>
                    </div>

                   <div className="mx-auto max-w-md md:max-w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

                    <ReviewCard
                            name={'Dean'}
                            rating={8}
                            designation={`Group`}
                            description={`
                                The shower had a good water pressure. It was the traditional non-thermostat shower, probably from the 70's. But at least it worked however I would suggest somewhere better.
                            `}
                        />
                        <ReviewCard
                            name={'Dean'}
                            rating={8}
                            designation={`Group`}
                            description={`
                                The shower had a good water pressure. It was the traditional non-thermostat shower, probably from the 70's. But at least it worked however I would suggest somewhere better.
                            `}
                        />
                        <ReviewCard
                            name={'Dean'}
                            rating={8}
                            designation={`Group`}
                            description={`
                                The shower had a good water pressure. It was the traditional non-thermostat shower, probably from the 70's. But at least it worked however I would suggest somewhere better.
                            `}
                        />
                    </div>

                    <div className={`flex items-center justify-center`}>
                        <Button variant={'primary'}>
                            Load More Reviews
                        </Button>
                    </div>


                </div>
            </div>
        </section>
    );
};

export default GuestReviews;
