import "@/assets/styles/globals.css";
import "react-quill/dist/quill.snow.css";
import "react-toastify/dist/ReactToastify.css";

import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { ToastContainer } from "react-toastify";
import NextTopLoader from "nextjs-toploader";

import { classNames } from "@/lib/helpers";
import AuthProvider from "@/context/auth-provider";
import { getAllCountries } from "@/queries/countries";
import GlobalContextProvider from "@/context/GlobalContext";
import { getProfileInfo } from "@/queries/profile";
import { User } from "@prisma/client";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Fly Smart Deals",
  description: "Fly Smart Deals for best affordable prices across the world.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const countries = await getAllCountries();
  const user = await getProfileInfo();



  return (
    <html lang="en">
      <body className={classNames(poppins.className, "body", "antialiased")}>
        <NextTopLoader showSpinner={false} color="#FFCC99" />

        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          draggable
          pauseOnHover
        />

        <AuthProvider>
          <GlobalContextProvider
            user={user as Partial<User>}
            countries={countries}
          >
            {children}
            <div id="myportal" />
          </GlobalContextProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
