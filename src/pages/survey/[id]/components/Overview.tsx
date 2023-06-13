import { useFormikContext } from "formik";
import { debounce } from "lodash";
import moment from "moment";
import React, { FC, useRef } from "react";

import { useAppDispatch } from "@/hooks";

import { FormCheckbox } from "@/components/Formik/FormCheckbox";
import { Typography } from "@/components/Typography";

import { SurveyStatus } from "@/models/Survey/config";

import { actions } from "@/redux/surveys";

import { createSurveyAPI } from "@/api/surveys";
import { ICreateSurveyRequest } from "@/features/survey/types";

import type { OverviewProps, SurveyQuestionnaireForm } from "../types";

const Overview: FC<OverviewProps> = (props) => {
  const { data } = props;

  const dispatch = useAppDispatch();

  const {
    values: { templateId, status },
  } = useFormikContext<SurveyQuestionnaireForm>();

  const debouncedHandleCallCreateSurvey = useRef(
    debounce(async (request: ICreateSurveyRequest["body"]) => {
      dispatch(actions.callSetServerErrorMessage(""));

      const { success, message } = await createSurveyAPI(request);

      if (!success && message) {
        dispatch(actions.callSetServerErrorMessage(message));
        return;
      }
    }, 500)
  );

  const handleCheckboxChange = async (checked: boolean) => {
    const request: ICreateSurveyRequest["body"] = {
      templateId,
      isAnonymous: checked,
    };

    debouncedHandleCallCreateSurvey.current.cancel();
    debouncedHandleCallCreateSurvey.current(request);
  };

  const isEditable = status === SurveyStatus.ACTIVE;

  return (
    <div className="mt-10 rounded-lg bg-white px-8 py-[1.625rem] shadow-md">
      <Typography
        variant="h1"
        size="text-3xl"
        lineHeight="leading-[3rem]"
        className="mb-4 rounded-[2rem] font-bold"
      >
        {data?.title || "--"}
      </Typography>

      <div className="mb-[1.063rem] flex flex-col gap-[0.375rem] md:flex-row">
        <Typography variant="p" className="mt-1 min-w-[6.125rem] font-bold">
          Description:
        </Typography>

        <Typography variant="p" lineHeight="leading-[1.375rem]">
          {data?.description || "--"}
        </Typography>
      </div>

      <div className="mb-6 flex flex-col gap-[0.375rem] md:flex-row">
        <Typography variant="p" className="min-w-[6.125rem] font-bold">
          Duration:
        </Typography>

        <Typography variant="p" className="flex items-center gap-1">
          From{" "}
          <Typography variant="p" className="font-semibold">
            {moment(data?.dateFrom).format("MM/DD/YYYY")}
          </Typography>{" "}
          To{" "}
          <Typography variant="p" className="font-semibold">
            {moment(data?.dateFrom).format("MM/DD/YYYY")}
          </Typography>
        </Typography>
      </div>

      <FormCheckbox
        name="isAnonymous"
        label="Set name and email address to Anonymous"
        containerClassName="gap-[0.938rem]"
        labelClassName="text-blue-500 font-semibold"
        readOnly={!isEditable}
        handleCheckedChange={handleCheckboxChange}
      />
    </div>
  );
};

export { Overview };
