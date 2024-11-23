import React from "react";

import H1 from "@admin/_components/Typo/H1";
import AdminUserForm from "../../Form/Form";

import { prisma } from "@/lib/prisma";

interface EditPageProps {
  params: {
    id: string;
  };
}

const fetchUserDetails = async (id: string) => {
  const user = await prisma?.user?.findFirst({ where: { id } });

  return user;
};

const EditPage = async ({ params }: EditPageProps) => {
  const userDetails = await fetchUserDetails(params?.id);
  return (
    <>
      <header className="mb-8">
        <H1>Edit User</H1>
        <h3 className="text-neutral-500 text-base">
          Empowering Control and Efficiency in System Management
        </h3>
      </header>
      <section className="rounded-2xl py-8 px-6 bg-white">
        <AdminUserForm
          id={userDetails?.id}
          defaultValues={{
            firstName: userDetails?.firstName || "",
            lastName: userDetails?.lastName || "",
            email: userDetails?.email || "",
            password: "",
            role: userDetails?.role || "",
          }}
        />
      </section>
    </>
  );
};

export default EditPage;
