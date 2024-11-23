import React, { useState } from "react";
import Button from "@/Component/Button/Button";
import TextInput from "@/Component/Form/TextInput";
import { verifyOTP, verifyPhoneNumber } from "@/lib/services/profileService";
import { toast } from "react-toastify";

interface IProps {
  mobile: string;
  isMobileVerified: boolean;
  setIsMobileVerified: (data: boolean) => void;
}
const PhoneNumberVerification = ({
  mobile,
  isMobileVerified,
  setIsMobileVerified,
}: IProps) => {
  const [showForm, setShowForm] = useState<boolean>(false);
  const [otp, setOtp] = useState<string>("");

  const verifyNumberHandler = async () => {
    // Send API request to initiate phone number verification
    const response = await verifyPhoneNumber({ mobile: mobile });

    if (response?.status === 200) {
      toast.info(response?.message);
      setShowForm(true);
    } else {
      // Handle error in initiating verification
      toast.error(response?.message);
    }
  };

  const verifyOtpHandler = async () => {
    // Send API request to verify OTP
    const verificationResponse = await verifyOTP({
      mobile: mobile,
      verifyOTP: otp,
    });

    if (verificationResponse.status === 200) {
      toast.info(verificationResponse?.message);
      setIsMobileVerified(true);
      setShowForm(false);
    } else {
      // Handle error in OTP verification
      setIsMobileVerified(false);
      toast.error(verificationResponse?.message);
    }
  };

  return (
    <div
      className="col-span-full flex justify-end pt-1 lg:pt-2 mt-4 w-96"
      style={{ position: "relative" }}
    >
      <div
        style={{
          position: "absolute",
          top: 100,
          right: 0,
          display: "flex",
        }}
      >
        {!showForm && (
          <Button
            size="small"
            disabled={isMobileVerified}
            onClick={verifyNumberHandler}
          >
            {isMobileVerified ? "Verified" : "Verify Phone Number"}
          </Button>
        )}
        {showForm && (
          <div className="mt-4">
            <form
              style={{
                display: "flex",
                height: "40px",
                alignItems: "center",
                justifyContent: "center",
                gap: 10,
              }}
              onSubmit={(e) => {
                e.preventDefault();
                verifyOtpHandler();
              }}
            >
              <TextInput
                placeholder="Verify OTP"
                id="otp"
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
              <Button size="small" disabled={false} type="submit">
                Verify OTP
              </Button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default PhoneNumberVerification;
