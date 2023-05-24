import moment from "moment";
import React, { FC } from "react";

import { SurveyProps } from "./types";
import { Button } from "../Button";

const Card: FC<SurveyProps> = (props) => {
  return (
    <div className="relative w-[500px] min-w-full overflow-hidden rounded-[1rem] border-[0.063rem] border-solid border-gray-500 p-3 pl-[1.688rem] before:absolute before:left-0 before:top-0 before:h-full before:w-[0.75rem] before:bg-blue-500 before:content-['']">
      <div className="absolute top-0 right-0 bg-blue-500 py-2 px-3 text-white">
        {props.surveyStatus}
      </div>

      <p className="mt-[2.375rem] text-sm text-gray-500">Survey Name:</p>
      <p className="text-[1.125rem]">{props.surveyName}</p>
      <p className="text-sm text-gray-500">Description:</p>
      <p className="text-sm">
        {props.description || "No description provided"}
      </p>
      <p className="text-sm text-gray-500">Closing Date:</p>
      <p className="text-sm">
        {moment(props.startDate).format("MM/DD/YYYY")} -{" "}
        {moment(props.endDate).format("MM/DD/YYYY")}
      </p>
      <p className="text-sm text-gray-500">Survey Status:</p>
      <p className="text-sm">
        25% - {props.responses} of {props.totalRespondents} participants
      </p>

      <div className="mt-[2.688rem] flex justify-between">
        <Button className="h-[1.375rem] min-w-[5.375rem] border-solid border-gray-500 py-4 px-8 text-gray-500 hover:text-gray-500">
          <span className="inline-block w-full text-center text-sm font-normal">
            Invite
          </span>
        </Button>

        <Button
          variant="primary"
          className="h-[1.375rem] min-w-[5.375rem] rounded-md bg-blue-500 py-4 px-8 text-white"
        >
          <span className="inline-block w-full text-center text-sm font-normal">
            Responses
          </span>
        </Button>
      </div>
    </div>
  );
};

export { Card };
