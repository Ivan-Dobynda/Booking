import React from "react";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import TermsGroup from "./TermsGroup";
import data from "./data";

const TermsAndConditions = () => {
  return (
    <main>
      <Breadcrumb
        title="Terms and conditions"
        pages={["Home", "Terms and conditions"]}
      />

      <section className="sm:pt-14 md:pt-16 lg:pt-20 pb-16 md:pb-20 lg:pb-24 sm:bg-gray-50">
        <div className="base-container text-brand-neutral-700 space-y-6">
          <p className="leading-relaxed text-base lg:leading-relaxed lg:text-lg">
            The following Terms of Service, become the content of the contract
            concluded between “you” the client and FlySmartDeals of 128 City
            Road, London, United Kingdom, EC1V 2NX (“FlySmartDeals”, “we”, “us”,
            “our”. Your agreement to comply with and be bound by these terms of
            service is deemed to occur upon your first use of the Services. If
            you do not agree to be bound by these terms of service, you should
            stop make a booking. Please read these terms of service carefully
            before booking!
          </p>
          <div className="space-y-1">
            <p className="leading-relaxed text-base lg:leading-relaxed lg:text-lg">
              FlySmartDeals provides tours and package holidays, is bound by the
              Package Travel, Package Holidays and Package Tours Regulations
              1992 and accordingly acts as a booking agent in various ways:
            </p>
            <p className="leading-relaxed text-base lg:leading-relaxed lg:text-lg">
              a) Within the framework of the brokerage of bespoke holiday
              itineraries for individuals and groups.
            </p>
            <p className="leading-relaxed text-base lg:leading-relaxed lg:text-lg">
              b) In the context of the brokerage of individual services which
              are not offered explicitly, such as the brokerage of flights or
              hotel accommodation.
            </p>
            <p className="leading-relaxed text-base lg:leading-relaxed lg:text-lg">
              c) In the form of the brokerage of combined travel services, i.e.,
              different types of travel services which are not services in a
              specifically coordinated manner for the purpose of the same trip.
              Thus, your contract for the purchase of travel products and
              services may be with FlySmartDeals if FlySmartDeals is acting as a
              principal or directly with the relevant Travel Suppliers where
              FlySmartDeals acts as an agent.
            </p>

            <p className="leading-relaxed text-base lg:leading-relaxed lg:text-lg">
              We will notify you at the time of booking whether we are acting as
              a principal or agent in relation to your booking.
            </p>
          </div>
          <div>
            {data.map((group, index) => (
              <TermsGroup key={index} {...group} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default TermsAndConditions;
