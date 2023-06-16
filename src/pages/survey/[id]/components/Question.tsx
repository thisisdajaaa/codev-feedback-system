import { useFormikContext } from "formik";
import { debounce } from "lodash";
import React, { FC, Fragment, ReactNode, useMemo, useRef } from "react";

import { useAppDispatch } from "@/hooks";

import { QuestionType } from "@/constants/questionType";

import { FormInput } from "@/components/Formik/FormInput";
import { FormRadioGroup } from "@/components/Formik/FormRadioGroup";
import { FormRating } from "@/components/Formik/FormRating";
import { FormTextArea } from "@/components/Formik/FormTextArea";
import { InputVariations } from "@/components/Input/config";
import type { Option } from "@/components/RadioGroup/types";
import { Typography } from "@/components/Typography";

import { SurveyStatus } from "@/models/Survey/config";

import { actions } from "@/redux/surveys";

import { answerSurveyQuestionAPI } from "@/api/surveys";
import type { IAnswerSurveyRequest } from "@/features/survey/types";

import type { QuestionProps, SurveyQuestionnaireForm } from "../types";

const Question: FC<QuestionProps> = (props) => {
  const { index } = props;

  const dispatch = useAppDispatch();

  const {
    values: { questions, templateId, status },
  } = useFormikContext<SurveyQuestionnaireForm>();

  const currentQuestion = useMemo(() => questions[index], [index, questions]);

  const debouncedHandleCallAnswerQuestion = useRef(
    debounce(async (request: IAnswerSurveyRequest["body"]) => {
      dispatch(actions.callSetServerErrorMessage(""));

      const { success, message } = await answerSurveyQuestionAPI(request);

      if (!success && message) {
        dispatch(actions.callSetServerErrorMessage(message));
        return;
      }
    }, 500)
  ).current;

  const renderFormField = useMemo(() => {
    const handleInputChange = async (value: string) => {
      const request: IAnswerSurveyRequest["body"] = {
        templateId,
        questionId: currentQuestion.id,
        answer: value,
      };

      debouncedHandleCallAnswerQuestion(request);
    };

    const handleRatingChange = async (value: number) => {
      const request: IAnswerSurveyRequest["body"] = {
        templateId,
        questionId: currentQuestion.id,
        answer: String(value),
      };

      debouncedHandleCallAnswerQuestion(request);
    };

    const handleRadioChange = async (item: Option) => {
      const request: IAnswerSurveyRequest["body"] = {
        templateId,
        questionId: currentQuestion.id,
        answer: item.value || "",
      };

      debouncedHandleCallAnswerQuestion(request);
    };

    const isEditable = status === SurveyStatus.ACTIVE;

    const mappedOptions: { [key: string]: ReactNode } = {
      ["Text-Input"]: (
        <FormInput
          name={`questions.${index}.answer`}
          variation={InputVariations.Solid}
          placeholder="Type your answer here"
          handleInputChange={handleInputChange}
          readOnly={!isEditable}
        />
      ),
      ["Text-Area"]: (
        <FormTextArea
          name={`questions.${index}.answer`}
          placeholder="Type your answer here"
          handleInputChange={handleInputChange}
          readOnly={!isEditable}
        />
      ),
      ["Rating"]: (
        <FormRating
          name={`questions.${index}.answer`}
          handleRatingChange={handleRatingChange}
          readOnly={!isEditable}
        />
      ),
    };

    const isRadioGroup =
      currentQuestion?.type &&
      !mappedOptions[currentQuestion.type] &&
      currentQuestion.type !== "Rating";

    if (isRadioGroup && currentQuestion?.type) {
      const questionOptions = QuestionType[currentQuestion.type]?.options;

      if (questionOptions && questionOptions.length > 0) {
        mappedOptions[currentQuestion.type] = (
          <FormRadioGroup
            name={`questions.${index}.answer`}
            handleRadioGroupChange={handleRadioChange}
            readOnly={!isEditable}
            options={questionOptions.map((option) => ({
              label: option.name,
              value: option.name,
            }))}
          />
        );
      }
    }

    return currentQuestion?.type ? (
      mappedOptions[currentQuestion.type]
    ) : (
      <Fragment />
    );
  }, [
    currentQuestion.id,
    currentQuestion.type,
    debouncedHandleCallAnswerQuestion,
    index,
    status,
    templateId,
  ]);

  return (
    <div className="rounded-lg bg-white px-7 pt-[0.813rem] pb-[4.5rem] shadow-md">
      <div className="flex border-b border-b-nero px-[0.938rem] pb-3">
        <Typography
          variant="p"
          size="text-xl"
          lineHeight="leading-[1.875rem]"
          className="font-semibold"
        >
          Q{index + 1}. {currentQuestion.title}
        </Typography>

        {currentQuestion.isRequired && (
          <span className="ml-1 text-red-500">*</span>
        )}
      </div>

      <div className="mt-4">{renderFormField}</div>
    </div>
  );
};

export { Question };
