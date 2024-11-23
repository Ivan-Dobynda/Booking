import React, {useCallback, useEffect, useState} from 'react';
import HotelImage from "@/assets/images/hotel.png";
import Image from "next/image";
import {EmblaCarouselType} from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-react'
import {classNames} from "@/lib/helpers";
import {FaChevronLeft, FaChevronRight} from "react-icons/fa6";


const HotelRoomImageCarousel = () => {
    const options = {};
    const [emblaRef, emblaApi] = useEmblaCarousel(options)

    const [prevBtnDisabled, setPrevBtnDisabled] = useState(true)
    const [nextBtnDisabled, setNextBtnDisabled] = useState(true)

    const scrollPrev = useCallback(
        () => emblaApi && emblaApi.scrollPrev(),
        [emblaApi]
    )
    const scrollNext = useCallback(
        () => emblaApi && emblaApi.scrollNext(),
        [emblaApi]
    )

    const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
        setPrevBtnDisabled(!emblaApi.canScrollPrev())
        setNextBtnDisabled(!emblaApi.canScrollNext())
    }, [])

    useEffect(() => {
        if (!emblaApi) return

        onSelect(emblaApi)
        emblaApi.on('reInit', onSelect)
        emblaApi.on('select', onSelect)
    }, [emblaApi, onSelect])

    return (
        <div className={`relative`}>
            <div className="embla">
                <div className="embla__viewport overflow-hidden" ref={emblaRef}>
                    <div className="embla__container backface-visibility-hidden flex touch-pan-y ml-[-1rem] ">
                        {[0, 1, 2, 3, 4, 5].map((index) => (
                            <div
                                className="embla__slide min-w-0 pl-4 flex-[0_0_100%] aspect-video  relative overflow-hidden "
                                key={index}
                            >
                                <Image
                                    className={classNames(`embla__slide__img rounded-2xl aspect-video block h-auto !w-full object-cover`)}
                                    src={HotelImage} alt={'hotel image'}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <button
                disabled={prevBtnDisabled}
                onClick={scrollPrev}
                className={`disabled:opacity-70 flex items-center justify-center absolute left-4 bg-white w-[32px] h-[32px] rounded-full top-1/2 -translate-y-1/2`}>
                <FaChevronLeft/>
            </button>
            <button
                disabled={nextBtnDisabled}
                onClick={scrollNext}
                className={`disabled:opacity-70 flex items-center justify-center absolute right-4 bg-white w-[32px] h-[32px] rounded-full top-1/2 -translate-y-1/2`}>
                <FaChevronRight/>
            </button>
        </div>
    );
};

export default HotelRoomImageCarousel;
