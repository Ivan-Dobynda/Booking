"use client";
import React from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { yupResolver } from "@hookform/resolvers/yup";

import * as yup from "yup";
import { useRouter } from "next/navigation";
import { Faq } from "@prisma/client";

import { removeHtmlTags } from "@/lib/helpers";

import SelectInput from "@admin/_components/Form/SelectInput";
import TextInput from "@admin/_components/Form/TextInput";
import TextArea from "@admin/_components/Form/TextArea";
import AppButton from "@admin/_components/Button/Button";
import { createFAQ, updateFAQ } from "../../_queries/faqQueries";

export interface IFAQs {
  language: string;
  question: string;
  answer: string;
  order?: number;
}

type faqDetail = {
  faqDetail?: Faq | null;
};
const languages = [
  {
    name: "English",
    value: "en",
  },
  {
    name: "Arabic",
    value: "ar",
  },
];

const CreateFAQForm = (faq: faqDetail) => {
  const faqDetail = faq?.faqDetail;
  const faqId = faq?.faqDetail?.id;
  const validationSchema = yup.object().shape({
    language: yup.string().required("Language is required"),
    question: yup.string().required("Question is required"),
    answer: yup.string().required("Answer is required"),
    order: yup.number(),
  });

  const defaultValues = {
    language: faqDetail?.lang || "",
    question: removeHtmlTags(faqDetail?.question || "") || "",
    answer: removeHtmlTags(faqDetail?.answer || "") || "",
    order: faqDetail?.sortOrder || 0,
  };

  const {
    handleSubmit,
    control,
    reset,
    formState: { isSubmitting, errors },
    setValue,
  } = useForm({
    defaultValues: { ...defaultValues },
    resolver: yupResolver(validationSchema),
  });

  const router = useRouter();

  const onSubmit: SubmitHandler<IFAQs> = async (data) => {
    if (faqId) {
      const res = await updateFAQ(data, faqId);
      if (!res?.id) {
        toast.error("An error occurred while updating FAQ");
        return;
      }
      toast.success("FAQ updated successfully");
      router.push("/admin/modules/faqs");
    } else {
      const res = await createFAQ({ ...data });
      if (!res?.id) {
        toast.error("An error occurred while creating FAQ");
        return;
      }
      toast.success("FAQ created successfully");
      router.push("/admin/modules/faqs");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid sm:grid-cols-2 gap-x-6 gap-y-4">
          <Controller
            control={control}
            name="language"
            render={({ field }) => (
              <SelectInput
                label="Language"
                id={field.name}
                className="w-full"
                options={languages}
                error={errors?.[field.name]?.message}
                value={field.value}
                onChange={field.onChange}
              >
                <option value="">Select</option>
              </SelectInput>
            )}
          />
          <Controller
            control={control}
            name="order"
            render={({ field }) => (
              <TextInput
                label="Order"
                className="w-full"
                type="number"
                placeholder="Order"
                id={field.name}
                value={field.value}
                onChange={field.onChange}
                error={errors?.[field.name]?.message}
              ></TextInput>
            )}
          />
          <div className="col-span-full">
            <Controller
              control={control}
              name="question"
              render={({ field }) => (
                <TextArea
                  label="Question"
                  placeholder="Question"
                  id={field.name}
                  rows={5}
                  value={field.value}
                  onChange={field.onChange}
                  error={errors?.[field.name]?.message}
                ></TextArea>
              )}
            />
          </div>
          <div className="col-span-full">
            <Controller
              control={control}
              name="answer"
              render={({ field }) => (
                <TextArea
                  label="Answer"
                  placeholder="Answer"
                  id={field.name}
                  rows={5}
                  value={field.value}
                  onChange={field.onChange}
                  error={errors?.[field.name]?.message}
                ></TextArea>
              )}
            />
          </div>
          <div className="col-span-full">
            <AppButton loading={isSubmitting} className="mt-5 font-medium">
              {!!faqDetail ? "Save" : "Create"}
            </AppButton>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateFAQForm;
