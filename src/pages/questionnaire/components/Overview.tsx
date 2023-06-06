import { useFormikContext } from "formik";
import { debounce } from "lodash";
import moment from "moment";
import React, { FC, useRef } from "react";

import { FormDatePicker } from "@/components/Formik/FormDatePicker/FormDatePicker";
import { FormInput } from "@/components/Formik/FormInput";
import { FormTextArea } from "@/components/Formik/FormTextArea";
import { InputVariations } from "@/components/Input/config";
import { Typography } from "@/components/Typography";

import { addQuestionnaireOverviewAPI } from "@/api/questionnaire";
import type { ICreateQuestionnaireRequest } from "@/features/questionnaire/types";

import type { QuestionnaireForm } from "../types";

const Overview: FC = () => {
  const {
    values: { id: templateId },
    setFieldValue,
  } = useFormikContext<QuestionnaireForm>();

  const debouncedHandleCallAddQuestionnaire = useRef(
    debounce(async (request: ICreateQuestionnaireRequest["body"]) => {
      const { success, data } = await addQuestionnaireOverviewAPI(request);

      if (success) setFieldValue("id", data?.id);
    }, 300)
  );

  const handleChange =
    (key: keyof ICreateQuestionnaireRequest["body"]) =>
    async (value: string | Date) => {
      const formattedValue = ["dateFrom", "dateTo"].includes(key)
        ? moment.utc(value).local().toISOString()
        : value;

      const request: ICreateQuestionnaireRequest["body"] = {
        [key]: formattedValue,
      };

      if (templateId) request.id = templateId;

      debouncedHandleCallAddQuestionnaire.current(request);
    };

  return (
    <div className="mt-12 rounded-lg border-t-8 border-zinc-500 bg-white px-8 py-[26px] shadow-md">
      <FormInput
        name="title"
        placeholder="Untitled Survey"
        variation={InputVariations.NoBorder}
        containerClassName="p-0 mb-[11px]"
        inputClassName="text-[32px] font-bold placeholder:font-bold p-0"
        handleInputChange={handleChange("title")}
      />

      <div className="mb-[17px] flex flex-col gap-[6px] md:flex-row">
        <Typography variant="label" className="mt-2 font-bold">
          Description:
        </Typography>

        <FormTextArea
          name="description"
          placeholder="Enter your description here..."
          rows={3}
          handleInputChange={handleChange("description")}
        />
      </div>

      <div className="flex flex-col justify-start gap-[10px] md:flex-row md:items-center md:gap-[30px]">
        <Typography variant="label" className="font-bold">
          Duration:
        </Typography>

        <div className="flex flex-col gap-2 md:flex-row">
          <div className="flex flex-col gap-1 md:flex-row md:items-center">
            <Typography variant="label" className="mr-1">
              From
            </Typography>

            <FormDatePicker
              name="dateFrom"
              handleDateChange={handleChange("dateFrom")}
            />
          </div>

          <div className="flex flex-col gap-1 md:flex-row md:items-center">
            <Typography variant="label" className="mr-1">
              To
            </Typography>

            <FormDatePicker
              name="dateTo"
              handleDateChange={handleChange("dateTo")}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export { Overview };
