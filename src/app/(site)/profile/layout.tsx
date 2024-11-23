import React, { ReactNode } from "react";
import Aside from "./Aside/Aside";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      {/* <Breadcrumb title="My Profile" pages={["Home", "My Profile"]} /> */}
      <div className="pt-10 sm:pt-16 md:pt-20 lg:pt-24 pb-12 sm:pb-16 md:pb-24 lg:pb-32 sm:bg-gray-50">
        <div className="base-container flex flex-col min-[920px]:flex-row justify-between gap-y-6 items-start">
          <Aside />
          <main className="flex-1 w-full min-[920px]:w-auto min-[920px]:max-w-[calc(100%-320px)] lg:max-w-[calc(100%-350px)] xl:max-w-[calc(100%-380px)]">
            {children}
          </main>
        </div>
      </div>
    </>
  );
};

export default Layout;
