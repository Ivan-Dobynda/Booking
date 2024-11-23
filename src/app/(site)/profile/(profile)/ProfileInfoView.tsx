"use client";
import React from "react";
import { AdditionalTraveler, User } from "@prisma/client";
import { formatDate } from "@/lib/helpers";
import EditBasicInfoButton from "@/app/(site)/profile/(profile)/sections/ModalButtons/EditBasicInfoButton";
import ContactEditButton from "@/app/(site)/profile/(profile)/sections/ModalButtons/ContactEditButton";
import TravelDocumentButton from "@/app/(site)/profile/(profile)/sections/ModalButtons/MoreInfo/TravelDocumentButton";
import FlightPreferencesButton from "@/app/(site)/profile/(profile)/sections/ModalButtons/MoreInfo/FlightPreferencesButton";
import RewardProgrammersButton from "@/app/(site)/profile/(profile)/sections/ModalButtons/MoreInfo/RewardProgrammersButton";
import ProfileContextProvider, {
  useProfileInfoContext,
} from "@/context/ProfileInfoContext";
import AddAdditionalTraveller from "@/app/(site)/profile/(profile)/sections/ModalButtons/AddAdditionalTraveller";
import VisaDetails from "../../information/VisaDetails";

export interface ProfileInfoProps {
  profileInfo?: Partial<User> | null;
  additionalTravellers: AdditionalTraveler[] | null;
}

const ProfileInfoViewComponent = () => {
  const { profileInfo, additionalTravellers, setTravellerToEdit } =
    useProfileInfoContext();

  const fullName = `${profileInfo?.firstName} ${profileInfo?.lastName}`;
  const emergencyContactName = `${profileInfo?.emergencyContact?.firstName} ${profileInfo?.emergencyContact?.lastName}`;
  const completeAddress = `${profileInfo?.address?.line1 ?? ""} ${
    profileInfo?.address?.line2 ?? ""
  }`;

  return (
    <div
      className={"bg-white rounded-2xl card-shadow p-4 sm:p-5 lg:p-12 text-sm"}
    >
      <h1 className={`font-normal text-4xl mb-12`}>
        {profileInfo?.firstName} {profileInfo?.lastName}
      </h1>

      <div className={`flex flex-col gap-4 mb-12`}>
        <div>
          <div className={`flex justify-between`}>
            <h2 className={`text-3xl font-semibold`}>Basic information</h2>
            <div>
              <EditBasicInfoButton />
            </div>
          </div>
          <p className={"mt-1"}>
            Make sure this information matches your travel ID, like your
            passport or licence.
          </p>
        </div>
        <div className={`grid grid-cols-2 gap-2`}>
          <div>
            <p className={`font-semibold`}>Name</p>
            <p>{fullName}</p>
          </div>

          <div>
            <p className={`font-semibold`}>Bio</p>
            <p>{profileInfo?.bio ?? "Not Provided"}</p>
          </div>
          <div>
            <p className={`font-semibold`}>Date of birth</p>
            <p>
              {profileInfo?.dob ? formatDate(profileInfo?.dob) : "Not Provided"}
            </p>
          </div>
          <div>
            <p className={`font-semibold`}>Gender</p>
            <p>{profileInfo?.gender ?? "Not Provided"}</p>
          </div>
          <div>
            <p className={`font-semibold`}>Accessibility Needs</p>
            <p>{profileInfo?.accessibilityNeeds ?? "Not Provided"}</p>
          </div>
        </div>
      </div>

      <div className={`flex flex-col gap-4`}>
        <div>
          <div className={`flex justify-between`}>
            <h2 className={`text-3xl font-semibold`}>Contact</h2>
            <div>
              <ContactEditButton />
            </div>
          </div>
          <p className={"mt-1"}>
            Receive account activity alerts and trip updates by sharing this
            information.
          </p>
        </div>
        <div className={`grid grid-cols-2 gap-2`}>
          <div>
            <p className={`font-semibold`}>Mobile number</p>
            <p>{profileInfo?.mobile ?? "Not Provided"}</p>
          </div>
          <div>
            <p className={`font-semibold`}>Email</p>
            <p>{profileInfo?.email ?? "Not Provided"}</p>
          </div>
          <div>
            <p className={`font-semibold`}>Emergency contact</p>
            <p>
              {profileInfo?.emergencyContact
                ? `${emergencyContactName}`
                : "Not Provided"}
            </p>
          </div>
          <div>
            <p className={`font-semibold`}>Address</p>
            <p>{profileInfo?.address ? completeAddress : "Not Provided"}</p>
          </div>
        </div>
      </div>

      <div className={`grid grid-cols-2 gap-8 mt-12`}>
        <div>
          <h2 className={`text-3xl font-semibold`}>More Details</h2>
          <p className={"mt-1"}>
            Speed up your booking by securely saving essential travel details.
          </p>
          <div className={`mt-6 flex flex-col gap-4`}>
            <TravelDocumentButton />
            <FlightPreferencesButton />
            <RewardProgrammersButton />
          </div>
        </div>
        <div>
          <h2 className={`text-3xl font-semibold`}>Additional travellers</h2>
          <p className={"mt-1"}>
            {" "}
            Make booking a breeze by saving profiles of family, friends, or
            teammates who often travel with you.
          </p>
          <div className={"mt-4"}>
            <div className={`flex flex-col gap-3`}>
              {additionalTravellers &&
                additionalTravellers.map((val) => (
                  <p
                    key={val.id}
                    onClick={() => {
                      setTravellerToEdit(val);
                    }}
                    className={`text-blue-400 hover:underline cursor-pointer`}
                  >{`${val.firstName} ${val.lastName}`}</p>
                ))}
            </div>
            <AddAdditionalTraveller />
          </div>
        </div>
      </div>
    </div>
  );
};

const TravelGuideComponent = () => {
  const {
    profileInfo: { travelDocuments },
  } = useProfileInfoContext();
  return <VisaDetails passportCountry={travelDocuments?.country} />;
};

const ProfileInfoView = ({ additionalTravellers }: ProfileInfoProps) => {
  return (
    <ProfileContextProvider additionalTravellers={additionalTravellers}>
      <ProfileInfoViewComponent />
      <TravelGuideComponent />
    </ProfileContextProvider>
  );
};

export default ProfileInfoView;
