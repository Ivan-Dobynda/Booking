import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import React from "react";
import VisaDetails from "./VisaDetails";

export default function Information() {
  return (
    <main>
      <Breadcrumb title="Information" pages={["Home", "Information"]} />
      <div className="base-container pb-32">
        <VisaDetails />
      </div>
    </main>
  );
}
