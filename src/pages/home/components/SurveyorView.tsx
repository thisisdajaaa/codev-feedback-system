import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import React, { FC, useCallback, useState } from "react";

import { useMount } from "@/hooks";

import { SYSTEM_URL } from "@/constants/pageUrl";

import { AlertBanner } from "@/components/AlertBanner";
import { Button } from "@/components/Button";
import { Icon } from "@/components/Icon";
import { Pagination } from "@/components/Pagination";
import { SearchBar } from "@/components/SearchBar";
import { SurveyCard } from "@/components/SurveyCard";
import { Typography } from "@/components/Typography";

import { searchQuestionnaires } from "@/api/questionnaire";
import { GetQuestionnaireResponse } from "@/features/questionnaire/types";

import { INITIAL_ITEM_COUNT, INITIAL_PAGE, PAGE_SIZE } from "../config";

const SurveyorView: FC = () => {
  const { data } = useSession();
  const router = useRouter();
  const [showAlert, setShowAlert] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(INITIAL_PAGE);
  // eslint-disable-next-line unused-imports/no-unused-vars
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [questionnaires, setQuestionnaires] = useState<
    GetQuestionnaireResponse[]
  >([]);
  const [searchStr, setSearchStr] = useState("");
  const [filterStr, setFilterStr] = useState("");
  const [itemCount, setItemCount] = useState<number>(INITIAL_ITEM_COUNT);

  const handleSearch = async (query: string, filter: string) => {
    setSearchStr(query);
    setFilterStr(filter);
    const {
      success,
      data: response,
      count,
    } = await searchQuestionnaires(query, filter, currentPage, PAGE_SIZE);
    if (success) {
      setQuestionnaires(response as GetQuestionnaireResponse[]);
      setItemCount(count || INITIAL_ITEM_COUNT);
    }
  };

  const firstName = data?.user?.name?.split(" ")[0];

  const handleLoad = useCallback(
    async (page: number) => {
      setCurrentPage(page);
      setIsLoading(true);

      const {
        success,
        data: response,
        count,
      } = await searchQuestionnaires(searchStr, filterStr, page, PAGE_SIZE);

      if (success) {
        setQuestionnaires(response as GetQuestionnaireResponse[]);
        setItemCount(count || INITIAL_ITEM_COUNT);

        setCurrentPage(page);
      }

      setIsLoading(false);
    },
    [filterStr, searchStr]
  );

  useMount(() => {
    handleLoad(currentPage);
  });

  const renderAlertMessage = (
    <div className="flex flex-col gap-1 sm:flex-row">
      <Typography preset="regular" className="text-center">
        Hi {firstName}!
      </Typography>
      <Typography preset="regular">Welcome to the Feedback System</Typography>
    </div>
  );

  return (
    <div className="m-auto flex max-w-screen-2xl flex-col py-2 sm:py-[1.125rem] sm:px-[2rem]">
      <div className="sm:px-[6.25rem]">
        <AlertBanner
          open={showAlert}
          message={renderAlertMessage}
          type="info"
          handleClose={() => setShowAlert(false)}
        />
      </div>
      <div className="mt-7 mb-[27px] flex justify-end px-[1.125rem] sm:mb-[2.438rem] sm:px-0">
        <Button
          onClick={() => router.push(SYSTEM_URL.ADD_QUESTIONNAIRE)}
          className="flex gap-0">
          <div className="text-[1.313rem]">
            <Icon src="/assets/add.svg" />
          </div>

          <Typography
            variant="span"
            size="text-lg"
            lineHeight="leading-[1.688rem]"
            textAlign="text-left"
            color="text-white"
            className="font-semibold">
            Survey
          </Typography>
        </Button>
      </div>

      <SearchBar onSearch={handleSearch} />

      <div className="mx-auto mt-16 w-full max-w-screen-2xl bg-white pt-[1.063rem] pb-[3.375rem] shadow-md sm:rounded-2xl sm:px-6">
        <Typography
          variant="h2"
          color="text-gray-600"
          size="text-lg"
          className="mb-[1.188rem] px-2 font-semibold sm:px-0">
          My Surveys
        </Typography>

        <div className="gap-8 xs:columns-1 md:columns-2 lg:columns-3">
          {questionnaires.map((survey) => {
            const surveyData = {
              id: survey.id,
              surveyStatus: survey.status as string,
              surveyName: survey.title as string,
              description: survey.description,
              startDate: survey.dateFrom as string,
              endDate: survey.dateTo as string,
            };
            return <SurveyCard key={survey.id} {...surveyData} />;
          })}
        </div>

        <Pagination
          currentPage={currentPage}
          totalCount={itemCount}
          pageSize={itemCount}
          //onPageChange={(page) => setCurrentPage(page)}
          onPageChange={handleLoad}
        />
      </div>
    </div>
  );
};

export { SurveyorView };
