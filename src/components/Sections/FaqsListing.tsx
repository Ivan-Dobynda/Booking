import React from "react";
import FaqDisclosure from "../Disclosure/FaqDisclosure";
import { getAllFAQs } from "@/app/admin/_queries/faqQueries";

const FaqsListing = async () => {
  const faqs = await getAllFAQs({}, true);

  return (
    <ul className="space-y-4 md:space-y-5 lg:space-y-6 ">
      {faqs.map((faq) => (
        <li key={faq.id}>
          <FaqDisclosure faq={faq} />
        </li>
      ))}
    </ul>
  );
};

export default FaqsListing;
