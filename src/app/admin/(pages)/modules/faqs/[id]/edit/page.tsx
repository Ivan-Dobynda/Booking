import React from "react";
import CreateFAQForm from "@admin/_components/FAQs/CreateFAQForm";
import H1 from "@admin/_components/Typo/H1";
import { getFAQById } from "@/app/admin/_queries/faqQueries";

const EditFAQ = async ({ params }: { params: { id: string } }) => {
  const faqDetail = await getFAQById(params.id);

  return (
    <>
      <header className="mb-8">
        <H1>Edit FAQ</H1>
      </header>
      <section className="rounded-2xl py-8 px-6 bg-white">
        <CreateFAQForm faqDetail={faqDetail} />
      </section>
    </>
  );
};

export default EditFAQ;
