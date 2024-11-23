import React from "react";
import CreateFAQForm from "@admin/_components/FAQs/CreateFAQForm";
import H1 from "@admin/_components/Typo/H1";

const CreateFAQ = async () => {
  return (
    <>
      <header className="mb-8">
        <H1>Create FAQ</H1>
      </header>
      <section className="rounded-2xl py-8 px-6 bg-white">
        <CreateFAQForm />
      </section>
    </>
  );
};

export default CreateFAQ;
