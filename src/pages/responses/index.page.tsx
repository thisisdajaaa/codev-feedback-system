import { GetServerSideProps, NextPage } from "next";
import React, { Fragment, useState } from "react";

import { withAuth } from "@/utils/withAuth";

import type { TableRow } from "@/components/Table/types";

import { searchQuestionnaires } from "@/api/questionnaire";

import { ResponseList } from "./components/ResponseList";
import { SummaryList } from "./components/SummaryList";
import { SurveyList } from "./components/SurveyList";
import { INITIAL_PAGE, PAGE_SIZE } from "./config";
import type { ResponsesProps } from "./types";

const Responses: NextPage<ResponsesProps> = ({ items }) => {
  const [selectedSurvey, setSelectedSurvey] = useState<string | null>(null);

  const handleSelectSurvey = (row: TableRow) => setSelectedSurvey(row.id);

  return (
    <div className="m-auto flex max-w-screen-2xl flex-col py-2 sm:py-[1.125rem] sm:px-[2rem]">
      <SurveyList
        items={items}
        selectedSurvey={selectedSurvey}
        handleSelectSurvey={handleSelectSurvey}
      />

      {selectedSurvey && (
        <Fragment>
          <ResponseList selectedSurvey={selectedSurvey} />
          <SummaryList selectedSurvey={selectedSurvey} />
        </Fragment>
      )}
    </div>
  );
};

export default withAuth(Responses);

export const getServerSideProps: GetServerSideProps<ResponsesProps> = async (
  context
) => {
  const queryParams = {
    page: INITIAL_PAGE,
    limit: PAGE_SIZE,
    isResponses: true,
  };

  const response = await searchQuestionnaires(queryParams, context);

  return {
    props: {
      items: response,
    },
  };
};
