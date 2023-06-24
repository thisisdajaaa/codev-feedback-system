import { FormikContext, useFormik } from "formik";
import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import React, { useMemo } from "react";

import { withAuth } from "@/utils/withAuth";
import { useAppDispatch } from "@/hooks";

import { SYSTEM_URL } from "@/constants/pageUrl";
import { QuestionType } from "@/constants/questionType";

import { BackArrow } from "@/components/BackArrow";
import { Button } from "@/components/Button";
import { Typography } from "@/components/Typography";

import { SurveyStatus } from "@/models/Survey/config";

import { actions as utilsActions } from "@/redux/utils";

import { getSurveyByIdAPI, updateSurveyStatusAPI } from "@/api/surveys";
import type { SurveyByIdResponse } from "@/features/survey/types";

import { Overview } from "./components/Overview";
import { Question } from "./components/Question";
import type { SurveyProps, SurveyQuestionnaireForm } from "./types";
import { surveyFormSchema } from "./validations/surveyFormSchema";

const Survey: NextPage<SurveyProps> = ({ items: { data } }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { id } = router.query;

  const initialValues: SurveyQuestionnaireForm = useMemo(() => {
    const flatTypes = ["Text-Input", "Text-Area", "Rating"];

    const mappedQuestions = data?.questions.map((item) => {
      if (!flatTypes.includes(item.type)) {
        const questionOptions = QuestionType[item.type]?.options;
        const foundOption = questionOptions?.find(
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
      status: data?.status || SurveyStatus.ACTIVE,
    };
  }, [data]);

  const handleSubmit = async () => {
    const { success, message } = await updateSurveyStatusAPI(
      SurveyStatus.FINISHED,
      String(id)
    );

    if (!success && message) {
      dispatch(
        utilsActions.callShowToast({
          open: true,
          type: "error",
          message,
        })
      );

      return;
    }

    dispatch(
      utilsActions.callShowToast({
        open: true,
        type: "success",
        message: "Successfully submitted survey!",
      })
    );

    router.push(SYSTEM_URL.HOME);
  };

  const formikBag = useFormik<SurveyQuestionnaireForm>({
    initialValues,
    validateOnBlur: false,
    validateOnChange: false,
    enableReinitialize: true,
    validationSchema: surveyFormSchema,
    onSubmit: handleSubmit,
  });

  const isEditable = formikBag.values.status === SurveyStatus.ACTIVE;

  const isBtnDisabled = !surveyFormSchema.isValidSync(formikBag.values);

  return (
    <FormikContext.Provider value={formikBag}>
      <div className="mx-auto flex max-w-screen-2xl flex-col gap-10 py-2 px-[2rem] sm:py-[1.125rem]">
        <div>
          <BackArrow />

          <Overview data={data as SurveyByIdResponse} />
        </div>

        {formikBag.values.questions.map((_, index) => (
          <Question key={index} index={index} />
        ))}

        {isEditable && (
          <div className="mt-10 flex justify-end">
            <Button
              className="rounded-[0.938rem]"
              onClick={formikBag.submitForm}
              isLoading={formikBag.isSubmitting}
              disabled={isBtnDisabled}
            >
              <Typography
                variant="span"
                size="text-lg"
                lineHeight="leading-[1.688rem]"
                textAlign="text-left"
                color="text-white"
                className="font-bold"
              >
                Submit
              </Typography>
            </Button>
          </div>
        )}
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

export default withAuth(Survey);
