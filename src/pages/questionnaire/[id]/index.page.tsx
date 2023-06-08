import { FormikContext, useFormik } from "formik";
import { NextPage } from "next";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React, { useMemo } from "react";

import logger from "@/utils/logger";
import { withAuth } from "@/utils/withAuth";
import { useAppDispatch, useMount } from "@/hooks";

import { QuestionType } from "@/constants/questionType";

import { Icon } from "@/components/Icon";
import { Typography } from "@/components/Typography";

import { actions } from "@/redux/questionnaire";

import { getQuestionnaireByIdAPI } from "@/api/questionnaire";

import { Content } from "../components/Content";
import type { Question, QuestionnaireForm, QuestionnaireProps } from "../types";

const EditQuestionnairePage: NextPage<QuestionnaireProps> = ({ items }) => {
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useAppDispatch();

  useMount(() => {
    dispatch(actions.callSetActiveTemplateId(String(id)));
  });

  console.log(items);

  const formattedResponse: QuestionnaireForm = useMemo(() => {
    const { data } = items;

    const renderIcon = (item: string) => {
      const mappedIcons = {
        [QuestionType["Text-Input"].code]: (
          <Icon src="/assets/short-answer.svg" />
        ),
        [QuestionType["Text-Area"].code]: <Icon src="/assets/paragraph.svg" />,
        [QuestionType["Rating"].code]: <Icon src="/assets/rating.svg" />,
        [QuestionType["Custom-Multiple"].code]: (
          <Icon src="/assets/checkbox-outline.svg" />
        ),
      };

      return mappedIcons[item] || <Icon src="/assets/radio.svg" />;
    };

    const getType = (type: string) => {
      const foundItem = Object.entries(QuestionType).find(
        ([_key, value]) => value.code === type
      );
      const formattedOptionItem = {
        label: (
          <div className="row flex items-center gap-[1.925rem] px-2">
            <div className="text-2xl">
              {renderIcon(String(foundItem?.[1].code))}
            </div>
            <Typography>{foundItem?.[1].name}</Typography>
          </div>
        ),
        value: foundItem?.[1].code || "",
      };

      return formattedOptionItem;
    };

    const mappedQuestions: Question[] =
      data?.questions?.map(({ isRequired, title, type, _id }) => ({
        isRequired: isRequired || false,
        options: [],
        title: title || "",
        type: getType(String(type)) || null,
        id: _id,
      })) || [];

    return {
      id: String(id),
      title: data?.title || "",
      description: data?.description || "",
      questions: mappedQuestions || [],
      dateFrom: data?.dateFrom ? new Date(data?.dateFrom) : null,
      dateTo: data?.dateTo ? new Date(data?.dateTo) : null,
    } as QuestionnaireForm;
  }, [id, items]);

  const formikBag = useFormik<QuestionnaireForm>({
    initialValues: formattedResponse,
    onSubmit: (values) => logger(values),
  });

  return (
    <FormikContext.Provider value={formikBag}>
      <Content />
    </FormikContext.Provider>
  );
};

export const getServerSideProps: GetServerSideProps<
  QuestionnaireProps
> = async (context) => {
  const id = context.params?.id as string;
  const response = await getQuestionnaireByIdAPI(id, context);

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

export default withAuth(EditQuestionnairePage);
