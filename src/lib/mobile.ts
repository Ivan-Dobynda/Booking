import twilio from "twilio";

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const verifyServiceSid = process.env.TWILIO_SERVICE_SID;

const client = require("twilio")(accountSid, authToken);

export async function sendSMS(to: string, message?: string) {
  try {
    const verification = await client.verify.v2
      .services(verifyServiceSid)
      .verifications.create({
        to,
        channel: "sms",
      });

    return verification;
  } catch (error) {
    console.log("error", error);
    return {
      error: "Try different method",
    };
  }
}

export async function verificationToken(
  phoneNumber: string,
  verifyOTP: string
) {
  try {
    const response = await client.verify.v2
      .services(verifyServiceSid)
      .verificationChecks.create({ to: phoneNumber, code: verifyOTP });

    return response;
  } catch (error) {
    console.error("Error sending SMS verification:", error);
    throw error;
  }
}
