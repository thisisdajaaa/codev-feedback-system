import { FormikContext, useFormik } from "formik";
import { GetServerSideProps, NextPage } from "next";
import React, { useMemo } from "react";

import logger from "@/utils/logger";
import { withAuth } from "@/utils/withAuth";
import { useAppDispatch, useAppSelector, useMount } from "@/hooks";

import { QuestionType } from "@/constants/questionType";

import { AlertBanner } from "@/components/AlertBanner";

import { actions, selectors } from "@/redux/surveys";

import { getSurveyByIdAPI } from "@/api/surveys";
import type { SurveyByIdResponse } from "@/features/survey/types";

import { Overview } from "./components/Overview";
import { Question } from "./components/Question";
import type { SurveyProps, SurveyQuestionnaireForm } from "./types";

const ViewSurvey: NextPage<SurveyProps> = ({ items: { data } }) => {
  const dispatch = useAppDispatch();
  const serverErrorMessage = useAppSelector(selectors.serverErrorMessage);

  useMount(() => {
    onClearServerErrorMessage();
  });

  const onClearServerErrorMessage = () => {
    dispatch(actions.callSetServerErrorMessage(""));
  };

  const initialValues: SurveyQuestionnaireForm = useMemo(() => {
    const flatTypes = ["Text-Input", "Text-Area", "Rating"];

    const mappedQuestions = data?.questions.map((item) => {
      if (!flatTypes.includes(item.type)) {
        const questionOptions = QuestionType[item.type]?.options;
        const foundOption = questionOptions.find(
          ({ name }) => name === item.answer
        );

        const mappedAnswer = {
          label: foundOption?.name || "",
          value: foundOption?.name || "",
        };

        return {
          ...item,
          answer: mappedAnswer || "",
        };
      }

      return { ...item };
    });

    return {
      templateId: data?.templateId || "",
      title: data?.title || "",
      description: data?.description || "",
      isAnonymous: data?.isAnonymous || false,
      dateFrom: data?.dateFrom || "",
      dateTo: data?.dateTo || "",
      questions: mappedQuestions || [],
    };
  }, [data]);

  const formikBag = useFormik<SurveyQuestionnaireForm>({
    initialValues,
    onSubmit: (values) => logger(values),
  });

  return (
    <FormikContext.Provider value={formikBag}>
      <div className="mx-auto flex max-w-screen-2xl flex-col gap-10 py-2 px-[2rem] sm:py-[1.125rem]">
        <AlertBanner
          open={!!serverErrorMessage}
          message={serverErrorMessage}
          type="error"
          handleClose={onClearServerErrorMessage}
        />

        <Overview data={data as SurveyByIdResponse} />

        {formikBag.values.questions.map((_, index) => (
          <Question key={index} index={index} />
        ))}
      </div>
    </FormikContext.Provider>
  );
};

export const getServerSideProps: GetServerSideProps<SurveyProps> = async (
  context
) => {
  const id = context.params?.id as string;
  const response = await getSurveyByIdAPI(id, context);

  if (!response.data || !response.success) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      items: response,
    },
  };
};

export default withAuth(ViewSurvey);
