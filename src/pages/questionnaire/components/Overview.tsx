import { useFormikContext } from "formik";
import { debounce } from "lodash";
import moment from "moment";
import React, { FC, useMemo, useRef } from "react";

import { useAppDispatch, useAppSelector, useMount } from "@/hooks";

import { FormDatePicker } from "@/components/Formik/FormDatePicker";
import { FormInput } from "@/components/Formik/FormInput";
import { FormTextArea } from "@/components/Formik/FormTextArea";
import { InputVariations } from "@/components/Input/config";
import { Typography } from "@/components/Typography";

import { SurveyStatus } from "@/models/Survey/config";

import { actions, selectors } from "@/redux/questionnaire";

import { addQuestionnaireOverviewAPI } from "@/api/questionnaire";
import type { ICreateQuestionnaireRequest } from "@/features/questionnaire/types";

import type { QuestionnaireForm } from "../types";

const Overview: FC = () => {
  const dispatch = useAppDispatch();
  const activeTemplateId = useAppSelector(selectors.activeTemplateId);

  const {
    values: { status },
  } = useFormikContext<QuestionnaireForm>();

  const isEditable = useMemo(
    () => !status || status === SurveyStatus.DRAFT,
    [status]
  );

  useMount(() => {
    dispatch(actions.callSetActiveTemplateId(""));
  });

  const debouncedHandleCallAddQuestionnaire = useRef(
    debounce(async (request: ICreateQuestionnaireRequest["body"]) => {
      dispatch(actions.callSetServerErrorMessage(""));

      const { success, data, message } = await addQuestionnaireOverviewAPI(
        request
      );

      if (!success && message) {
        dispatch(actions.callSetServerErrorMessage(message));
        return;
      }

      if (activeTemplateId !== data?.id)
        dispatch(actions.callSetActiveTemplateId(data?.id));
    }, 500)
  );

  const handleChange =
    (key: keyof ICreateQuestionnaireRequest["body"]) =>
    async (value: string | Date) => {
      const formattedValue = ["dateFrom", "dateTo"].includes(key)
        ? moment.utc(value).local().toISOString()
        : String(value).trim();

      const request: ICreateQuestionnaireRequest["body"] = {
        [key]: formattedValue,
      };

      if (activeTemplateId) request.id = activeTemplateId;

      debouncedHandleCallAddQuestionnaire.current(request);
    };

  return (
    <div className="mt-12 rounded-lg border-t-8 border-zinc-500 bg-white px-8 py-[1.625rem] shadow-md">
      <FormInput
        name="title"
        placeholder="Untitled Survey"
        variation={InputVariations.NoBorder}
        containerClassName="p-0 mb-[0.688rem]"
        readOnly={!isEditable}
        inputClassName="text-[2rem] font-bold placeholder:font-bold p-0"
        handleInputChange={handleChange("title")}
      />

      <div className="mb-[1.063rem] flex flex-col gap-[0.375rem] md:flex-row">
        <Typography variant="label" className="mt-2 font-bold">
          Description:
        </Typography>

        <FormTextArea
          name="description"
          placeholder="Enter your description here..."
          rows={3}
          readOnly={!isEditable}
          handleInputChange={handleChange("description")}
        />
      </div>

      <div className="flex flex-col justify-start gap-[0.625rem] md:flex-row md:items-center md:gap-[1.875rem]">
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
              readOnly={!isEditable}
              handleDateChange={handleChange("dateFrom")}
            />
          </div>

          <div className="flex flex-col gap-1 md:flex-row md:items-center">
            <Typography variant="label" className="mr-1">
              To
            </Typography>

            <FormDatePicker
              name="dateTo"
              readOnly={!isEditable}
              handleDateChange={handleChange("dateTo")}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export { Overview };
