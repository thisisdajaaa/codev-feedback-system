import React, { useState } from "react";

import { withAuth } from "@/utils/withAuth";
import { GetServerSideProps, NextPage } from "next";
import { ApiResponse } from "@/types";
import { SurveysResponse } from "@/features/survey/types";
import { getSurveyListAPI } from "@/api/surveys";
import { getSession } from "next-auth/react";
import { ResponsesProps } from "./types";

const Responses: NextPage<ResponsesProps> = ({ data }) => {
  const [surveyList, setSurveyList] = useState<ResponsesProps["data"]>(data);

  console.log("surveyList: ", surveyList);

  return (
    <div className="m-auto flex max-w-screen-2xl flex-col py-2 sm:py-[1.125rem] sm:px-[2rem]">
      Responses
    </div>
  );
};

export default withAuth(Responses);

export const getServerSideProps: GetServerSideProps<ResponsesProps> = async (
  context
) => {
  const queryParams = { page: 1, limit: 10 };

  const { data } = await getSurveyListAPI(queryParams, context);

  return {
    props: {
      data: data || [],
    },
  };
};
