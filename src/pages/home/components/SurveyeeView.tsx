import { useRouter } from "next/router";
import React, { FC, useCallback, useState } from "react";

import { useMount } from "@/hooks";

import { SYSTEM_URL } from "@/constants/pageUrl";

import { Pagination } from "@/components/Pagination";
import { SurveyCard } from "@/components/SurveyCard";
import { Typography } from "@/components/Typography";

import { getSurveyListAPI } from "@/api/surveys";
import { SurveysResponse } from "@/features/survey/types";

import { INITIAL_ITEM_COUNT, INITIAL_PAGE, PAGE_SIZE } from "../config";

const SurveyeeView: FC = () => {
  const router = useRouter();

  const [currentPage, setCurrentPage] = useState<number>(INITIAL_PAGE);
  const [surveys, setSurveys] = useState<SurveysResponse>([]);
  const [itemCount, setItemCount] = useState<number>(PAGE_SIZE);
  const [totalCount, setTotalCount] = useState<number>(INITIAL_ITEM_COUNT);

  const handleLoad = useCallback(async (page: number) => {
    setCurrentPage(page);

    const queryParams = {
      page,
      limit: PAGE_SIZE,
    };

    const {
      success,
      data: response,
      total,
      count,
    } = await getSurveyListAPI(queryParams);

    if (success) {
      setSurveys(response as SurveysResponse);
      setTotalCount(total || INITIAL_ITEM_COUNT);
      setItemCount(count || PAGE_SIZE);
      setCurrentPage(page);
    }
  }, []);

  useMount(() => {
    handleLoad(currentPage);
  });

  return (
    <>
      <div className="mx-auto mt-16 w-full max-w-screen-2xl bg-white pt-[1.063rem] pb-[3.375rem] shadow-md sm:rounded-2xl sm:px-6">
        <Typography
          variant="h2"
          color="text-gray-600"
          size="text-lg"
          className="mb-[1.188rem] px-2 font-semibold sm:px-0"
        >
          Surveys / Questionnaire
        </Typography>

        <div className="grid gap-8 xs:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {surveys.map((survey) => {
            const surveyData = {
              id: survey.id,
              templateId: survey.templateId as string,
              surveyStatus: survey.status as string,
              surveyName: survey.templateId.title as string,
              description: survey.templateId.description,
              startDate: survey.templateId.dateFrom as string,
              endDate: survey.templateId.dateTo as string,
            };

            const handlePrimaryAction = () => {
              router.push(`${SYSTEM_URL.SURVEY}/${survey.id}`);
            };

            return (
              <SurveyCard
                key={survey.id}
                isOwnSurvey
                onPrimaryAction={handlePrimaryAction}
                {...surveyData}
              />
            );
          })}
        </div>

        <Pagination
          currentPage={currentPage}
          totalCount={totalCount}
          defaultPageSize={PAGE_SIZE}
          pageSize={itemCount}
          onPageChange={handleLoad}
        />
      </div>
    </>
  );
};

export { SurveyeeView };
