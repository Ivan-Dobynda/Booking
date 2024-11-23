"use client";
import { useMemo } from "react";
import Button from "@/components/Button/Button";
import useHTTP from "@/hooks/useHTTP";
import Order from "@/types/Order";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import IndiaImage from "@/assets/images/destinations/india.png";
import Thailand from "@/assets/images/destinations/thailand.png";
import Australia from "@/assets/images/destinations/australia.png";
import Bangladesh from "@/assets/images/destinations/bangladesh.png";
import London from "@/assets/images/destinations/london.png";
import Usa from "@/assets/images/destinations/usa.png";
import Japan from "@/assets/images/destinations/japan.png";

const Bookings = () => {
  const { loading, data, err } = useHTTP(
    `${process.env.NEXT_PUBLIC_API_URL}/orders`,
    { active: true }
  );

  const router = useRouter();

  const onRowClick = (id: string) => {
    router.push(`/bookings/${id}`);
  };

  const bookings = useMemo(() => {
    if (!data?.result) return [];

    return (data?.result || []).filter((item: Order) => item.orderId);
  }, [data]);

  return (
    <div>
      <h1
        className="text-lg lg:text-xl xl:text-2xl font-semibold text-brand-neutral-800 inline-block mb-5"
        style={{ lineHeight: 1 }}
      >
        Bookings
      </h1>
      <div className="bg-white rounded-2xl card-shadow overflow-auto">
        {data?.result?.length > 0 && (
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th
                  scope="col"
                  className="py-3 pl-5 pr-2.5 text-left text-sm font-semibold text-gray-700 whitespace-nowrap"
                >
                  AIRLINE
                </th>
                <th
                  scope="col"
                  className="px-2.5 py-3 text-left text-sm font-semibold text-gray-700 whitespace-nowrap"
                >
                  Order ID
                </th>
                {/* <th
                scope="col"
                className="px-2.5 py-3 text-left text-sm font-semibold text-gray-700 whitespace-nowrap"
              >
                STATUS
              </th>
              <th
                scope="col"
                className="px-2.5 py-3 text-left text-sm font-semibold text-gray-700 whitespace-nowrap"
              >
                NEXT DEPARTURE
              </th> */}
                <th
                  scope="col"
                  className="px-2.5 py-3 text-left text-sm font-semibold text-gray-700 whitespace-nowrap"
                >
                  AMOUNT
                </th>

                <th
                  scope="col"
                  className="pl-2.5 py-3 pr-4 text-left text-sm font-semibold text-gray-700 whitespace-nowrap"
                >
                  CREATION DATE
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {bookings.map((order: Order) => (
                <tr
                  key={order.id}
                  className="hover:bg-gray-50 transition cursor-pointer"
                  onClick={() => onRowClick(order?.orderId)}
                >
                  <td className="py-3 pl-5 pr-2.5 text-sm text-gray-700 font-medium">
                    {order.airlineName}
                  </td>
                  <td className="py-3 px-2.5 text-sm text-gray-600 font-medium">
                    {order?.orderId}
                  </td>
                  <td className="py-3 px-2.5 text-sm text-gray-600 font-medium">
                    {order.currency} {order.amount}
                  </td>
                  <td className="py-3 px-2.5 text-sm text-gray-600 font-medium">
                    {new Date(order.created_at).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {data?.result?.length === 0 && (
          <div className="py-5 pl-5 pr-2.5 text-sm text-center text-gray-700">
            <div>
              {`Currently, it looks like you haven't made any bookings with us
              yet.`}
            </div>
            <div className="mb-5">
              Why not explore our exciting offers and treat yourself to a
              well-deserved break?
            </div>
            <div className="top-destinations-right-grid grid gap-4 md:gap-5 lg:gap-6 grid-cols-2 h-[600px] lg:h-[550px] 2xl:h-[580px] pt-4 pb-8">
              <div className="destination-1 relative rounded-xl md:rounded-2xl lg:rounded-3xl overflow-hidden">
                <Image
                  src={Australia}
                  alt="destination-1"
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-black bg-opacity-30 flex justify-center items-center">
                  <span className="text-base md:text-lg text-white font-medium">
                    Australia
                  </span>
                </div>
              </div>
              <div className="destination-2 relative rounded-xl md:rounded-2xl lg:rounded-3xl overflow-hidden">
                <Image
                  src={IndiaImage}
                  alt="destination-2"
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-black bg-opacity-30 flex justify-center items-center">
                  <span className="text-base md:text-lg text-white font-medium">
                    India
                  </span>
                </div>
              </div>
              <div className="destination-3 relative rounded-xl md:rounded-2xl lg:rounded-3xl overflow-hidden">
                <Image
                  src={Thailand}
                  alt="destination-3"
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-black bg-opacity-30 flex justify-center items-center">
                  <span className="text-base md:text-lg text-white font-medium">
                    Thailand
                  </span>
                </div>
              </div>
              <div className="destination-4 relative rounded-xl md:rounded-2xl lg:rounded-3xl overflow-hidden">
                <Image
                  src={Bangladesh}
                  alt="destination-4"
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-black bg-opacity-30 flex justify-center items-center">
                  <span className="text-base md:text-lg text-white font-medium">
                    Bangladesh
                  </span>
                </div>
              </div>
              <div className="destination-5 relative rounded-xl md:rounded-2xl lg:rounded-3xl overflow-hidden">
                <Image
                  src={London}
                  alt="destination-5"
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-black bg-opacity-30 flex justify-center items-center">
                  <span className="text-base md:text-lg text-white font-medium">
                    London
                  </span>
                </div>
              </div>
              <div className="destination-6 relative rounded-xl md:rounded-2xl lg:rounded-3xl overflow-hidden">
                <Image
                  src={Usa}
                  alt="destination-6"
                  className="w-full h-full object-cover object-right"
                />
                <div className="absolute inset-0 bg-black bg-opacity-30 flex justify-center items-center">
                  <span className="text-base md:text-lg text-white font-medium">
                    USA
                  </span>
                </div>
              </div>
              <div className="destination-7 relative rounded-xl md:rounded-2xl lg:rounded-3xl overflow-hidden">
                <Image
                  src={Japan}
                  alt="destination-7"
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-black bg-opacity-30 flex justify-center items-center">
                  <span className="text-base md:text-lg text-white font-medium">
                    Japan
                  </span>
                </div>
              </div>
            </div>

            <Button href="/" variant="secondary">
              Check them out now
            </Button>
          </div>
        )}
      </div>
      {loading && <div className="loader text-5xl mt-5" />}
    </div>
  );
};

export default Bookings;
