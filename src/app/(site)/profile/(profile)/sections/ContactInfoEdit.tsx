"use client";
import React, { useEffect, useState } from "react";
import TextInput from "@/Component/Form/TextInput";
import SelectInput from "@/Component/Form/SelectInput";
import Button from "@/Component/Button/Button";
import { updateProfile } from "@/lib/services/profileService";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import PhoneNumberInput from "@/Component/Form/PhoneNumberInput";
import contactEditSchema from "@/lib/validations/contactEditSchema";
import { useRouter } from "next/navigation";
import { useProfileInfoContext } from "@/context/ProfileInfoContext";
import ConfirmChangesModal from "@/Component/Modals/ConfirmChangesModal";
import { MdOutlineClose } from "react-icons/md";
import { useGlobalContext } from "@/context/GlobalContext";
import { fetchCitiesByState, fetchStateByCountry } from "@/queries/countries";
import { City, State } from "@prisma/client";
import PhoneNumberVerification from "./PhoneNumberVerification";

type FormValues = {
  mobile: string;
  email: string;
  address: {
    country: string;
    line1: string;
    line2?: string;
    aptSuiteFloor: string;
    city?: string;
    state?: string;
    postCode?: string;
  };
  emergencyContact?: {
    firstName?: string | null;
    lastName?: string | null;
    mobile?: string | null;
  };
};

