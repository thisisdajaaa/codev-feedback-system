import { useFormikContext } from "formik";
import React, { FC, useMemo } from "react";

import { useAppDispatch, useAppSelector, useMount } from "@/hooks";

import { AlertBanner } from "@/components/AlertBanner";
import { BackArrow } from "@/components/BackArrow";
import { Button } from "@/components/Button";
import { Icon } from "@/components/Icon";
import DeleteModal from "@/components/Modal/DeleteModal";
import { Typography } from "@/components/Typography";

import { SurveyStatus } from "@/models/Survey/config";

import { actions, selectors } from "@/redux/questionnaire";

import { removeQuestionByTemplateIdAPI } from "@/api/questionnaire";
import type { IRemoveQuestionRequest } from "@/features/questionnaire/types";

import { Overview } from "./Overview";
import { Question } from "./Question";
import { newQuestion } from "../config";
import type { QuestionnaireForm } from "../types";
import { questionnaireFormSchema } from "../validations/questionnaireFormSchema";

const Content: FC = () => {
  const dispatch = useAppDispatch();
  const activeTemplateId = useAppSelector(selectors.activeTemplateId);
  const serverErrorMessage = useAppSelector(selectors.serverErrorMessage);

  useMount(() => {
    onClearServerErrorMessage();
  });

  const onClearServerErrorMessage = () => {
    dispatch(actions.callSetServerErrorMessage(""));
  };

  const { values, setFieldValue, submitForm, isSubmitting } =
    useFormikContext<QuestionnaireForm>();

  const { questions, title, status, toDeleteId, toDeleteIndex } = values;

  const isEditable = useMemo(
    () => !status || status === SurveyStatus.DRAFT,
    [status]
  );

  const isBtnDisabled = () => {
    const hasInvalidQuestions = questions.some(
      ({ title, type }) => !title || !type
    );

    return hasInvalidQuestions || !title || !!serverErrorMessage;
  };

  const handleAddQuestion = () => {
    if (isBtnDisabled()) return;

    setFieldValue("questions", [...questions, { ...newQuestion }]);
  };

  const handleCloseDelete = () => {
    setFieldValue("toDeleteId", undefined);
    setFieldValue("toDeleteIndex", undefined);
  };

  const handleDeleteQuestion = async () => {
    const request: IRemoveQuestionRequest["body"] = {
      id: String(toDeleteId),
    };

    const { success } = await removeQuestionByTemplateIdAPI(
      activeTemplateId,
      request
    );

    const filteredQuestions = questions.filter(
      (_, key) => key !== toDeleteIndex
    );

    if (success) {
      setFieldValue("questions", filteredQuestions);
      handleCloseDelete();
    }

    return success;
  };

  const showDeleteModal = !!toDeleteId || !!toDeleteIndex;

  const isPublishDisabled =
    !questionnaireFormSchema.isValidSync(values) || isBtnDisabled();

  return (
    <div className="mx-auto flex max-w-screen-2xl flex-col gap-10 py-2 px-[2rem] sm:py-[1.125rem]">
      <AlertBanner
        open={!!serverErrorMessage}
        message={serverErrorMessage}
        type="error"
        handleClose={onClearServerErrorMessage}
      />

      <div>
        <BackArrow />

        <Overview />
      </div>

      {questions.map((_, index) => (
        <Question key={index} index={index} />
      ))}

      <DeleteModal
        open={showDeleteModal}
        handleClose={handleCloseDelete}
        handleDelete={handleDeleteQuestion}
        title="Are you sure you want to delete this question?"
        primaryLabel="Yes, I'm sure"
        secondaryLabel="No, cancel"
      />

      {isEditable && (
        <>
          <div className="mt-10 flex justify-end">
            <Button
              className="px-2 sm:px-2"
              onClick={handleAddQuestion}
              disabled={isBtnDisabled()}>
              <div className="text-xl">
                <Icon src="/assets/add.svg" />
              </div>
            </Button>
          </div>

          <div className="mt-10 flex justify-end">
            <Button
              className="rounded-[0.938rem]"
              onClick={submitForm}
              isLoading={isSubmitting}
              disabled={isPublishDisabled}>
              <Typography
                variant="span"
                size="text-lg"
                lineHeight="leading-[1.688rem]"
                textAlign="text-left"
                color="text-white"
                className="font-bold">
                Publish
              </Typography>
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export { Content };
