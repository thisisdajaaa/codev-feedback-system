import moment from "moment";
import React, { FC, ReactNode } from "react";

import clsxm from "@/utils/clsxm";
import { withAuth } from "@/utils/withAuth";

import { surveyQuestions } from "./config";
import { Questions } from "./types";

const ViewSurvey: FC = () => {
  const { title, description, duration, questions } = surveyQuestions;

  return (
    <div className="m-auto flex max-w-screen-2xl flex-col py-2 sm:py-[1.125rem] sm:px-[2rem]">
      <div className="mt-[1.375rem] mb-10 rounded-lg bg-white px-6 py-3">
        <h1 className="mb-2 text-[2rem] font-bold">{title}</h1>
        <table>
          <tr>
            <td className="align-top">Description</td>
            <td className="pl-4 pb-2">{description}</td>
          </tr>
          <tr>
            <td className="align-top">Duration</td>
            <td className="pl-4">
              From{" "}
              <span className="font-semibold">
                {moment(duration && duration.startDate).format("MM/DD/YYYY")}
              </span>{" "}
              to{" "}
              <span className="font-semibold">
                {moment(duration && duration.endDate).format("MM/DD/YYYY")}
              </span>
            </td>
          </tr>
        </table>
      </div>

      {questions.map(
        (question: Questions, i: number): ReactNode => (
          <div
            key={i}
            className={clsxm(
              "my-10 rounded-lg bg-white md:px-[2.813rem] md:py-[2.125rem]",
              "sm:p-6",
              "xs:p-5"
            )}
          >
            <h2 className="mb-2 text-[1.25rem] font-semibold">
              {`Q${i + 1}. ${question.question}`}
            </h2>
            <hr className="border-gray-700" />

            {/* QUESTION CONTENT GOES HERE */}
          </div>
        )
      )}
    </div>
  );
};

export default withAuth(ViewSurvey);
