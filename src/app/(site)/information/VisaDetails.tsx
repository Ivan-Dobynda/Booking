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
  eVisitors: "You can apply for an eVisa for this destination.",
  eTA: "You need an Electronic Travel Authorization (eTA) for this destination.",
};

const VisaStatusBannerState = {
  VR: "warning",
  VOA: "info",
  VF: "success",
  CB: "danger",
  NA: "danger",
};

interface IVisaRequirment {
  fromCountry?: string;
  toCountry?: string;
}

interface Errors {
  fromCountry?: string;
}

type VisaError = {
  status: boolean;
  error: string;
};

type VisaData = {
  data: string[];
  length: number;
};

interface IVisaResponse {
  passport: string;
  destination: string;
  dur: string;
  status: VisaStatus;
  category: string;
  last_updated: string;
  error: VisaError;
  vf?: VisaData;
  vr?: VisaData;
  voa?: VisaData;
  cb?: VisaData;
  na?: VisaData;
}

type BannerState = "danger" | "success" | "info" | "warning";

interface IVisaStatus {
  heading: string;
  body: string;
  state?: BannerState;
}

interface VisaDetailsProps {
  passportCountry?: string | null;
}

const getCountryNames = (countryCodes?: string[]): string[] => {
  if (!countryCodes) return [];
  return countryCodes.map((countryCode) => {
    const country = countries.find((country) => country.code === countryCode);
    return country ? country.name : countryCode; // Return "Unknown" if the country code is not found
  });
};

const getCountryCodeByName = (countryName?: string | null) => {
  if (!countryName) return;
  const selectedCountry = countries.find(
    (country) => country.name === countryName
  );
  return selectedCountry?.code;
};

