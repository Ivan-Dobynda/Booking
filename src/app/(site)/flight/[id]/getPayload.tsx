import { UseFormSetError, UseFormTrigger } from "react-hook-form";

export interface ITraveler {
  type?: "adult" | "child" | "infant_without_seat" | string | undefined;
  title?: string;
  id?: string;
  family_name: string;
  given_name: string;
  gender: string;
  born_on: string;
}

export interface PayloadProps {
  travelers?: ITraveler[];
  email: string;
  phone_number: string;
  offerId: string;
  user_id?: string;
  trigger: Trigger;
  setError: SetError;
  seatServices: any[];
}

export type SetError = UseFormSetError<{
  travelers?: ITraveler[] | undefined;
  email: string;
  phone_number: string;
}>;

function calculateAge(dob: string) {
  const birthday = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birthday.getFullYear();
  const m = today.getMonth() - birthday.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthday.getDate())) {
    age--;
  }
  return age;
}

type Trigger = UseFormTrigger<{
  travelers?:
    | {
        id?: string | undefined;
        type?: string | undefined;
        title?: string | undefined;
        born_on: string;
        gender: string;
        family_name: string;
        given_name: string;
      }[]
    | undefined;
  email: string;
  phone_number: string;
}>;

export default async function getPayload(data: PayloadProps) {
  const payload: any = {
    passengers: data.travelers ? [...data?.travelers] : [],
    user_id: data.user_id,
    offerId: data.offerId,
    seatServices: data.seatServices,
  };
  let isValid = await data.trigger();
  payload.passengers = payload.passengers.map((t: any, index: number) => {
    const {
      passport_number,
      country_code,
      expires_on,
      traveller_name,
      ...traveler
    } = t;
    if (traveler.gender === "m") {
      traveler.title = "mr";
    } else if (traveler.gender === "f") {
      traveler.title = "ms";
    }
    traveler.email = data.email;
    traveler.phone_number = data.phone_number;
    traveler.identity_documents = [
      {
        type: "passport",
        unique_identifier: passport_number,
        issuing_country_code: country_code,
        expires_on: expires_on,
      },
    ];

    return traveler;
  });
  return isValid ? payload : null;
}
