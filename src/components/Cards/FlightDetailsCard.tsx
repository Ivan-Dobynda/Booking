import Image from "next/image"
import React from "react"
import Button from "../Button/Button"
import { classNames, formatDate } from "@/lib/helpers"
import moment from "moment-timezone"
import SingleFlightDetail from "./SingleFlightDetail"
import MultipleFlightDetail from "./MultipleFlightDetail"

interface FlightDetailsCardProps {
  offer: any
  client_key: string
}

const FlightDetailsCard = ({ offer, client_key }: FlightDetailsCardProps) => {
  return (
    <div className='flight-details-card p-4 md:p-5 xl:p-6 rounded-2xl flex flex-col xl:flex-row items-center gap-5 justify-between'>
      {offer.flight_type === "one-way" ? (
        <SingleFlightDetail offer={offer} client_key={client_key} />
      ) : (
        <MultipleFlightDetail offer={offer} client_key={client_key} />
      )}
    </div>
  )
}

export default FlightDetailsCard