const ContactInfoEdit = ({ closeModal }: { closeModal: () => void }) => {
  const { profileInfo: userInfo } = useProfileInfoContext();
  const { address: addressInfo, emergencyContact } = userInfo;
  const [isChangesModalOpen, setIsChangesModalOpen] = useState(false);
  const { countries } = useGlobalContext();
  const router = useRouter();
  const [states, setStates] = useState<State[]>([]);
  const [cities, setCities] = useState<City[]>([]);

  const [isMobileVerified, setIsMobileVerified] = useState<boolean>(false);

  const defaultValues = {
    mobile: userInfo.mobile || "",
    email: userInfo?.email || "",
    address: {
      country: (addressInfo?.country || "") as string,
      line1: addressInfo?.line1 || "",
      line2: addressInfo?.line2 || "",
      aptSuiteFloor: addressInfo?.aptSuiteFloor || "",
      city: addressInfo?.city || "",
      state: addressInfo?.state || "",
      postCode: addressInfo?.postCode || "",
    },
    emergencyContact: {
      firstName: emergencyContact?.firstName ?? "",
      lastName: emergencyContact?.lastName ?? "",
      mobile: emergencyContact?.mobile ?? "",
    },
  };

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    trigger,
    formState: { errors, isValid, dirtyFields, isDirty, isSubmitting },
  } = useForm({ defaultValues, resolver: yupResolver(contactEditSchema) });

  const mobile = watch("mobile");
  const emergencyContactMobile = watch("emergencyContact.mobile");

  const saveContactInfo = async (data: FormValues) => {
    // if (isMobileVerified) {
    const payload = { ...data, isMobileVerified };

    const res = await updateProfile(payload);

    if (res.data) {
      router.refresh();
      closeModal();
    }

    if (res.error) {
      toast.error(res.error);
      return;
    }
    toast.success(res.message);
    // } else {
    //   toast.error("Please verify your mobile number first");
    // }
  };

  const onSubmit = async (data: FormValues) => {
    await saveContactInfo(data);
  };

  const onCloseClickHandler = async () => {
    if (mobile !== defaultValues.mobile) {
      setIsChangesModalOpen(true);
      return;
    }

    if (!isDirty) {
      closeModal();
    }

    if (isDirty) {
      setIsChangesModalOpen(true);
    }
  };

  const updateContactInfo = async () => {
    if (!isValid) {
      setIsChangesModalOpen(false);
      await trigger();
      return;
    }

    let dataToUpdate: Partial<FormValues> = {};
    Object.keys(dirtyFields).forEach((key) => {
      // @ts-ignore - todo- fix it laterly
      dataToUpdate[key as any] = watch(key as keyof FormValues);
    });

    await saveContactInfo(dataToUpdate as FormValues);
  };

  const country = watch("address.country");
  const fetchAndUpdateStates = async () => {
    if (country) {
      setValue("address.city", "");
      const states = await fetchStateByCountry(country);
      setStates(states);
      if (addressInfo?.state) {
        const selectedState = states.find(
          (state) => state.state === addressInfo.state
        );
        setValue("address.state", selectedState?.state || "");
      }
    }
  };

  const currentState = watch("address.state");
  const fetchAndUpdateCities = async () => {
    if (currentState && states.length > 0) {
      const state = states.find((state) => state.state === currentState);
      if (!state) {
        // console.log('no state found', currentState, states);
        return;
      }
      const cities = await fetchCitiesByState(state?.id as string);
      setCities(cities);
      if (addressInfo?.city) {
        const selectedCity = cities.find(
          (city) => city.city === addressInfo.city
        );
        setValue("address.city", selectedCity?.city || "");
      }
    }
  };

  useEffect(() => {
    fetchAndUpdateStates();
  }, [country]);

  useEffect(() => {
    fetchAndUpdateCities();
  }, [currentState, states]);

  return (
    <section className="relative bg-white rounded-2xl card-shadow p-4 sm:p-5 lg:p-6">
      <button
        onClick={onCloseClickHandler}
        className={`absolute top-5 right-5 font-xl`}
      >
        <MdOutlineClose />
      </button>
      <header className="border-b-2 mb-3.5 sm:mb-4 lg:mb-5">
        <h1
          className="text-lg lg:text-xl lg:text-[22px] font-semibold text-brand-neutral-800 inline-block pb-3.5 border-brand-blue"
          style={{ lineHeight: 1 }}
        >
          Contact
        </h1>
      </header>
      <div className="col-span-full flex justify-end pt-1 lg:pt-2 mt-4">
        <PhoneNumberVerification
          mobile={mobile}
          isMobileVerified={isMobileVerified}
          setIsMobileVerified={setIsMobileVerified}
        />
      </div>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="grid sm:grid-cols-2 gap-x-5 gap-y-3.5 sm:gap-y-4">
          <TextInput
            label="Email Address"
            id="email-address"
            type="email"
            error={errors.email?.message as string}
            {...register("email")}
          />
          <PhoneNumberInput
            label="Mobile Number"
            id="mobile-number"
            error={errors.mobile?.message}
            value={mobile}
            onChange={(val: any) => {
              setValue("mobile", val);
            }}
          />

          <div className={`col-span-2  mt-8`}>
            <p className={"font-bold mb-2"}>Address</p>
            <div className="grid sm:grid-cols-2 gap-x-5 gap-y-3.5 sm:gap-y-4">
              <div className={`col-span-2 w-full`}>
                <SelectInput
                  label="Country"
                  id="country"
                  error={errors?.address?.country?.message}
                  {...register("address.country")}
                >
                  <option value="">Select</option>
                  {countries.map((val) => (
                    <option key={val.id} value={val.country}>
                      {val.country}
                    </option>
                  ))}
                </SelectInput>
              </div>
              <TextInput
                label="Address Cont.d Line 1"
                id="address"
                error={errors?.address?.line1?.message}
                {...register("address.line1")}
              />
              <TextInput
                label="Address Cont.d Line 2"
                id="address"
                error={errors?.address?.line2?.message}
                {...register("address.line2")}
              />
              <TextInput
                label="Apt, Suite, Floor"
                id="apt-suite-floor"
                error={errors?.address?.aptSuiteFloor?.message}
                {...register("address.aptSuiteFloor")}
              />

              <SelectInput
                label="State"
                id="state"
                error={errors?.address?.state?.message}
                {...register("address.state")}
              >
                <option value="">Select</option>
                {states.map((val) => (
                  <option key={val.id} value={val.state}>
                    {val.state}
                  </option>
                ))}
              </SelectInput>
              <SelectInput
                label="City"
                id="city"
                error={errors?.address?.city?.message}
                {...register("address.city")}
              >
                <option value="">Select</option>
                {cities.map((val) => (
                  <option key={val.id} value={val.city}>
                    {val.city}
                  </option>
                ))}
              </SelectInput>
              <TextInput
                label="PostCode"
                id="postCode"
                error={errors?.address?.postCode?.message}
                {...register("address.postCode")}
              />
            </div>
          </div>

          <div className={`col-span-2`}>
            <p className={"font-bold mb-2"}>Emergency Contact</p>
            <div className="grid sm:grid-cols-2 gap-x-5 gap-y-3.5 sm:gap-y-4">
              <TextInput
                label="First Name"
                id="emergency-contact-first-name"
                error={errors.emergencyContact?.message}
                {...register("emergencyContact.firstName")}
              />
              <TextInput
                label="Last Name"
                id="emergency-contact-last-name"
                error={errors.emergencyContact?.lastName?.message}
                {...register("emergencyContact.lastName")}
              />
              <PhoneNumberInput
                label="Mobile Number"
                id="emergency-contact-mobile-number"
                error={errors.emergencyContact?.mobile?.message}
                value={emergencyContactMobile}
                onChange={(val: any) => {
                  setValue("emergencyContact.mobile", val);
                }}
              />
            </div>
          </div>
        </div>

        <div className="col-span-full flex justify-end pt-1 lg:pt-2 mt-4">
          <Button size="small" disabled={isSubmitting}>
            Save Changes
          </Button>
        </div>
      </form>

      <ConfirmChangesModal
        disabledSave={isSubmitting}
        open={isChangesModalOpen}
        setOpen={setIsChangesModalOpen}
        onCancelClickHandler={closeModal}
        onSaveClickHandler={updateContactInfo}
      />
    </section>
  );
};

export default ContactInfoEdit;
