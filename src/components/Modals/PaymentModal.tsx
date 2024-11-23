"use client";
import React from "react";
import ModalWrapper from "./ModalWrapper";

import Image from "next/image";
import VisaImage from "@/assets/logos/visa.svg";
import Mastercard from "@/assets/logos/Mastercard.svg";
import AppleImage from "@/assets/logos/apple-pay.svg";
import GoogleImage from "@/assets/logos/GooglePay.svg";
import CitadeleImage from "@/assets/logos/citadele.svg";
import PayoneerImage from "@/assets/logos/Payoneer.svg";
import TextInput from "../Form/TextInput";
import Link from "next/link";
import Button from "../Button/Button";
import { IoIosLock, IoMdClose } from "react-icons/io";
import { DuffelPayments } from "@duffel/components";
import useHTTP from "@/hooks/useHTTP";
import { toast } from "react-toastify";

interface PaymentModal {
  client_token: string,
  close: () => void,
  amount: string,
  currency: string,
  id: string,
  offerId: string,
  seats: { id: string, quantity: number }[]
}

const PaymentModal = (props: PaymentModal) => {
  // const paymentMethods = [
  //   {
  //     image: VisaImage,
  //     name: "visa",
  //   },
  //   {
  //     image: Mastercard,
  //     name: "mastercard",
  //   },
  //   {
  //     image: AppleImage,
  //     name: "apple",
  //   },
  //   {
  //     image: GoogleImage,
  //     name: "google",
  //   },
  //   {
  //     image: CitadeleImage,
  //     name: "citadele",
  //   },
  //   {
  //     image: PayoneerImage,
  //     name: "payoneer",
  //   },
  // ];
  const { data, loading, submit, err } = useHTTP(`${process.env.NEXT_PUBLIC_API_URL}/flight/booking/paymentIntent/confirm/${props.id}`, {
    method: 'POST',
    data: props,
    cb: () => {
      toast.success("Order has been created!")
      props.close();
    },
    ecb: () => props.close()
  })
  if (loading) return <div className="loading middle" />
  return (
    <ModalWrapper
      className="w-auto rounded-2xl mt-9 sm:mt-12 sm:m-5 p-4 lg:p-5 bg-white relative"
      open={true}
      setOpen={props.close}
    >
      <button
        type="button"
        onClick={props.close}
        className="text-3xl text-white absolute -top-10 -right-0"
      >
        <IoMdClose />
      </button>
      <div>
        <div className="flex justify-between items-center mb-4 gap-4">
          <h4 className="text-lg flex justify-between">Total Amount: <b>{props.amount} {props.currency}</b></h4>
          <small className="bold bg-green-500 px-2 py-1 rounded-md text-white">It is safe to add Card</small>
        </div>
        {/* <h4 className="text-xl lg:leading-none lg:text-2xl font-bold text-brand-neutral-800 leading-none mb-5 md:mb-6">
          Payment Method
        </h4>
        <ul className="grid grid-cols-3 md:flex gap-4 md:gap-5 mb-6 md:mb-8 flex-wrap">
          {paymentMethods.map((method) => (
            <li key={method.name}>
              <button className="w-full md:w-28 flex items-center justify-center h-16 rounded-lg bg-white card-shadow border border-transparent border-green-500/2">
                <Image
                  src={method.image}
                  alt={method.name}
                  className="w-16 md:w-[76px] max-h-10 object-contain object-center"
                />
              </button>
            </li>
          ))}
        </ul>
        <form className="grid md:grid-cols-2 gap-4 md:gap-5 lg:gap-6">
          <TextInput
            id="card-number"
            label="Card Number"
            placeholder="0000 0000 0000 0000"
          />
          <TextInput
            id="cardholder-name"
            label="Cardholder Name"
            placeholder="Your name here..."
          />
          <TextInput id="expiry-date" label="Expiry Date" type="date" />
          <TextInput id="cvv" label="CVV" placeholder="000" />
          <div className="col-span-full">
            <p className="max-w-3xl mx-auto text-sm md:text-base text-center leading-5 md:leading-7 text-brand-neutral-600 mb-6">
              {`By clicking 'Confirm & Book, I agree that I have read and accepted
              the above policies and Flysmart Deals.com's `}
              <Link
                href="terms-conditions"
                className="font-medium underline hover:no-underline text-brand-blue"
              >
                Terms and Conditions
              </Link>{" "}
              and{" "}
              <Link
                href="terms-conditions"
                className="font-medium underline hover:no-underline text-brand-blue"
              >
                Privacy Policy
              </Link>{" "}
            </p>
            <div className="text-center">
              <Button variant="green" className="h-16 md:h-20">
                <div className="flex flex-col space-y-1.5 md:space-y-2">
                  <span className="text-[15px] md:leading-none md:text-base leading-none">
                    Confirm & Payment
                  </span>
                  <div className="flex items-center text-sm md:leading-none md:text-[15px] leading-none font-normal gap-1">
                    <span className="text-base md:text-lg">
                      <IoIosLock />
                    </span>{" "}
                    <span>Secure Payment</span>
                  </div>
                </div>
              </Button>
            </div>
          </div>
        </form> */}
        <DuffelPayments
          paymentIntentClientToken={props.client_token}
          onSuccessfulPayment={submit}
          onFailedPayment={res => console.log(res)}
        />
      </div>
    </ModalWrapper>
  );
};

export default PaymentModal;
