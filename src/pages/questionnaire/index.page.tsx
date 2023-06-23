import { FormikContext, useFormik } from "formik";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useCallback } from "react";

import { withAuth } from "@/utils/withAuth";
import { useAppDispatch, useAppSelector } from "@/hooks";

import { SYSTEM_URL } from "@/constants/pageUrl";

import { SurveyStatus } from "@/models/Survey/config";

import { actions, selectors } from "@/redux/questionnaire";

import { updateQuestionnaireStatusAPI } from "@/api/questionnaire";

import { Content } from "./components/Content";
import { initialQuestionnaireValues } from "./config";
import type { QuestionnaireForm } from "./types";
import { questionnaireFormSchema } from "./validations/questionnaireFormSchema";

const Questionnaire: NextPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const activeTemplateId = useAppSelector(selectors.activeTemplateId);

  const handleSubmit = useCallback(async () => {
    const { success, message } = await updateQuestionnaireStatusAPI(
      SurveyStatus.ACTIVE,
      activeTemplateId,
      true
    );

    if (!success && message) {
      dispatch(actions.callSetServerErrorMessage(message));
      return;
    }

    router.push(SYSTEM_URL.HOME);
  }, [activeTemplateId, dispatch, router]);

  const formikBag = useFormik<QuestionnaireForm>({
    initialValues: initialQuestionnaireValues,
    validateOnBlur: false,
    validateOnChange: false,
    enableReinitialize: true,
    validationSchema: questionnaireFormSchema,
    onSubmit: handleSubmit,
  });

  return (
    <FormikContext.Provider value={formikBag}>
      <Content />
    </FormikContext.Provider>
  );
};

export default withAuth(Questionnaire);
