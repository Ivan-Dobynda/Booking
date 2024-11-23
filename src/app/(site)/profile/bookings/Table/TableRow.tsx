"use client";
import React from "react";
import { useRouter } from "next/navigation";

import { formatDate } from "@/lib/helpers";

interface TableRowProps {
  booking: any;
}

const TableRow = ({ booking }: TableRowProps) => {
  const router = useRouter();

  const onClickRow = () => {
    router.push(`/bookings/${booking?.orderId}`);
  };

  return (
    <tr
      key={booking.id}
      onClick={onClickRow}
      className="hover:bg-gray-50 transition cursor-pointer"
    >
      <td className="whitespace-nowrap py-4 pl-5 pr-3 text-sm font-medium text-gray-900">
        {/* <div className="relative"><Image></Image></div> */}
        {booking.airlineName}
      </td>
      <td className="whitespace-nowrap py-4 px-2.5 text-sm font-medium text-gray-900">
        {booking.orderId}
      </td>
      {/* <td className="whitespace-nowrap py-4 px-2.5 text-sm font-medium text-gray-900">
    {booking.name}
  </td>
  <td className="whitespace-nowrap py-4 px-2.5 text-sm font-medium text-gray-900">
    {booking.name}
  </td> */}
      <td className="whitespace-nowrap py-4 px-2.5 text-sm font-medium text-gray-900">
        {booking.currency} {booking.amount}
      </td>
      <td className="whitespace-nowrap py-4 pl-2.5 pr-4 text-sm font-medium text-gray-900">
        {formatDate(booking.createdAt, "DD/MM/YYYY")}
      </td>
    </tr>
  );
};

export default TableRow;
