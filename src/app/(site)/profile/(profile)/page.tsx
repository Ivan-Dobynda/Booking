import React from "react";

import { getAdditionalTravellers } from "@/queries/profile";
// import MoreDetails from "./sections/MoreDetails";
import ChangePassword from "./sections/ChangePassword";

import ProfileInfoView from "@/app/(site)/profile/(profile)/ProfileInfoView";
import VisaDetails from "@/app/(site)/information/VisaDetails";
import { useProfileInfoContext } from "@/context/ProfileInfoContext";
import EnableTwoFactor from "./sections/EnableTwoFactor";


const Profile = async () => {
  const additionalTravellers = await getAdditionalTravellers();
  return (
    <div className="space-y-6">
      <ProfileInfoView additionalTravellers={additionalTravellers} />
      <EnableTwoFactor/>
      <ChangePassword />
      {/*<MoreDetails personalInfo={personalInfo} />*/}
    </div>
  );
};

export default Profile;
