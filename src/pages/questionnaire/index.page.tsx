import { FormikContext, useFormik } from "formik";
import { NextPage } from "next";
import React from "react";

import { noop } from "@/utils/helpers";
import logger from "@/utils/logger";
import { withAuth } from "@/utils/withAuth";
import { useAppSelector } from "@/hooks";

import { Button } from "@/components/Button";
import { Icon } from "@/components/Icon";
import { Typography } from "@/components/Typography";

import { selectors } from "@/redux/questionnaire";

import { removeQuestionByTemplateIdAPI } from "@/api/questionnaire";
import type { IRemoveQuestionRequest } from "@/features/questionnaire/types";

import { Overview } from "./components/Overview";
import { Question } from "./components/Question";
import { initialQuestionnaireValues, newQuestion } from "./config";
import type { QuestionnaireForm } from "./types";

const Questionnaire: NextPage = () => {
  const activeTemplateId = useAppSelector(selectors.activeTemplateId);

  const formikBag = useFormik<QuestionnaireForm>({
    initialValues: initialQuestionnaireValues,
    onSubmit: (values) => logger(values),
  });

  const isBtnDisabled = () => {
    const { questions, title } = formikBag.values;

    const hasInvalidQuestions = questions.some(
      ({ title, type }) => !title || !type
    );

    return hasInvalidQuestions || !title;
  };

  const handleAddQuestion = () => {
    const { questions } = formikBag.values;

    if (isBtnDisabled()) return;

    formikBag.setFieldValue("questions", [...questions, { ...newQuestion }]);
  };

  const handleDeleteQuestion = async (questionId: string, index: number) => {
    const request: IRemoveQuestionRequest["body"] = {
      id: questionId,
    };

    const { success } = await removeQuestionByTemplateIdAPI(
      activeTemplateId,
      request
    );

    const { questions } = formikBag.values;

    const filteredQuestions = questions.filter((_, key) => key !== index);

    if (success) formikBag.setFieldValue("questions", filteredQuestions);

    return success;
  };

  return (
    <FormikContext.Provider value={formikBag}>
      <div className="mx-auto flex max-w-screen-2xl flex-col gap-10 py-2 px-[2rem] sm:py-[1.125rem]">
        <Overview />

        {formikBag.values.questions.map((_, index) => (
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
      </div>
    </FormikContext.Provider>
  );
};

export default withAuth(Questionnaire);
