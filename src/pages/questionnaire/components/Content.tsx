import { useFormikContext } from "formik";
import React, { FC } from "react";

import { noop } from "@/utils/helpers";
import { useAppSelector } from "@/hooks";

import { Button } from "@/components/Button";
import { Icon } from "@/components/Icon";
import { Typography } from "@/components/Typography";

import { selectors } from "@/redux/questionnaire";

import { removeQuestionByTemplateIdAPI } from "@/api/questionnaire";
import type { IRemoveQuestionRequest } from "@/features/questionnaire/types";

import { Overview } from "./Overview";
import { Question } from "./Question";
import { newQuestion } from "../config";
import type { QuestionnaireForm } from "../types";

const Content: FC = () => {
  const activeTemplateId = useAppSelector(selectors.activeTemplateId);

  const {
    values: { questions, title },
    setFieldValue,
  } = useFormikContext<QuestionnaireForm>();

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
      <Overview />

      {questions.map((_, index) => (
        <Question
          key={index}
          index={index}
          handleDeleteQuestion={handleDeleteQuestion}
        />
      ))}

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
          onClick={noop}
          disabled={isBtnDisabled()}>
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
    </div>
  );
};

export { Content };
