import { FormikContext, useFormik } from "formik";
import moment from "moment";
import { GetServerSideProps, NextPage } from "next";
import React, { useMemo } from "react";

import logger from "@/utils/logger";
import { withAuth } from "@/utils/withAuth";

import { Typography } from "@/components/Typography";

import { getSurveyByIdAPI } from "@/api/surveys";

import type { SurveyProps, SurveyQuestionnaireForm } from "./types";
import { FormCheckbox } from "@/components/Formik/FormCheckbox";

const ViewSurvey: NextPage<SurveyProps> = ({ items: { data } }) => {
  const initialValues: SurveyQuestionnaireForm = useMemo(() => {
    return {
      title: data?.title || "",
      description: data?.description || "",
      isAnonymous: data?.isAnonymous || false,
      dateFrom: data?.dateFrom || "",
      dateTo: data?.dateTo || "",
      questions: data?.questions || [],
    };
  }, [data]);

  const formikBag = useFormik<SurveyQuestionnaireForm>({
    initialValues,
    onSubmit: (values) => logger(values),
  });

  return (
    <FormikContext.Provider value={formikBag}>
      <div className="mx-auto flex max-w-screen-2xl flex-col gap-10 py-2 px-[2rem] sm:py-[1.125rem]">
        <div className="mt-12 rounded-lg border-t-8 border-zinc-500 bg-white px-8 py-[1.625rem] shadow-md">
          <Typography
            variant="h1"
            size="text-3xl"
            lineHeight="leading-[3rem]"
            className="mb-4 rounded-[2rem] font-bold">
            {data?.title || "--"}
          </Typography>

          <div className="mb-[1.063rem] grid gap-[0.375rem]">
            <Typography variant="p" className="min-w-[98px] font-bold">
              Description:
            </Typography>

            <Typography variant="p">{data?.description || "--"}</Typography>
          </div>

          <div className="mb-[1.063rem] flex flex-col gap-[0.375rem] md:flex-row">
            <Typography variant="p" className="min-w-[98px] font-bold">
              Duration:
            </Typography>

            <Typography variant="p" className="flex items-center gap-1">
              From{" "}
              <Typography variant="p" className="font-semibold">
                {moment(data?.dateFrom).format("MM/DD/YYYY")}
              </Typography>{" "}
              To{" "}
              <Typography variant="p" className="font-semibold">
                {moment(data?.dateFrom).format("MM/DD/YYYY")}
              </Typography>
            </Typography>
          </div>

          <div>
            <FormCheckbox
              name="isAnonymous"
              label="Set name and email address to Anonymous"
            />
          </div>
        </div>
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
