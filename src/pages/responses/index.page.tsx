import { GetServerSideProps, NextPage } from "next";
import React, { useState } from "react";

import { withAuth } from "@/utils/withAuth";

import { TableRow } from "@/components/Table/types";

import { getSurveyListAPI } from "@/api/surveys";

import { SurveyList } from "./components/SurveyList";
import { PAGE_SIZE } from "./config";
import type { ResponsesProps } from "./types";

const Responses: NextPage<ResponsesProps> = ({ items }) => {
  const [selectedSurvey, setSelectedSurvey] = useState<string | null>(null);

  const handleSelectSurvey = (row: TableRow) => setSelectedSurvey(row.id);

  return (
    <div className="m-auto flex max-w-screen-2xl flex-col py-2 sm:py-[1.125rem] sm:px-[2rem]">
      <SurveyList items={items} handleSelectSurvey={handleSelectSurvey} />
    </div>
  );
};

export default withAuth(Responses);

export const getServerSideProps: GetServerSideProps<ResponsesProps> = async (
  context
) => {
  const queryParams = { page: 1, limit: PAGE_SIZE };

  const response = await getSurveyListAPI(queryParams, context);

  return {
    props: {
      items: response,
    },
  };
};
