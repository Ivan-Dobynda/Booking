"use client";
import React from "react";

import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

import Button from "@admin/_components/Button/Button";
import TextInput from "@admin/_components/Form/TextInput";
import SelectInput from "@admin/_components/Form/SelectInput";

import {
  createAdminUser,
  updateAdminUser,
} from "@/app/admin/_queries/userQueries";

import { ADMIN_ROLES_OPTIONS } from "@admin/_utils/constants";
import { IAdminUserPayload } from "@/app/admin/_utils/interfaces";

const AdminUserForm = ({
  id,
  defaultValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "",
  },
}: {
  id?: string;
  defaultValues?: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: string;
  };
}) => {
  const router = useRouter();

  const {
    handleSubmit,
    control,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<IAdminUserPayload>({
    defaultValues: { ...defaultValues },
  });

  const onSubmit = async (data: IAdminUserPayload) => {
    // Handle form submission logic here
    const res = id
      ? await updateAdminUser(id, data)
      : await createAdminUser(data);

    if (res.error) {
      toast.error(res.error);
      return;
    }

    if (res.message) {
      toast.success(res.message);
    }

    reset();
    router.push("/admin/users");
  };

  return (
    <form
      className="grid grid-cols-2 gap-x-4 gap-y-8"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Controller
        name="firstName"
        control={control}
        rules={{ required: "First Name is required" }}
        render={({ field: { ref, ...field } }) => (
          <TextInput
            label="First Name"
            placeholder="First Name"
            id="firstName"
            className="w-full"
            error={errors.firstName?.message}
            {...field}
          />
        )}
      />{" "}
      <Controller
        name="lastName"
        control={control}
        render={({ field: { ref, ...field } }) => (
          <TextInput
            label="Last Name"
            placeholder="Last Name"
            id="lastName"
            className="w-full"
            error={errors.lastName?.message}
            {...field}
          />
        )}
      />
      <Controller
        name="email"
        control={control}
        rules={{ required: "Email is required" }}
        render={({ field: { ref, ...field } }) => (
          <TextInput
            label="Email"
            placeholder="Email"
            id="email"
            type="email"
            className="w-full"
            error={errors.email?.message}
            {...field}
          />
        )}
      />
      <Controller
        name="password"
        control={control}
        rules={
          id
            ? { required: false }
            : {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters long",
                },
              }
        }
        render={({ field: { ref, ...field } }) => (
          <TextInput
            label="Password"
            placeholder="Password"
            id="password"
            type="password"
            className="w-full"
            error={errors.password?.message}
            {...field}
          />
        )}
      />
      <Controller
        name="role"
        control={control}
        rules={{ required: "Role is required" }}
        render={({ field: { ref, ...field } }) => (
          <SelectInput
            label="Role"
            id="role"
            className="w-full"
            error={errors.role?.message}
            {...field}
          >
            <option value="">Select a Role</option>
            {ADMIN_ROLES_OPTIONS.map((role) => (
              <option key={role.value} value={role.value}>
                {role.name}
              </option>
            ))}
          </SelectInput>
        )}
      />
      <div className="mt-auto flex justify-end">
        <Button className="rounded-lg" loading={isSubmitting}>
          {id ? "Update Admin User" : "Create Admin User"}
        </Button>
      </div>
    </form>
  );
};

export default AdminUserForm;
