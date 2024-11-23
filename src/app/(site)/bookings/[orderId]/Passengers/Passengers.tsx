import { formatDate } from "@/lib/helpers";
import React from "react";
import { FaUser } from "react-icons/fa6";

interface PassengersProps {
  passengers: any[];
}

const Passengers = ({ passengers }: PassengersProps) => {
  return (
    <section className="bg-white card-shadow p-4 md:p-5 xl:p-6 rounded-2xl">
      <h2 className="text-lg leading-none md:text-xl md:leading-none text-brand-neutral-800 font-semibold mb-4 md:mb-5 xl:mb-6">
        Passengers
      </h2>
      <div>
        {passengers?.map((passenger, index) => (
          <div key={index}>
            <div className="capitalize inline-flex items-center gap-1.5 py-1.5 px-3 leading-none text-gray-700 bg-gray-200 rounded text-sm mb-3">
              <FaUser />
              <span>
                {passenger?.type} {index + 1}
              </span>
            </div>
            <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
              <div>
                <h4 className="text-sm text-gray-600 mb-1">Name</h4>
                <h5 className="font-mediumtext-gray-700">
                  <span className="uppercase">{passenger?.title}</span>{" "}
                  {passenger?.given_name} {passenger?.family_name}
                </h5>
              </div>
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <h4 className="text-sm text-gray-600 mb-1">Date of birth</h4>
                  <h5 className="font-mediumtext-gray-700">
                    {formatDate(passenger?.born_on)}
                  </h5>
                </div>
                <div>
                  <h4 className="text-sm text-gray-600 mb-1">Gender</h4>
                  <h5 className="font-mediumtext-gray-700">
                    {passenger?.gender === "m" ? "MALE" : "FEMALE"}
                  </h5>
                </div>
              </div>
              <div>
                <h4 className="text-sm text-gray-600 mb-1">Email</h4>
                <h5 className="font-mediumtext-gray-700">{passenger?.email}</h5>
              </div>
              <div>
                <h4 className="text-sm text-gray-600 mb-1">Contact number</h4>
                <h5 className="font-mediumtext-gray-700">
                  {passenger?.phone_number}
                </h5>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Passengers;
