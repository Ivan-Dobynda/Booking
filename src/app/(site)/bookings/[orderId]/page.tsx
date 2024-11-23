import React from "react";
import { redirect } from "next/navigation";

import Aside from "./Aside/Aside";
import Passengers from "./Passengers/Passengers";
import BillingSummary from "./BillingSummary/BillingSummary";
import JourneyDetails from "./JourneyDetails/JourneyDetails";
import FlightInformation from "./FlightInformation/FlightInformation";

const fetchOrderDetails = async (orderId?: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/profile/bookings/${orderId}`
    );

    if (!res?.ok) return null;

    const orderDetails = await res.json();

    return orderDetails?.result;
  } catch (err) {
    console.log("(fetchOrderDetails) Something went wrong");

    return null;
  }
};

interface OrderDetailsProps {
  params: {
    orderId?: string;
  };
}

const OrderDetails = async ({ params }: OrderDetailsProps) => {
  if (!params?.orderId) redirect("/profile/bookings");

  const orderDetails = await fetchOrderDetails(params?.orderId);

  if (!orderDetails?.id) return JSON.stringify(orderDetails);

  return (
    <div className="pt-10 md:pt-14 lg:pt-16 xl:pt-20 pb-12 md:pb-16 lg:pb-20 xl:pb-24 sm:bg-gray-50">
      <div className="base-container flex flex-col lg:flex-row items-start gap-5 md:gap-6 xl:gap-7">
        <div className="flex-1 w-full lg:w-auto">
          <h1 className="text-2xl leading-none md:text-3xl md:leading-none text-brand-neutral-800 font-bold mb-6 md:mb-7 xl:mb-8">
            {orderDetails?.booking_reference}
          </h1>

          <div className="space-y-5 md:space-y-6 xl:space-y-7">
            <JourneyDetails slices={orderDetails?.slices} />
            <FlightInformation slices={orderDetails?.slices} />
            <Passengers passengers={orderDetails?.passengers} />
            <BillingSummary orderDetails={orderDetails} />
          </div>
        </div>
        <Aside orderDetails={orderDetails}></Aside>
      </div>
    </div>
  );
};

export default OrderDetails;