const VisaDetails = ({ passportCountry }: VisaDetailsProps) => {
  const initialValues = {
    fromCountry: getCountryCodeByName(passportCountry) ?? undefined,
    toCountry: "",
  };

  const [values, setValues] = useState<IVisaRequirment>(initialValues);
  const [errors, setErrors] = useState<Errors>();
  const [visaStatus, setVisaStatus] = useState<IVisaStatus | null>(null);
  const [showAllVisa, setShowAllVisa] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const validateForm = () => {
    if (!values.fromCountry || values.fromCountry === "") {
      setErrors({ fromCountry: "Passport issued country is required" });
    }
  };

  const getVisaRequirements = async () => {
    validateForm();
    if (!values) return;
    const { fromCountry, toCountry } = values;
    if (!fromCountry) return;

    setIsLoading(true);
    const visa: IVisaResponse = await fetchVisaRequirements(
      fromCountry,
      toCountry
    );

    setIsLoading(false);
    if (visa.error?.status) {
      setVisaStatus({
        heading: "Something went wrong!",
        body: visa.error.error,
        state: "danger",
      });
      setIsLoading(false);
      return;
    }
    if (!toCountry) {
      const result = visa;
      setVisaStatus(null);
      setShowAllVisa(visa);
    } else {
      const result = {
        heading: VisaStatusText[visa.status] || visa.status,
        body:
          VisaCategoryText[visa.category as keyof typeof VisaCategoryText] ||
          visa.category,
        state: VisaStatusBannerState[visa.status] as BannerState,
      };
      setVisaStatus(result);
      setShowAllVisa(null);
    }
  };

  const getBannerClass = (status?: BannerState) => {
    switch (status) {
      case "info":
        return "bg-blue-50 border-blue-500";
      case "success":
        return "bg-green-50 border-green-500";
      case "warning":
        return "bg-yellow-50 border-yellow-500";
      case "danger":
        return "bg-red-50 border-red-500";
      default:
        return "bg-blue-50 border-blue-500";
    }
  };

  const renderVisaDetails = (
    passport: string,
    visaCountries: string[],
    headingPrefix: string,
    bannerClass: BannerState
  ) => {
    return (
      <div
        className={`${getBannerClass(
          bannerClass
        )} mt-4 py-2.5 md:py-3 px-3.5 md:px-4 border rounded-lg text-sm md:text-[15px] mb-6`}
      >
        <h3 className="font-semibold text-lg text-brand-neutral-800 mb-4">
          {`${headingPrefix} ${getCountryNames([passport])[0]}`}
        </h3>
        <ol className="text-brand-neutral-600 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
          {getCountryNames(visaCountries)?.map((country: string) => (
            <li key={country}>{country}</li>
          ))}
        </ol>
      </div>
    );
  };

  return (
    <section className="bg-white card-shadow p-5 md:p-6 xl:p-7 rounded-2xl">
      <header className="border-b-2 mb-3.5 sm:mb-4 lg:mb-5">
        <h3
          className="text-lg lg:text-xl lg:text-[22px] font-semibold text-brand-neutral-800 inline-block pb-3.5 border-brand-blue"
          style={{ lineHeight: 1 }}
        >
          Travel Visa Guide
        </h3>
      </header>
      <p className="text-brand-neutral-600 leading-[26px] text-[15px] mb-4 sm:mb-5 md:mb-6">
        Please fill out the form below to determine if you need a visa for your
        intended destination.
      </p>
      <div className="grid md:grid-cols-2 gap-4 md:gap-5 lg:gap-6 items-start mb-5">
        <SelectInput
          label="Passport Issued Country"
          id="fromCountry"
          onChange={(e) => {
            setValues({ ...values, fromCountry: e.target.value });
            setErrors({ ...errors, fromCountry: "" });
            setShowAllVisa(null);
            setVisaStatus(null);
          }}
          error={errors?.fromCountry}
          value={values.fromCountry}
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
          onChange={(e) => {
            setValues({ ...values, toCountry: e.target.value });
            setShowAllVisa(null);
            setVisaStatus(null);
          }}
        >
          <option value="">Any Destination</option>
          {countries.map((val) => (
            <option key={val.code} value={val.code}>
              {val.name}
            </option>
          ))}
        </SelectInput>
      </div>
      <div className="col-span-full flex justify-end pt-1 lg:pt-2">
        <Button
          onClick={getVisaRequirements}
          type="button"
          disabled={isLoading}
        >
          Check Visa
        </Button>
      </div>
      {isLoading ? (
        <div className="loader text-5xl mt-5" />
      ) : (
        <>
          {visaStatus && (
            <div
              className={`${getBannerClass(
                visaStatus.state
              )} mt-4 py-2.5 md:py-3 px-3.5 md:px-4 border rounded-lg text-sm md:text-[15px] mb-6`}
            >
              <h3 className="font-semibold text-lg mb-1 text-brand-neutral-800">
                {visaStatus?.heading}
              </h3>
              <p className=" text-brand-neutral-600 ">{visaStatus?.body}</p>
            </div>
          )}
          {showAllVisa && (
            <>
              {showAllVisa.vf &&
                renderVisaDetails(
                  showAllVisa.passport,
                  showAllVisa.vf.data,
                  "Visa Free Countries for",
                  "success"
                )}
              {showAllVisa.voa &&
                renderVisaDetails(
                  showAllVisa.passport,
                  showAllVisa.voa.data,
                  "Visa On Arrival Countries for",
                  "info"
                )}
              {showAllVisa.vr &&
                renderVisaDetails(
                  showAllVisa.passport,
                  showAllVisa.vr.data,
                  "Visa Required Countries for",
                  "warning"
                )}
              {showAllVisa.cb &&
                showAllVisa.cb.data.length > 0 &&
                renderVisaDetails(
                  showAllVisa.passport,
                  showAllVisa.cb.data,
                  "Covid Banned Countries for",
                  "danger"
                )}
              {showAllVisa.na &&
                showAllVisa.na.data.length > 0 &&
                renderVisaDetails(
                  showAllVisa.passport,
                  showAllVisa.na.data,
                  "No Admission Countries for",
                  "danger"
                )}
            </>
          )}
        </>
      )}
    </section>
  );
};

export default VisaDetails;
