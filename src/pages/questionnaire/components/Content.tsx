import { useFormikContext } from "formik";
import React, { FC, useMemo } from "react";

import { noop } from "@/utils/helpers";
import { useAppDispatch, useAppSelector, useMount } from "@/hooks";

import { AlertBanner } from "@/components/AlertBanner";
import { Button } from "@/components/Button";
import { Icon } from "@/components/Icon";
import { Typography } from "@/components/Typography";

import { SurveyStatus } from "@/models/Survey/config";

import { actions, selectors } from "@/redux/questionnaire";

import { removeQuestionByTemplateIdAPI } from "@/api/questionnaire";
import type { IRemoveQuestionRequest } from "@/features/questionnaire/types";

import { Overview } from "./Overview";
import { Question } from "./Question";
import { newQuestion } from "../config";
import type { QuestionnaireForm } from "../types";

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

  const {
    values: { questions, title, status },
    setFieldValue,
  } = useFormikContext<QuestionnaireForm>();

  const isEditable = useMemo(
    () => !status || status === SurveyStatus.DRAFT,
    [status]
  );

  const isBtnDisabled = () => {
    const hasInvalidQuestions = questions.some(
      ({ title, type }) => !title || !type
    );

    return hasInvalidQuestions || !title;
  };

  const handleAddQuestion = () => {
    if (isBtnDisabled()) return;

    setFieldValue("questions", [...questions, { ...newQuestion }]);
  };

  const handleDeleteQuestion = async (questionId: string, index: number) => {
    const request: IRemoveQuestionRequest["body"] = {
      id: questionId,
    };

    const { success } = await removeQuestionByTemplateIdAPI(
      activeTemplateId,
      request
    );

    const filteredQuestions = questions.filter((_, key) => key !== index);

    if (success) setFieldValue("questions", filteredQuestions);

    return success;
  };

  return (
    <div className="mx-auto flex max-w-screen-2xl flex-col gap-10 py-2 px-[2rem] sm:py-[1.125rem]">
      <AlertBanner
        open={!!serverErrorMessage}
        message={serverErrorMessage}
        type="error"
        handleClose={onClearServerErrorMessage}
      />

      <Overview />

      {questions.map((_, index) => (
        <Question
          key={index}
          index={index}
          handleDeleteQuestion={handleDeleteQuestion}
        />
      ))}

      {isEditable && (
        <>
          <div className="mt-10 flex justify-end">
            <Button
              className="px-2 sm:px-2"
              onClick={handleAddQuestion}
              disabled={isBtnDisabled()}
            >
              <div className="text-xl">
                <Icon src="/assets/add.svg" />
              </div>
            </Button>
          </div>

          <div className="mt-10 flex justify-end">
            <Button
              className="rounded-[0.938rem]"
              onClick={noop}
              disabled={isBtnDisabled()}
            >
              <Typography
                variant="span"
                size="text-lg"
                lineHeight="leading-[1.688rem]"
                textAlign="text-left"
                color="text-white"
                className="font-bold"
              >
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
