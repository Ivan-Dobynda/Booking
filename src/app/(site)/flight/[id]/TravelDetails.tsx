"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import * as yup from "yup";
import { toast } from "react-toastify";
import { useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { FaInfoCircle } from "react-icons/fa";
import { FaCaretDown, FaCaretUp, FaCheck } from "react-icons/fa6";
import dynamic from "next/dynamic";

import FlightLogo from "@/assets/logos/flight-logo.png";

import TextInput from "@/components/Form/TextInput";
import Checkbox from "@/components/Form/Checkbox";
import RadioInput from "@/components/Form/RadioInput";
import InputLabel from "@/components/Form/InputLabel";
import PaymentModal from "@/components/Modals/PaymentModal";
import Button from "@/components/Button/Button";
import ErrorMessage from "@/components/Form/ErrorMessage";

import { classNames } from "@/lib/helpers";
import { emailValidation } from "@/lib/validations/main";
import { createOrder } from "@/lib/services/orderService";
import SelectInput from "@/components/Form/SelectInput";
import { Disclosure } from "@headlessui/react";
import { useSession } from "next-auth/react";
import PayAndBook from "./PayAndBook";
import { useGlobalContext } from "@/context/GlobalContext";
import moment from "moment";
import { countries } from "@/lib/countries";

const SeatsSelection = dynamic(() => import("./SeatsSelection"), {
  ssr: false,
});

interface TravelDetailsProps {
  passengers: any[];
  offerId: string;
  slices: any[];
}

export interface ITraveler {
  id: string;
  type: string;
  email: string;
  born_on: string;
  title: string;
  gender: string;
  family_name: string;
  given_name: string;
  traveller_name: string;
  country_code: string;
  expires_on: string;
  passport_number: string;
}

const passengerTypes = {
  adult: "Adult",
  child: "Child",
  infant_without_seat: "Infant without seat",
};

const bookingSchema = yup.object().shape({
  email: emailValidation,
  phone_number: yup
    .string()
    .required("Phone Number is required")
    .matches(
      /^\+[1-9]\d{1,14}$/,
      "Phone Number must start with a country code and be a valid number"
    ),
  travelers: yup
    .array()
    .of(
      yup.object().shape({
        family_name: yup
          .string()
          .required("First Name is required")
          .matches(/^[a-zA-Z]+$/, "First Name can only contain characters"),
        given_name: yup
          .string()
          .required("Last Name is required")
          .matches(/^[a-zA-Z]+$/, "Last Name can only contain characters"),
        gender: yup.string().required("Gender is required"),
        born_on: yup
          .string()
          .required("Date of birth is required")
          .test(
            "is-less-than-today",
            "Date of birth must be in the past",
            (value) => moment(value).isBefore(moment())
          )
          .test(
            "for-adult",
            "Passenger must be 18 years old or older",
            function (value) {
              if (this.parent.type === "adult")
                return moment().diff(moment(value), "years") >= 18;

              return true;
            }
          ),
        type: yup.string(),
        title: yup.string(),
        id: yup.string(),
        expires_on: yup
          .string()
          .required("ID expiration date is required")
          .test(
            "is-greater-than-today",
            "ID expiration date must be today or in the future",
            (value) => moment(value).isAfter(moment())
          ),
        country_code: yup.string().required("Nationality is required"),
        passport_number: yup
          .string()
          .required("Passport number is required")
          .matches(/^[A-Za-z0-9]+$/, "Passport number must be alphanumeric")
          .min(15, "Passport number should be greater then 15 characters"),
        traveller_name: yup.string().required("Please select a traveller"),
      })
    )
    .test(
      "validate-traveller-names",
      "Your traveller names must be unique.",
      (travelers) => {
        const currentUserTravellerCount =
          travelers?.filter((t) => t?.traveller_name === "current-user")
            ?.length ?? 0;

        return !(currentUserTravellerCount > 1);
      }
    ),
});

const TravelDetails = ({ passengers, offerId, slices }: TravelDetailsProps) => {
  const [seatServices, setSeatServices] = useState<any[]>([]);
  const { data: session } = useSession();
  const { user } = useGlobalContext();

  const {
    register,
    handleSubmit,
    setValue,
    control,
    getValues,
    formState: { errors, isSubmitting, isValid },
    reset,
    setError,
    trigger,
  } = useForm({
    defaultValues: {
      email: user?.email ?? "",
      phone_number: user?.mobile ?? "",
      travelers: passengers?.map((passenger, index) => {
        const isFirstAdult =
          passenger.type === "adult" &&
          index === passengers.findIndex((p) => p.type === "adult");

        return {
          id: passenger.id,
          type: passenger.type,
          born_on: isFirstAdult
            ? user?.dob
              ? moment(user?.dob).format("YYYY-MM-DD")
              : ""
            : passenger.born_on,
          passport_number: "",
          title: isFirstAdult ? "" : passenger.title,
          gender: isFirstAdult
            ? user?.gender === "MALE"
              ? "m"
              : "f"
            : passenger.gender,
          family_name: isFirstAdult
            ? user?.firstName ?? ""
            : passenger.family_name,
          given_name: isFirstAdult
            ? user?.lastName ?? ""
            : passenger.given_name,
          country_code: "",
          expires_on: "",
          traveller_name: isFirstAdult && user ? "current-user" : "",
        };
      }),
    },
    resolver: yupResolver(bookingSchema),
  });

  const onSubmit = handleSubmit(async (data, e) => {
    // @ts-ignore;
    const text = e?.nativeEvent?.submitter?.innerText;
    if (text !== "Book and pay later") return;
    const payload: any = {
      passengers: data?.travelers ? [...data?.travelers] : [],
      type: "pay_later",
      selected_offers: [offerId],
      seatServices,
      user_id: session?.user?.id,
    };

    payload.passengers?.forEach((traveler: any) => {
      if (traveler.gender === "m") {
        traveler.title = "mr";
      } else if (traveler.gender === "f") {
        traveler.title = "ms";
      }

      traveler.email = data.email;
      traveler.phone_number = data.phone_number;
    });

    const res = await createOrder(payload);

    if (!res?.ok && res?.result?.errors) {
      toast.error(res.result?.errors?.[0]?.message);
      return;
    }

    toast.success("Order has been created!");
    reset();
  });

  const travellerNameHandleChange = (e: any, index: number) => {
    if (e.target.value) {
      if (e.target.value === "new-traveller") {
        const fieldsToClear = [
          "given_name",
          "family_name",
          "born_on",
          "gender",
          "country_code",
          "expires_on",
          "passport_number",
        ];

        fieldsToClear.forEach((field) => {
          setValue(`travelers.${index}.${field}` as any, "");
        });
      } else {
        setValue(`travelers.${index}.given_name`, user?.lastName ?? "");
        setValue(`travelers.${index}.family_name`, user?.firstName ?? "");
        setValue(
          `travelers.${index}.born_on`,
          user?.dob ? moment(user?.dob).format("YYYY-MM-DD") : ""
        );
        setValue(
          `travelers.${index}.gender`,
          user?.gender === "MALE" ? "m" : "f"
        );
      }
    }
    setValue(`travelers.${index}.traveller_name`, e.target.value);
  };

  return (
    <>
      <form onSubmit={onSubmit} className="space-y-5 sm:space-y-6 md:space-y-7">
        <section className="card-shadow p-5 md:p-6 xl:p-7 rounded-2xl">
          <h2 className="text-[17px] leading-none sm:text-lg sm:leading-none md:text-xl md:leading-none font-bold text-brand-neutral-800  mb-3.5 sm:mb-4 md:mb-5">
            Travelar Details
          </h2>
          <div className="mb-4 md:mb-6 lg:mb-8">
            <p
              className="py-2.5 md:py-3 px-3.5 md:px-4 text-brand-neutral-600 border rounded-lg border-green-500 text-sm md:text-[15px] mb-6"
              style={{ lineHeight: 1.6 }}
            >
              {`Please enter the traveler's name and date of birth exactly as shown
            on the passport (for international flights) or valid
            government-issued photo ID (for domestic flights) to be used on this
            trip. Name changes are not permitted after booking.`}
            </p>
            <div className="mb-2.5 grid md:grid-cols-2 gap-4 md:gap-5 lg:gap-6">
              <TextInput
                type="email"
                {...register("email")}
                error={errors?.email?.message}
                placeholder="Email address*"
              />
              <TextInput
                {...register("phone_number")}
                error={errors?.phone_number?.message}
                placeholder="Phone Number*"
              />
            </div>
            <Checkbox label="Send me travel deals, offers, coupons, fare alerts and other messages." />
          </div>
          <div className="divide-y space-y-5">
            {getValues()?.travelers?.map((passenger, index) => (
              <div
                key={passenger.id}
                className={classNames(index >= 1 ? "pt-4" : "")}
              >
                <h3 className="text-base md:text-lg leading-none md:leading-none font-bold text-brand-neutral-800 mb-2.5 sm:mb-3 md:mb-4">
                  Traveler {index + 1}:{" "}
                  {
                    passengerTypes[
                      passenger.type as keyof typeof passengerTypes
                    ]
                  }
                  {index === 0 ? ", primary contact" : ""}
                </h3>
                <div className="mb-6 w-full md:w-[49%]">
                  <SelectInput
                    label="Traveller name*"
                    id={`traveller_name_${index}`}
                    error={
                      errors?.travelers?.[index]?.traveller_name?.message ||
                      (passenger?.traveller_name == "current-user"
                        ? errors?.travelers?.root?.message
                        : "")
                    }
                    {...register(`travelers.${index}.traveller_name`)}
                    onChange={(e) => travellerNameHandleChange(e, index)}
                  >
                    <option value="">Select a Traveller</option>
                    <optgroup label="New Traveller">
                      <option value="new-traveller">Add a new traveller</option>
                    </optgroup>
                    {user ? (
                      <optgroup label="Select from my account">
                        <option value="current-user">{`${
                          user?.firstName ?? ""
                        } ${user?.lastName ?? ""}`}</option>
                      </optgroup>
                    ) : null}
                  </SelectInput>
                </div>
                <div className="grid md:grid-cols-2 gap-4 md:gap-5 lg:gap-6 items-start">
                  <TextInput
                    label="First Name*"
                    placeholder="First Name"
                    id={`given_name_${index}`}
                    error={errors?.travelers?.[index]?.given_name?.message}
                    {...register(`travelers.${index}.given_name`)}
                  />
                  <TextInput
                    label="Last Name*"
                    placeholder="Last Name"
                    id={`family_name_${index}`}
                    error={errors?.travelers?.[index]?.family_name?.message}
                    {...register(`travelers.${index}.family_name`)}
                  />
                  <TextInput
                    type="date"
                    label="Date of birth*"
                    id={`born_on_${index}`}
                    error={errors?.travelers?.[index]?.born_on?.message}
                    {...register(`travelers.${index}.born_on`)}
                  />
                  <div className="flex flex-col">
                    <InputLabel label="Gender*" />
                    <fieldset className="mt-3 mb-3">
                      <legend className="sr-only">Select Gender</legend>
                      <div className="flex items-center space-x-4 md:space-x-6">
                        <RadioInput
                          label="Male"
                          id={`male_${index}`}
                          value="m"
                          {...register(`travelers.${index}.gender`)}
                        />
                        <RadioInput
                          label="Female"
                          id={`female_${index}`}
                          value="f"
                          {...register(`travelers.${index}.gender`)}
                        />
                      </div>
                    </fieldset>
                    <ErrorMessage
                      error={errors?.travelers?.[index]?.gender?.message}
                    />
                  </div>

                  <SelectInput
                    label="Nationality*"
                    id={`country_code_${index}`}
                    error={errors?.travelers?.[index]?.country_code?.message}
                    {...register(`travelers.${index}.country_code`)}
                    placeholder="Select a nationality"
                  >
                    <option value="">Select Nationality</option>
                    {countries.map((country, ind) => (
                      <option key={ind} value={country.code}>
                        {country.name}
                      </option>
                    ))}
                  </SelectInput>

                  <TextInput
                    type="date"
                    label="ID Expiration Date"
                    id={`expires_on_${index}`}
                    error={errors?.travelers?.[index]?.expires_on?.message}
                    {...register(`travelers.${index}.expires_on`)}
                  />

                  <div className="col-span-full">
                    <TextInput
                      id={`passport_number_${index}`}
                      label="Passport Number"
                      placeholder="012 23623 2323 3232"
                      error={
                        errors?.travelers?.[index]?.passport_number?.message
                      }
                      {...register(`travelers.${index}.passport_number`)}
                    />
                  </div>

                  <Disclosure
                    as="div"
                    className="col-span-full space-y-4 md:space-y-5"
                  >
                    {({ open }) => (
                      <>
                        <Disclosure.Button className="flex items-start gap-2 text-brand-blue text-left">
                          <span className="text-xl sm:text-2xl -mt-1 sm:-mt-1.5">
                            {open ? <FaCaretUp /> : <FaCaretDown />}
                          </span>
                          <span className="text-[15px] sm:leading-none sm:text-base leading-none text-brand-blue font-medium">
                            Frequent Flyer and Optional Requests
                          </span>
                        </Disclosure.Button>

                        <Disclosure.Panel
                          as="div"
                          className="flex items-center gap-2 text-brand-blue"
                        >
                          <span className="text-2xl -mt-1.5 opacity-0 pointer-events-none hidden sm:inline-block">
                            <FaCaretDown />
                          </span>
                          <div className="flex-1 grid md:grid-cols-2 gap-4 md:gap-5 lg:gap-6">
                            <SelectInput label="Meal Preference">
                              <option value="">Select Meal</option>
                            </SelectInput>
                            <SelectInput label="Special service">
                              <option value="">Select Special service</option>
                            </SelectInput>
                          </div>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                </div>
              </div>
            ))}
          </div>
        </section>
        {/* <section className="card-shadow p-5 md:p-6 xl:p-7 rounded-2xl">
          <h2 className="text-[17px] leading-none sm:text-lg sm:leading-none md:text-xl md:leading-none font-bold text-brand-neutral-800  mb-3.5 sm:mb-4 md:mb-5">
            Cancellation Policy
          </h2>
          <p className="text-brand-neutral-600 leading-[26px] text-[15px] mb-4 sm:mb-5 md:mb-6">
            Tickets are non-transferable and name changes are not permitted. The
            total price shown includes all applicable{" "}
            <Link
              href="#"
              className="text-brand-blue underline hover:no-underline font-medium"
            >
              taxes & fees
            </Link>{" "}
            and{" "}
            <Link
              href="#"
              className="text-brand-blue underline hover:no-underline font-medium"
            >
              our service
            </Link>{" "}
            fees Some airlines may charge additional{" "}
            <Link
              href="#"
              className="text-brand-blue underline hover:no-underline font-medium"
            >
              baggage or other fees
            </Link>
            . Fares are not guaranteed until ticketed. Tickets and our fees are
            non-refundable (see{" "}
            <Link
              href="#"
              className="text-brand-blue underline hover:no-underline font-medium"
            >
              Fare Rules
            </Link>
            ). Some taxes and government agency fees may be non-refundable.
            Tickets can be canceled for a fee if requested within twenty-four
            (24) hours from purchase. Date and routing changes will be subject
            to airline penalties and{" "}
            <Link
              href="#"
              className="text-brand-blue underline hover:no-underline font-medium"
            >
              our fees
            </Link>
          </p>
          <div className="py-2.5 sm:py-3 px-3.5 sm:px-4 border border-brand-neutral-600 rounded-lg">
            <p className="flex items-start gap-2 text-brand-neutral-600 mb-3 text-sm">
              <span className="text-base inline-block transform translate-y-0.5">
                <FaInfoCircle />
              </span>
              <span>
                This itinerary is for an{" "}
                <strong className="font-medium text-brand-neutral-700 underline">
                  alternate date.
                </strong>{" "}
                <strong className="font-medium text-brand-neutral-700">
                  Depart (Thu, Nov 02), Return (Fri, Nov 03).
                </strong>
              </span>
            </p>
            <Checkbox label="Please check this box to indicate that you've confirmed the date(s) and airport(s) to be correct and that you're ready to book this flight." />
          </div>
        </section> */}

        <SeatsSelection
          offerId={offerId}
          slices={slices}
          passengers={getValues().travelers}
          setSeatServices={setSeatServices}
        />

        <div className="flex justify-center gap-4">
          {/* <Button variant="secondary" disabled={isSubmitting}>
            Book and pay later
          </Button> */}
          <PayAndBook
            values={{
              setError,
              trigger,
              ...getValues(),
              seatServices,
              user_id: session?.user?.id,
              offerId,
            }}
          />
        </div>
      </form>
    </>
  );
};

export default TravelDetails;
