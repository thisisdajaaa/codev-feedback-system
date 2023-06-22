import { useFormikContext } from "formik";
import { debounce } from "lodash";
import moment from "moment";
import React, { FC, useCallback, useMemo, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import {
  useAppDispatch,
  useAppSelector,
  useMount,
  useUpdateEffect,
} from "@/hooks";

import { FormDatePicker } from "@/components/Formik/FormDatePicker";
import { FormInput } from "@/components/Formik/FormInput";
import { FormTextArea } from "@/components/Formik/FormTextArea";
import { InputVariations } from "@/components/Input/config";
import { Typography } from "@/components/Typography";

import { SurveyStatus } from "@/models/Survey/config";

import { actions, selectors } from "@/redux/questionnaire";

import { addQuestionnaireOverviewAPI } from "@/api/questionnaire";
import { QUESTIONNAIRE_MESSAGES } from "@/features/questionnaire/config";
import type { ICreateQuestionnaireRequest } from "@/features/questionnaire/types";

import type { QuestionnaireForm } from "../types";

const Overview: FC = () => {
  const dispatch = useAppDispatch();
  const activeTemplateId = useAppSelector(selectors.activeTemplateId);

  const {
    values: { status, dateTo, dateFrom },
    setFieldError,
  } = useFormikContext<QuestionnaireForm>();

  const [isAddingQuestionnaire, setIsAddingQuestionnaire] =
    useState<boolean>(false);

  const isEditable = useMemo(
    () => !status || status === SurveyStatus.DRAFT,
    [status]
  );

  useMount(() => {
    dispatch(actions.callSetActiveTemplateId(""));
  });

  const isInvalidDateTo = useMemo(() => {
    return dateTo && moment(dateTo).isBefore(moment(dateFrom));
  }, [dateTo, dateFrom]);

  useUpdateEffect(() => {
    setFieldError("dateTo", "");

    if (isInvalidDateTo) {
      setFieldError(
        "dateTo",
        QUESTIONNAIRE_MESSAGES.ERROR.INCORRECT_DATE_RANGE
      );
    }
  }, [isInvalidDateTo]);

  const handleCallAddQuestionnaire = async (
    request: ICreateQuestionnaireRequest["body"]
  ) => {
    dispatch(actions.callSetServerErrorMessage(""));

    const externalId = activeTemplateId || uuidv4();

    const { success, message } = await addQuestionnaireOverviewAPI({
      ...request,
      externalId,
    });

    if (!success && message) {
      dispatch(actions.callSetServerErrorMessage(message));
      setIsAddingQuestionnaire(false);
      return;
    }

    if (!activeTemplateId)
      dispatch(actions.callSetActiveTemplateId(externalId));

    setIsAddingQuestionnaire(false);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleChange = useCallback(
    debounce(
      async (
        key: keyof ICreateQuestionnaireRequest["body"],
        value: string | Date
      ) => {
        const isInvalidDateTo =
          key === "dateTo" && moment(value).isBefore(moment(dateFrom));

        if (isAddingQuestionnaire || isInvalidDateTo) return;

        setIsAddingQuestionnaire(true);

        const formattedValue = ["dateFrom", "dateTo"].includes(key)
          ? moment.utc(value).local().toISOString()
          : String(value).trim();

        const request: ICreateQuestionnaireRequest["body"] = {
          [key]: formattedValue,
        };

        handleCallAddQuestionnaire(request);
      },
      500
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isAddingQuestionnaire, dateFrom, activeTemplateId]
  );

  return (
    <div className="mt-12 rounded-lg border-t-8 border-zinc-500 bg-white px-8 py-[1.625rem] shadow-md">
      <FormInput
        name="title"
        placeholder="Untitled Survey"
        variation={InputVariations.NoBorder}
        containerClassName="p-0 mb-[0.688rem]"
        readOnly={!isEditable}
        inputClassName="text-[2rem] font-bold placeholder:font-bold p-0"
        handleInputChange={(value) => handleChange("title", value)}
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
          handleInputChange={(value) => handleChange("description", value)}
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
              handleDateChange={(value) => handleChange("dateFrom", value)}
            />
          </div>

          <div className="flex flex-col gap-1 md:flex-row md:items-center">
            <Typography variant="label" className="mr-1">
              To
            </Typography>

            <FormDatePicker
              name="dateTo"
              readOnly={!isEditable}
              handleDateChange={(value) => handleChange("dateTo", value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export { Overview };
