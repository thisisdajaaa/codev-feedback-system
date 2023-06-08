import { FormikContext, useFormik } from "formik";
import { NextPage } from "next";
import React from "react";

import logger from "@/utils/logger";
import { withAuth } from "@/utils/withAuth";

import { Content } from "./components/Content";
import { initialQuestionnaireValues } from "./config";
import type { QuestionnaireForm } from "./types";

const Questionnaire: NextPage = () => {
  const formikBag = useFormik<QuestionnaireForm>({
    initialValues: initialQuestionnaireValues,
    onSubmit: (values) => logger(values),
  });

  console.log("formikBag", formikBag.values);

  return (
    <FormikContext.Provider value={formikBag}>
      <Content />
    </FormikContext.Provider>
  );
};

export default withAuth(Questionnaire);
