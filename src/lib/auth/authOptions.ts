import type { DefaultSession, User } from "next-auth";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import GoogleProvider from "next-auth/providers/google";

import {
  getUserByEamil,
  updateUser,
  createUser,
  createActivateToken,
  getActivateTokenCount,
  checkTwoFactor,
} from "@/queries/user";
import { sendActivateMail } from "../mail";
import { sendSMS, verificationToken } from "../mobile";
import { ADMIN_ROLES } from "@/app/admin/_utils/constants";

declare module "next-auth" {
  interface Session {
    user: DefaultSession["user"] & {
      id: string;
      role: string;
    };
  }
}

interface IUser extends User {
  role: string;
}

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {},
      async authorize(credentials, req) {
        const {
          email,
          password,
          verifyOTP,
          twoFactorAuth,
          verificationMethod,
          isAdmin,
        } = credentials as {
          email: string;
          password: string;
          verifyOTP: string;
          twoFactorAuth: string;
          verificationMethod: string;
          isAdmin?: boolean;
        };
        const body = req.body;

        if (twoFactorAuth === "false") {
          const user = await getUserByEamil(email);

          // User not found, Invalid Credentials
          if (!user) throw Error("Invalid credentials.");

          // Check - Is Verified Email
          if (!user.emailVerifiedAt) {
            // Check - Allow 3 reset within 24 hours
            const tokenCount = await getActivateTokenCount(user.id);
            if (tokenCount > 2)
              throw Error(
                "Sorry, but you have reached the maximum number of password reset attempts for today. Please try again later."
              );

            const token = await createActivateToken(user.id);
            await sendActivateMail(
              user?.email || "",
              user?.firstName || "",
              token?.token || ""
            );

            throw Error(
              "Email not verified. Please check your inbox or contact support."
            );
          }

          if (
            isAdmin && user?.role ? !ADMIN_ROLES.includes(user?.role) : false
          ) {
            throw Error("Invalid credentials.");
          }

          // Check - Compare Password
          const passwordMatch = await bcrypt.compare(
            password,
            user?.password || ""
          );
          if (!passwordMatch) throw Error("Invalid credentials.");

          if (user.enableTwoFA) {
            const { otp } = await checkTwoFactor(user.id);
            const twoFactor = true;

            if (verificationMethod === "email") {
              sendActivateMail(
                user?.email || "",
                user?.firstName || "",
                otp || "",
                twoFactor
              );
            } else {
              if (user.mobile) {
                await sendSMS(user.mobile, `Your OTP code is ${otp}`);
              } else {
                if (!user.mobile)
                  throw Error("Please add the mobile number to get the OTP");
              }
            }

            const users = await getUserByEamil(email);
            if (users?.otp) throw Error("Please verify you OTP");

            return {
              id: user.id,
              name: `${user.firstName} ${user.lastName}`,
              image: user?.image,
              email: user.email,
              role: user.role,
            };
          } else {
            return {
              id: user.id,
              name: `${user.firstName} ${user.lastName}`,
              image: user?.image,
              email: user.email,
              role: user.role,
            };
          }
        } else {
          const userFound = await getUserByEamil(email);
          if (verificationMethod === "email") {
            if (userFound?.otp !== verifyOTP) {
              throw new Error(
                "Invalid OTP. Please check your OTP and try again."
              );
            }
            return {
              id: userFound?.id || "",
              name: `${userFound?.firstName} ${userFound?.lastName}`,
              image: userFound?.image || null,
              email: userFound?.email || "",
              role: userFound?.role || "",
            };
          } else {
            const verificationResponse = await verificationToken(
              userFound?.mobile as string,
              verifyOTP
            );
            if (verificationResponse.status === "approved") {
              return {
                id: userFound?.id || "",
                name: `${userFound?.firstName} ${userFound?.lastName}`,
                image: userFound?.image || null,
                email: userFound?.email || "",
                role: userFound?.role || "",
              };
            } else {
              throw new Error(
                "Invalid OTP. Please check your OTP and try again."
              );
            }
          }
        }
      },
    }),

    GoogleProvider({
      clientId: process.env.NEXT_GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.NEXT_GOOGLE_CLIENT_SECRET ?? "",
      async profile(profile, tokens) {
        const { email, given_name, family_name, picture } = profile;

        // Tip: Move to Single Query (upsert) base on logic
        let user = await getUserByEamil(email);
        if (!user) {
          user = await createUser({
            firstName: given_name || "",
            lastName: family_name || "",
            email: email || "",
            image: picture, // Add Support for Image
            password: "",
            emailVerifiedAt: new Date(),
          });
        }

        if (user.id && !user.emailVerifiedAt)
          await updateUser(user.id, {
            emailVerifiedAt: new Date(),
          });

        return {
          id: user.id,
          name: `${user?.firstName || ""} ${user?.lastName || ""}`, // Tip: Move to helper either on prisma or lib
          email: user.email,
          image: user?.image,
          role: user?.role,
        };
      },
    }),
  ],

  callbacks: {
    async session({ session, token, trigger }) {
      if (session.user) {
        (session.user as { id: string }).id = token.id as string;
        (session.user as { image: string }).image = token.image as string;
        (session.user as { role: string }).role = token.role as string;
      }

      return { ...session, user: { ...session.user } };
    },
    async jwt({ token, user, session, trigger }) {
      if (trigger === "update") {
        token = {
          ...token,
          ...(session.name && { name: session.name }),
          ...(session.email && { email: session.email }),
          ...(session.image && { image: session.image }),
        };
      }
      const tokenUser = user as IUser;

      if (tokenUser) {
        token.role = tokenUser.role;
        token.id = tokenUser.id;
        token.image = tokenUser?.image || null;
      }

      return token;
    },
  },
};

export default authOptions;
