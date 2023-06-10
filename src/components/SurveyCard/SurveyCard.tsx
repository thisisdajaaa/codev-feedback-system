import moment from "moment";
import React, { FC } from "react";

import clsxm from "@/utils/clsxm";

import { SurveyProps } from "./types";
import { Button } from "../Button";

const SurveyCard: FC<SurveyProps> = (props) => {
  const {
    id,
    surveyStatus,
    surveyName,
    description,
    startDate,
    endDate,
    responses = 0,
    totalRespondents = 0,
  } = props;

  const isSurveyActive = surveyStatus.toUpperCase() === "ACTIVE";
  const isSurveyDraft = surveyStatus.toUpperCase() === "DRAFT";
  const isSurveyClosed = surveyStatus.toUpperCase() === "FINISHED";

  const surveyStatusPercentage = Math.floor(responses * totalRespondents) / 100;

  const surveyCardBtnClassNames =
    "h-[1.375rem] min-w-[5.375rem] rounded-md py-4 px-8";

  return (
    <div
      className={clsxm(
        "relative mb-8 w-1/3 min-w-full overflow-hidden rounded-[1rem] border-[0.063rem] border-solid border-gray-500 p-3 pl-[1.688rem] before:absolute before:left-0 before:top-0 before:h-full before:w-[0.75rem] before:content-['']",
        isSurveyActive && "before:bg-blue-500",
        isSurveyDraft &&
          "before:border-r-[0.063rem] before:border-gray-500 before:bg-white",
        isSurveyClosed && "before:bg-gray-500"
      )}
    >
      <div
        className={clsxm(
          "absolute -top-1 -right-1 min-w-[5rem] py-2.5 px-3.5 text-center text-white",
          isSurveyActive && "bg-blue-500",
          isSurveyDraft &&
            "border-[0.063rem] border-gray-500 bg-white text-gray-500",
          isSurveyClosed && "bg-gray-500"
        )}
      >
        {surveyStatus}
      </div>
      <p className="invisible">{id}</p>
      <p className="mt-[2.375rem] text-sm text-gray-500">Survey Name:</p>
      <p className="text-[1.125rem]">{surveyName}</p>

      <p className="text-sm text-gray-500">Description:</p>
      <p className="text-sm">{description || "No description provided"}</p>

      <p className="text-sm text-gray-500">Closing Date:</p>
      <p className="text-sm">
        {moment(startDate).format("MM/DD/YYYY")} -{" "}
        {moment(endDate).format("MM/DD/YYYY")}
      </p>

      <p className="text-sm text-gray-500">Survey Status:</p>
      <p className="text-sm">
        {surveyStatusPercentage}% - {responses} of {totalRespondents}{" "}
        participants
      </p>

      <div
        className={clsxm(
          "mt-[2.688rem] flex justify-between",
          isSurveyClosed && "justify-end"
        )}
      >
        {isSurveyActive && (
          <Button
            variant="primary"
            className={clsxm(
              surveyCardBtnClassNames,
              "border-solid border-gray-500 bg-white text-gray-500 hover:bg-gray-100 hover:text-gray-500 active:bg-gray-100"
            )}
          >
            <span className="inline-block w-full text-center text-sm font-normal">
              Invite
            </span>
          </Button>
        )}

        {isSurveyDraft && (
          <Button variant="warning" className={surveyCardBtnClassNames}>
            <span className="inline-block w-full text-center text-sm font-normal">
              Delete
            </span>
          </Button>
        )}

        <Button variant="primary" className={surveyCardBtnClassNames}>
          <span className="inline-block w-full text-center text-sm font-normal">
            {isSurveyActive || isSurveyClosed ? "Responses" : "Edit"}
          </span>
        </Button>
      </div>
    </div>
  );
};

export { SurveyCard };
