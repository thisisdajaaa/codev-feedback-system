import { FormikContext, useFormik } from "formik";
import { NextPage } from "next";
import React from "react";

import logger from "@/utils/logger";
import { withAuth } from "@/utils/withAuth";

import { Button } from "@/components/Button";
import { Icon } from "@/components/Icon";

import { Overview } from "./components/Overview";
import { Question } from "./components/Question";
import { initialQuestionnaireValues, newQuestion } from "./config";
import type { QuestionnaireForm } from "./types";

const Questionnaire: NextPage = () => {
  const formikBag = useFormik<QuestionnaireForm>({
    initialValues: initialQuestionnaireValues,
    onSubmit: (values) => logger(values),
  });

  const handleAddQuestion = () => {
    const { questions } = formikBag.values;

    const hasInvalidQuestions = questions.some(
      ({ title, type }) => !title || !type
    );

    if (hasInvalidQuestions) return;

    formikBag.setFieldValue("questions", [...questions, { ...newQuestion }]);
  };

  return (
    <FormikContext.Provider value={formikBag}>
      <div className="mx-auto flex max-w-screen-2xl flex-col gap-10 py-2 px-[2rem] sm:py-[1.125rem]">
        <Overview />

        {formikBag.values.questions.map((_, index) => (
          <Question key={index} index={index} />
        ))}

        <div className="mt-10 flex justify-end">
          <Button className="px-2 sm:px-2" onClick={handleAddQuestion}>
            <div className="text-xl">
              <Icon src="/assets/add.svg" />
            </div>
          </Button>
        </div>
      </div>
    </FormikContext.Provider>
  );
};

export default withAuth(Questionnaire);
