import React from "react";
import Image from "next/image";

import { formatDate } from "@/lib/helpers";
import StatusPill from "@/components/Pills/StatusPill";

interface AsideProps {
  orderDetails: any;
}

const Aside = ({ orderDetails }: AsideProps) => {
  return (
    <aside className="w-full md:w-[346px] 2xl:w-96">
      <div className="bg-white card-shadow p-4 md:p-5 xl:p-6 rounded-2xl">
        <div className="mb-6">
          <h2 className="text-lg leading-none md:text-xl md:leading-none text-brand-neutral-800 font-semibold mb-2 md:mb-2.5 xl:mb-3">
            Summary
          </h2>
          <h4 className="text-sm space-x-2">
            <span className="text-gray-600">LAST SYNCED:</span>
            <span className="text-gray-900">
              {formatDate(orderDetails?.synced_at, "DD/MM/YYYY, HH:mm")}
            </span>
          </h4>
        </div>
        <div className="mb-5">
          <h4 className="text-gray-600 mb-1">Status</h4>
          <StatusPill status={orderDetails?.type} />
        </div>
        <div className="mb-5 flex gap-3 justify-between">
          <div>
            <h4 className="text-gray-600 mb-1">Airline</h4>
            <div className="flex items-center gap-2">
              {orderDetails?.owner?.logo_symbol_url ? (
                <Image
                  width={32}
                  height={32}
                  className="object-contain w-8 h-8"
                  src={orderDetails?.owner?.logo_symbol_url}
                  alt={orderDetails?.owner?.name}
                />
              ) : null}
              <span className="font-medium text-gray-700 text-[15px]">
                Duffel Airways
              </span>
            </div>
          </div>
          <div>
            <h4 className="text-gray-600 mb-1">Issuing date</h4>
            <span className="font-medium text-gray-700 text-[15px]">
              {formatDate(orderDetails?.created_at, "DD/MM/YYYY")}
            </span>
          </div>
        </div>

        <div>
          <h4 className="text-gray-600 mb-1">Order ID</h4>
          <span className="font-medium text-gray-700 text-[15px]">
            {orderDetails?.id}
          </span>
        </div>
      </div>
    </aside>
  );
};

export default Aside;
