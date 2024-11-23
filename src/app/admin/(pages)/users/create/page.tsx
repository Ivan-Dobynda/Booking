import React from "react";

import H1 from "@admin/_components/Typo/H1";

import AdminUserForm from "../Form/Form";

interface CreatePageProps {
  params: {
    id: string;
  };
}

const CreatePage = async ({ params }: CreatePageProps) => {
  return (
    <>
      <header className="mb-8">
        <H1>Add New Admin User</H1>
        <h3 className="text-neutral-500 text-base">
          Empowering Control and Efficiency in System Management
        </h3>
      </header>
      <section className="rounded-2xl py-8 px-6 bg-white">
        <AdminUserForm />
      </section>
    </>
  );
};

export default CreatePage;
