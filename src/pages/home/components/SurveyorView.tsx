import { useRouter } from "next/router";
import React, { FC, useCallback, useState } from "react";

import { useMount } from "@/hooks";

import { SYSTEM_URL } from "@/constants/pageUrl";

import { Button } from "@/components/Button";
import { Icon } from "@/components/Icon";
import { Pagination } from "@/components/Pagination";
import { SearchBar } from "@/components/SearchBar";
import { SurveyCard } from "@/components/SurveyCard";
import { Typography } from "@/components/Typography";

import { SurveyStatus } from "@/models/Survey/config";

import { searchQuestionnaires } from "@/api/questionnaire";
import type { GetQuestionnaireResponse } from "@/features/questionnaire/types";

import { SurveyInvitesModal } from "./SurveyInvitesModal";
import { INITIAL_ITEM_COUNT, INITIAL_PAGE, PAGE_SIZE } from "../config";
import { SurveyInvitesModalProps } from "../types";

const SurveyorView: FC = () => {
  const router = useRouter();
  const [showInviteDialog, setShowInviteDialog] = useState<boolean>(false);
  const [currentTemplateId, setCurrentTemplateId] = useState<string>("");

  const [currentPage, setCurrentPage] = useState<number>(INITIAL_PAGE);
  const [questionnaires, setQuestionnaires] = useState<
    GetQuestionnaireResponse[]
  >([]);
  const [searchStr, setSearchStr] = useState<string>("");
  const [filterStr, setFilterStr] = useState<string>("");
  const [itemCount, setItemCount] = useState<number>(INITIAL_ITEM_COUNT);

  const handleSearch = async (query: string, filter: string) => {
    setSearchStr(query);
    setFilterStr(filter);

    const queryParams = {
      page: currentPage,
      limit: PAGE_SIZE,
      title: query,
      status: filter,
    };

    const {
      success,
      data: response,
      count,
    } = await searchQuestionnaires(queryParams);
    if (success) {
      setQuestionnaires(response as GetQuestionnaireResponse[]);
      setItemCount(count || INITIAL_ITEM_COUNT);
    }
  };

  const handleLoad = useCallback(
    async (page: number) => {
      setCurrentPage(page);

      const queryParams = {
        page,
        limit: PAGE_SIZE,
        title: searchStr,
        status: filterStr,
      };

      const {
        success,
        data: response,
        count,
      } = await searchQuestionnaires(queryParams);

      if (success) {
        setQuestionnaires(response as GetQuestionnaireResponse[]);
        setItemCount(count || INITIAL_ITEM_COUNT);

        setCurrentPage(page);
      }
    },
    [filterStr, searchStr]
  );

  useMount(() => {
    handleLoad(currentPage);
  });

  const surveyInvitesModalProps: SurveyInvitesModalProps = {
    open: true,
    templateId: "",
    setShowInviteDialog,
  };
  const onInvite = (templateId: string) => {
    setCurrentTemplateId(templateId);
    setShowInviteDialog(true);
  };

  return (
    <>
      <div className="mt-7 mb-[1.688rem] flex justify-end px-[1.125rem] sm:mb-[2.438rem] sm:px-0">
        <Button
          onClick={() => router.push(SYSTEM_URL.ADD_QUESTIONNAIRE)}
          className="flex gap-0"
        >
          <div className="text-[1.313rem]">
            <Icon src="/assets/add.svg" />
          </div>

          <Typography
            variant="span"
            size="text-lg"
            lineHeight="leading-[1.688rem]"
            textAlign="text-left"
            color="text-white"
            className="font-semibold"
          >
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
          className="mb-[1.188rem] px-2 font-semibold sm:px-0"
        >
          My Surveys
        </Typography>

        <div className="gap-8 xs:columns-1 md:columns-2 lg:columns-3">
          {questionnaires.map((survey) => {
            const surveyData = {
              id: survey.id,
              templateId: survey.id,
              surveyStatus: survey.status as string,
              surveyName: survey.title as string,
              description: survey.description,
              startDate: survey.dateFrom as string,
              endDate: survey.dateTo as string,
              onInvite: onInvite,
            };

            const handlePrimaryAction = () => {
              if (survey.status === SurveyStatus.DRAFT) {
                router.push(`${SYSTEM_URL.QUESTIONNAIRE}/${survey.id}`);
                return;
              }

              router.push(SYSTEM_URL.RESPONSES);
            };

            return (
              <SurveyCard
                key={survey.id}
                onPrimaryAction={handlePrimaryAction}
                {...surveyData}
              />
            );
          })}
        </div>

        <Pagination
          currentPage={currentPage}
          totalCount={itemCount}
          pageSize={itemCount}
          onPageChange={handleLoad}
        />
        {showInviteDialog && (
          <SurveyInvitesModal
            {...{ ...surveyInvitesModalProps, templateId: currentTemplateId }}
          />
        )}
      </div>
    </>
  );
};

export { SurveyorView };
