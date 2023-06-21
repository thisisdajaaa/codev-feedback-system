import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useCallback, useMemo, useState } from "react";

import { downloadCSV } from "@/utils/files";
import { withAuth } from "@/utils/withAuth";
import { useMount } from "@/hooks";

import { SYSTEM_URL } from "@/constants/pageUrl";

import { Button } from "@/components/Button";
import { Icon } from "@/components/Icon";
import DeleteModal from "@/components/Modal/DeleteModal";
import { Pagination } from "@/components/Pagination";
import { SurveyCard } from "@/components/SurveyCard";
import { Typography } from "@/components/Typography";

import { SurveyStatus } from "@/models/Survey/config";

import {
  searchQuestionnaires,
  updateQuestionnaireStatusAPI,
} from "@/api/questionnaire";
import type { GetQuestionnaireResponse } from "@/features/questionnaire/types";

import { INITIAL_ITEM_COUNT, INITIAL_PAGE, PAGE_SIZE } from "./config";
import { SurveyInvitesModal } from "../home/components/SurveyInvitesModal";
import { SurveyInvitesModalProps } from "../home/types";

const Surveys: NextPage = () => {
  const router = useRouter();
  const [showInviteDialog, setShowInviteDialog] = useState<boolean>(false);
  const [currentTemplateId, setCurrentTemplateId] = useState<string>("");

  const [currentPage, setCurrentPage] = useState<number>(INITIAL_PAGE);
  const [questionnaires, setQuestionnaires] = useState<
    GetQuestionnaireResponse[]
  >([]);

  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [toDeleteId, setToDeleteId] = useState<string>("");
  const [totalResults, setTotalResults] = useState<number>(INITIAL_ITEM_COUNT);
  const [isCSVLoading, setIsCSVLoading] = useState<boolean>(false);

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
    } = await searchQuestionnaires(queryParams);

    if (success) {
      setQuestionnaires(response as GetQuestionnaireResponse[]);

      setTotalResults(total || INITIAL_ITEM_COUNT);
      setCurrentPage(page);
    }
  }, []);
  const surveyInvitesModalProps: SurveyInvitesModalProps = {
    open: true,
    templateId: "",
    setShowInviteDialog,
  };
  const onInvite = (templateId: string) => {
    setCurrentTemplateId(templateId);
    setShowInviteDialog(true);
  };

  const deleteQuestionnaireHandler = async (id: string) => {
    const { success } = await updateQuestionnaireStatusAPI(
      SurveyStatus.DELETED,
      id
    );
    if (success) {
      handleLoad(currentPage);
      setShowDeleteModal(false);
    }
  };
  const handleDownloadCSV = useCallback(async () => {
    setIsCSVLoading(true);

    const { success, data } = await searchQuestionnaires();

    if (success && data)
      downloadCSV<GetQuestionnaireResponse[]>(data, "surveyList");

    setIsCSVLoading(false);
  }, []);
  useMount(() => {
    handleLoad(currentPage);
  });

  const csvProps = useMemo(
    () => ({
      onClick: handleDownloadCSV,
      isLoading: isCSVLoading,
    }),
    [handleDownloadCSV, isCSVLoading]
  );

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

      <div className="mx-auto mt-16 w-full max-w-screen-2xl bg-white pt-[1.063rem] pb-[3.375rem] shadow-md sm:rounded-2xl sm:px-6">
        <Typography
          variant="h2"
          color="text-gray-600"
          size="text-lg"
          className="mb-[1.188rem] px-2 font-semibold sm:px-0"
        >
          Surveys
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

            const handlePrimaryAction = () => {
              if (survey.status === SurveyStatus.DRAFT) {
                router.push(`${SYSTEM_URL.QUESTIONNAIRE}/${survey.id}`);
                return;
              }

              router.push(SYSTEM_URL.RESPONSES);
            };
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
          pageSize={PAGE_SIZE}
          onPageChange={handleLoad}
          csv={csvProps}
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

export default withAuth(Surveys);
