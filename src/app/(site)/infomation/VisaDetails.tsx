"use client";

import Button from "@/components/Button/Button";
import SelectInput from "@/components/Form/SelectInput";
import { countries } from "@/lib/countries";
import { fetchVisaRequirements } from "@/lib/services/visaService";
import { useEffect, useState } from "react";

type VisaStatus = "VR" | "VOA" | "VF" | "CB" | "NA";

const VisaStatusText = {
  VR: "Visa Required",
  VOA: "Visa on Arrival",
  VF: "Visa Free",
  CB: "Covid Banned",
  NA: "No Admission",
};

const VisaCategoryText = {
  "visa-free": "You do not need a visa for this destination.",
  "visa required": "A visa is required for this destination.",
  "visa on arrival": "You can obtain a visa upon arrival.",
  "visa on arrival / eVisa":
    "You can obtain a visa upon arrival or apply for an eVisa for this destination.",
  eVisa: "You can apply for an eVisa for this destination.",
  eTA: "You need an Electronic Travel Authorization (eTA) for this destination.",
};

interface IVisaRequirment {
  fromCountry?: string;
  toCountry?: string;
}

type Error = {
  status: boolean;
  error: string;
};

interface IVisaResponse {
  passport: string;
  destination: string;
  dur: string;
  status: VisaStatus;
  category: string;
  last_updated: string;
  error: Error;
}

interface IVisaStatus {
  heading: string;
  body: string;
}
const VisaDetails = () => {
  const [values, setValues] = useState<IVisaRequirment>();
  const [visaStatus, setVisaStatus] = useState<IVisaStatus>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getVisaRequirements = async () => {
    if (!values) return;
    const { fromCountry, toCountry } = values;
    if (!fromCountry || !toCountry) return;
    setIsLoading(true);
    const visa: IVisaResponse = await fetchVisaRequirements(
      fromCountry,
      toCountry
    );
    console.log(visa);
    const result = {
      heading: VisaStatusText[visa.status] || visa.status,
      body:
        VisaCategoryText[visa.category as keyof typeof VisaCategoryText] ||
        visa.category,
    };
    setIsLoading(false);
    setVisaStatus(result);
  };
  return (
    <div>
      <section className="card-shadow p-5 md:p-6 xl:p-7 rounded-2xl">
        <h2 className="text-[17px] leading-none sm:text-lg sm:leading-none md:text-xl md:leading-none font-bold text-brand-neutral-800  mb-3.5 sm:mb-4 md:mb-5">
          Travel Visa Guide
        </h2>
        <p className="text-brand-neutral-600 leading-[26px] text-[15px] mb-4 sm:mb-5 md:mb-6">
          Please fill out the form below to determine if you need a visa for
          your intended destination.
        </p>
        <div className="grid md:grid-cols-2 gap-4 md:gap-5 lg:gap-6 items-start mb-5">
          <SelectInput
            label="Passport Issued Country"
            id="fromCountry"
            onChange={(e) =>
              setValues({ ...values, fromCountry: e.target.value })
            }
          >
            <option value="">Select Country</option>
            {countries.map((val) => (
              <option key={val.code} value={val.code}>
                {val.name}
              </option>
            ))}
          </SelectInput>
          <SelectInput
            label="Destination"
            id="toCountry"
            onChange={(e) =>
              setValues({ ...values, toCountry: e.target.value })
            }
          >
            <option value="">Select Country</option>
            {countries.map((val) => (
              <option key={val.code} value={val.code}>
                {val.name}
              </option>
            ))}
          </SelectInput>
        </div>
        <Button
          onClick={getVisaRequirements}
          type="button"
          disabled={isLoading}
        >
          Check now
        </Button>
        {isLoading ? (
          <div className="loader text-5xl mt-5" />
        ) : (
          visaStatus && (
            <div className="mt-4 py-2.5 md:py-3 px-3.5 md:px-4 border rounded-lg bg-blue-50 border-blue-500 text-sm md:text-[15px] mb-6">
              <h3 className="font-semibold text-lg mb-1 text-brand-neutral-800">
                {visaStatus?.heading}
              </h3>
              <p className=" text-brand-neutral-600 ">{visaStatus?.body}</p>
            </div>
          )
        )}
      </section>
    </div>
  );
};

export default VisaDetails;
