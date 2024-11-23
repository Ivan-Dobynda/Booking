import nodemailer from "nodemailer";
import { render } from "@react-email/render";

import VerifyEmail from "@/emails/VerifyEmail";

// TYPES
type SendMailArgs = {
  from: string;
  to: string;
  subject: string;
  html: string;
};


// node mailer for emails
export const sendMail = (data: SendMailArgs) => {
  const transport = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: Number(process.env.MAIL_PORT),
    secure: false,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  transport.sendMail(data, (error: any, info: any) => {
    if (error) throw new Error(error);

    return info;
  });
};

export const sendActivateMail = async (
  to: string,
  name: string,
  token: string,
  twoFactor?: boolean
) => {
  const data = {
    from: `${process.env.MAIL_FROM}`,
    to: to ?? "",
    subject: "Activate Account",
    html: render(
      VerifyEmail({
        verifyLink: !twoFactor
          ? `${process.env.NEXT_PUBLIC_SERVER_URL}/activate/${token}`
          : token,
        name: `${name || ""}`,
        twoFactor: twoFactor ? twoFactor : false,
      })
    ),
  };

  return sendMail(data);
};
