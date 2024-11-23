"use client"

import React, { FC } from "react"
import Button from "../Button/Button"
import { classNames, formatDate } from "@/lib/helpers"
import Image from "next/image"
import moment from "moment-timezone"
import commission from "@/constants/commission"

interface IProps {
  offer: any
  client_key: string
}

const SingleFlightDetail: FC<IProps> = ({ offer, client_key }) => {
  const slice = offer.slices[0]
  const segment = slice?.segments?.[0],
    departing_at = moment(segment?.departing_at).tz(segment?.time_zone),
    arriving_at = moment(segment?.arriving_at).tz(segment?.time_zone)

  return (
    <div className='flex flex-col gap-4 w-full'>
      <div className='flex justify-between items-center gap-4'>
        <div className='divide-y space-y-4 lg:space-y-5 w-auto'>
          <div className='flex flex-col sm:flex-row justify-between sm:items-center gap-3 sm:gap-4 md:gap-5 xl:gap-8'>
            <div className='flex flex-col justify-center items-center'>
              <div className='w-20 lg:w-24 h-20 lg:h-24 overflow-hidden mb-3 sm:mb-4'>
                <Image
                  width={96}
                  height={96}
                  src={slice?.segments?.[0]?.airline_logo}
                  alt='flight logo'
                  className='object-contain object-center h-full w-full'
                />
              </div>
              <div className='text-center'>
                <h4 className='text-sm sm:text-base font-medium text-brand-neutral-600 sm:leading-none leading-none mb-2'>
                  {slice?.segments?.[0]?.airline_name}
                </h4>
                <h6 className='text-green-500 text-xs sm:text-sm leading-none sm:leading-none'>
                  {slice?.segments?.[0]?.aircraft?.name}
                </h6>
              </div>
            </div>
          </div>
        </div>

        <div className='flex flex-col gap-5 sm:gap-6 justify-center w-auto max-w-lg'>
          <div className='xl:text-right flex items-center xl:items-stretch justify-between xl:flex-col'>
            <div>
              <h4 className='text-[17px] sm:text-lg md:text-xl leading-none sm:leading-none md:leading-none font-bold text-brand-neutral-800 mb-2'>
                {offer?.total_currency} {(offer?.total_amount * commission).toFixed()}
              </h4>
              <p className='text-brand-neutral-600 leading-none text-sm md:text-base md:leading-none xl:mb-4'>
                {offer?.slices?.length === 1 ? "Trip " : ""}
                {offer?.slices?.length === 2 ? "Round trip " : ""}
                {offer?.slices?.length >= 3 ? "Multiway trip " : ""}
                for {offer?.total_passengers} traveler
                {offer?.total_passengers > 1 ? "s" : ""}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className='flex flex-col sm:flex-row justify-between sm:items-center gap-3 sm:gap-4 md:gap-5 xl:gap-8'>
        <div className='flex-col md:flex-row flex-1 flex  items-center gap-3 md:gap-4 xl:gap-6 justify-between'>
          <div className='flex justify-between w-full'>
            <div className='w-full'>
              <div className='mb-2 md:mb-3 sm:leading-none leading-none text-xs sm:text-sm text-brand-neutral-600'>
                Depart
              </div>
              <div className='leading-none text-brand-neutral-800 font-medium mb-2 hidden md:block'>
                {departing_at.format("hh:mm A")}
              </div>
              <div className='leading-none text-sm text-brand-neutral-600 mb-4 hidden md:block'>
                {arriving_at.format("DD MMM YYYY")}
              </div>
              <div className='leading-none text-sm sm:text-base text-brand-neutral-800 font-medium'>
                {slice?.origin} ({slice?.origin_code})
              </div>
            </div>
            <div className='block md:hidden text-right'>
              <div className='leading-none text-xs sm:text-sm text-brand-neutral-600 mb-2'>
                {formatDate(departing_at, "ddd, DD MMM YYYY")}
              </div>
              <div className='leading-none text-sm sm:text-base text-brand-neutral-800 font-medium'>
                {formatDate(departing_at, "hh:mm A")}
              </div>
            </div>
          </div>
          <div className='w-full text-center md:space-y-1'>
            <div className='flex flex-col items-end w-full'>
              <div className='h-4 w-px bg-red-500 -rotate-[40deg] origin-bottom-right'></div>
              <div className='w-full h-px bg-red-500'></div>
              <div className='h-4 w-px bg-red-500 rotate-[40deg] origin-top-right opacity-0'></div>
            </div>

            <p className='text-xs sm:text-sm text-brand-neutral-800 font-medium leading-none -mt-1 md:mt-0'>
              {slice?.segments?.length > 1 ? (
                <>
                  <strong>
                    {slice.segments?.length - 1} Stop
                    {slice.segments?.length - 1 > 1 ? "s" : ""}
                  </strong>
                </>
              ) : (
                "Non Stop"
              )}
            </p>
          </div>
          <div className='flex justify-between w-full'>
            <div className='w-full'>
              <div className='md:text-end mb-2 md:mb-3 sm:leading-none leading-none text-xs sm:text-sm text-brand-neutral-600'>
                Arrive
              </div>
              <div className='md:text-end leading-none text-brand-neutral-800 font-medium mb-2 hidden md:block'>
                {arriving_at.format("hh:mm A")}
              </div>
              <div className='md:text-end leading-none text-sm text-brand-neutral-600 mb-4 hidden md:block'>
                {arriving_at.format("DD MMM YYYY")}
              </div>
              <div className='md:text-end leading-none text-sm sm:text-base text-brand-neutral-800 font-medium'>
                {slice?.destination} ({slice?.destination_code})
              </div>
            </div>
            <div className='block md:hidden text-right'>
              <div className='leading-none text-xs sm:text-sm text-brand-neutral-600 mb-2'>
                {formatDate(slice?.segments?.[slice?.segments?.length - 1]?.departing_at, "ddd, DD MMM YYYY")}
              </div>
              <div className='leading-none text-sm sm:text-base text-brand-neutral-800 font-medium'>
                {formatDate(slice?.segments?.[slice?.segments?.length - 1]?.arriving_at, "HH:mm")}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Button href={`/flight/${offer?.id}?client_key=${client_key}`} className='mt-3'>
        View Deal
      </Button>
    </div>
  )
}

export default SingleFlightDetail
