import { useRouter } from "next/router";
import React, { FC, useCallback, useState } from "react";

import { useMount } from "@/hooks";

import { SYSTEM_URL } from "@/constants/pageUrl";

import { Button } from "@/components/Button";
import { Icon } from "@/components/Icon";
import DeleteModal from "@/components/Modal/DeleteModal";
import { Pagination } from "@/components/Pagination";
import { SearchBar } from "@/components/SearchBar";
import { SurveyCard } from "@/components/SurveyCard";
import { Typography } from "@/components/Typography";

import { SurveyStatus } from "@/models/Survey/config";

import {
  searchQuestionnaires,
  updateQuestionnaireStatusAPI,
} from "@/api/questionnaire";
import type { GetQuestionnaireResponse } from "@/features/questionnaire/types";

import { SurveyInvitesModal } from "./SurveyInvitesModal";
import { INITIAL_ITEM_COUNT, INITIAL_PAGE, PAGE_SIZE } from "../config";
import type { SurveyInvitesModalProps } from "../types";

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
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [toDeleteId, setToDeleteId] = useState<string>("");
  const [itemCount, setItemCount] = useState<number>(PAGE_SIZE);
  const [totalResults, setTotalResults] = useState<number>(INITIAL_ITEM_COUNT);

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
      total,
      count,
    } = await searchQuestionnaires(queryParams);
    if (success) {
      setQuestionnaires(response as GetQuestionnaireResponse[]);
      setTotalResults(total || INITIAL_ITEM_COUNT);
      setItemCount(count || PAGE_SIZE);
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
        total,
        count,
      } = await searchQuestionnaires(queryParams);

      if (success) {
        setQuestionnaires(response as GetQuestionnaireResponse[]);
        setTotalResults(total || INITIAL_ITEM_COUNT);
        setItemCount(count || PAGE_SIZE);
        setCurrentPage(page);
      }
    },
    [filterStr, searchStr]
  );

  const deleteQuestionnaireHandler = async (id: string) => {
    const { success } = await updateQuestionnaireStatusAPI(
      SurveyStatus.DELETED,
      id,
      false
    );
    if (success) {
      handleLoad(currentPage);
      setShowDeleteModal(false);
    }
  };

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

      <SearchBar onSearch={handleSearch} showDraft={true} />

      <div className="mx-auto mt-8 w-full max-w-screen-2xl bg-white pt-[1.063rem] pb-[3.375rem] shadow-md sm:rounded-2xl sm:px-6">
        <Typography
          variant="h2"
          color="text-gray-600"
          size="text-lg"
          className="mb-[1.188rem] px-2 font-semibold sm:px-0"
        >
          My Surveys
        </Typography>

        <div className="grid gap-8 xs:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {questionnaires.map((survey) => {
            const surveyData = {
              id: survey.id,
              templateId: survey.id,
              surveyStatus: survey.status as string,
              surveyName: survey.title as string,
              description: survey.description,
              startDate: survey.dateFrom as string,
              endDate: survey.dateTo as string,
              onInvite,
            };

            const handlePrimaryAction = () =>
              router.push(`${SYSTEM_URL.QUESTIONNAIRE}/${survey.id}`);

            const handleDelete = () => {
              setShowDeleteModal(true);
              setToDeleteId(survey.id);
            };
            return (
              <SurveyCard
                key={survey.id}
                onPrimaryAction={handlePrimaryAction}
                onDelete={handleDelete}
                {...surveyData}
              />
            );
          })}
        </div>

        <Pagination
          currentPage={currentPage}
          totalCount={totalResults}
          defaultPageSize={PAGE_SIZE}
          pageSize={itemCount}
          onPageChange={handleLoad}
        />

        {showInviteDialog && (
          <SurveyInvitesModal
            {...{ ...surveyInvitesModalProps, templateId: currentTemplateId }}
          />
        )}
      </div>
      <DeleteModal
        open={showDeleteModal}
        handleClose={() => setShowDeleteModal(false)}
        handleDelete={() => deleteQuestionnaireHandler(toDeleteId)}
        title="Are you sure you want to delete this survey/questionnaire?"
        primaryLabel="Yes, I'm sure"
        secondaryLabel="No, cancel"
      />
    </>
  );
};

export { SurveyorView };
