import router from "next/router";
import { FC, useCallback, useMemo, useState } from "react";

import { downloadCSV } from "@/utils/files";
import { useMount, useUserRole } from "@/hooks";

import { SYSTEM_URL } from "@/constants/pageUrl";

import DeleteModal from "@/components/Modal/DeleteModal";
import { Pagination } from "@/components/Pagination";
import { SurveyCard } from "@/components/SurveyCard";
import { Typography } from "@/components/Typography";
import { SurveyInvitesModal } from "@/pages/home/components/SurveyInvitesModal";
import { SurveyInvitesModalProps } from "@/pages/home/types";

import { SurveyStatus } from "@/models/Survey/config";

import {
  searchQuestionnaires,
  updateQuestionnaireStatusAPI,
} from "@/api/questionnaire";
import { GetQuestionnaireResponse } from "@/features/questionnaire/types";

import { INITIAL_ITEM_COUNT, INITIAL_PAGE, PAGE_SIZE } from "../config";

const SurveyCardList: FC = () => {
  const { isAdmin, isSurveyor } = useUserRole();
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
  const [createdBy, setCreatedBy] = useState<string>("");
  const handleLoad = useCallback(
    async (page: number) => {
      setCurrentPage(page);

      if (isAdmin) {
        setCreatedBy("all");
      } else if (isSurveyor) {
        setCreatedBy("");
      }
      const queryParams = {
        page,
        limit: PAGE_SIZE,
        createdBy: createdBy,
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
    },
    [createdBy, isAdmin, isSurveyor]
  );
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
      <div className="mx-auto w-full max-w-screen-2xl bg-white pt-[1.063rem] pb-[3.375rem] shadow-md sm:rounded-2xl sm:px-6">
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

export { SurveyCardList };
