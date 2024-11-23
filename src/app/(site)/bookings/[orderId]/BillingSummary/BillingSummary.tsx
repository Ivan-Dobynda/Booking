import React from "react";

interface BillingSummaryProps {
  orderDetails: any;
}

const BillingSummary = ({ orderDetails }: BillingSummaryProps) => {
  return (
    <section className="bg-white card-shadow p-4 md:p-5 xl:p-6 rounded-2xl">
      <h2 className="text-lg leading-none md:text-xl md:leading-none text-brand-neutral-800 font-semibold mb-4 md:mb-5 xl:mb-6">
        Billing Summary
      </h2>
      <table className="min-w-full divide-y">
        <thead>
          <tr>
            <th className="text-left font-medium text-gray-800 px-3.5 py-2 whitespace-nowrap">
              Description
            </th>
            <th className="text-right font-medium text-gray-800 px-3.5 py-2 whitespace-nowrap">
              Price ({orderDetails?.base_currency})
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="even:bg-gray-50">
            <td className="w-full px-3.5 py-2 text-gray-500 text-left">Fare</td>
            <td className="px-3.5 py-2 text-gray-500 text-right font-medium">
              {orderDetails.base_amount}
            </td>
          </tr>
          <tr className="even:bg-gray-50">
            <td className="w-full px-3.5 py-2 text-gray-500 text-left">
              Fare taxes{" "}
            </td>
            <td className="px-3.5 py-2 text-gray-500 text-right font-medium">
              {orderDetails.tax_amount}
            </td>
          </tr>
        </tbody>
        <tfoot>
          {" "}
          <tr>
            <th className="px-3.5 pt-4 text-right  font-medium text-gray-700">
              Total ({orderDetails?.total_currency})
            </th>
            <td className="px-3.5 pt-4 text-right  font-semibold text-gray-700">
              {orderDetails?.total_amount}
            </td>
          </tr>
        </tfoot>
      </table>
    </section>
  );
};

export default BillingSummary;
