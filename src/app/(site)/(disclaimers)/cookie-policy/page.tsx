import React from "react";

import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";

import Block from "./Block";
import { data } from "./data";

const page = () => {
  return (
    <main className="overflow-x-hidden">
      <Breadcrumb title="Cookie Policy" pages={["Home", "Cookie Policy"]} />
      <section className="sm:pt-14 md:pt-16 lg:pt-20 pb-16 md:pb-20 lg:pb-24 sm:bg-gray-50">
        <div className="base-container text-brand-neutral-700 space-y-6">
          {data?.map((block, index) => (
            <Block key={index} block={block} />
          ))}
        </div>
      </section>
    </main>
  );
};

export default page;
