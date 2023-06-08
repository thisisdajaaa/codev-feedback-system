import { useFormikContext } from "formik";
import { debounce } from "lodash";
import React, { FC, Fragment, ReactNode, useMemo, useRef } from "react";

import { noop } from "@/utils/helpers";
import { useAppDispatch, useAppSelector } from "@/hooks";

import { QuestionType } from "@/constants/questionType";

import { GroupOption, Option } from "@/components/Dropdown/types";
import { FormCheckbox } from "@/components/Formik/FormCheckbox";
import { FormDropdown } from "@/components/Formik/FormDropdown";
import { FormInput } from "@/components/Formik/FormInput";
import { Icon } from "@/components/Icon";
import { Input } from "@/components/Input";
import { InputVariations } from "@/components/Input/config";
import { RadioGroup } from "@/components/RadioGroup";
import { Rating } from "@/components/Rating";
import { TextArea } from "@/components/TextArea";
import { Typography } from "@/components/Typography";

import { actions, selectors } from "@/redux/questionnaire";

import { addQuestionByTemplateIdAPI } from "@/api/questionnaire";
import type { IAddQuestionRequest } from "@/features/questionnaire/types";

import type { QuestionnaireForm, QuestionProps } from "../types";

const Question: FC<QuestionProps> = (props) => {
  const { index, handleDeleteQuestion } = props;

  const dispatch = useAppDispatch();
  const activeTemplateId = useAppSelector(selectors.activeTemplateId);

  const {
    values: { questions },
    setFieldValue,
  } = useFormikContext<QuestionnaireForm>();

  const currentQuestion = useMemo(() => questions[index], [index, questions]);

  const debouncedHandleCallAddQuestion = useRef(
    debounce(async (request: IAddQuestionRequest["body"]) => {
      const { success, data } = await addQuestionByTemplateIdAPI(
        activeTemplateId,
        request
      );

      if (success) {
        if (activeTemplateId !== data?.templateId)
          dispatch(actions.callSetActiveTemplateId(String(data?.templateId)));
        setFieldValue(`questions.${index}.id`, data?.id);
      }
    }, 300)
  );

  const handleInputChange = async (value: string) => {
    const request: IAddQuestionRequest["body"] = {
      title: value,
    };

    if (currentQuestion.id) request.id = currentQuestion.id;

    debouncedHandleCallAddQuestion.current(request);
  };

  const handleCheckboxChange = async (checked: boolean) => {
    const request: IAddQuestionRequest["body"] = {
      isRequired: checked,
    };

    if (currentQuestion.id) request.id = currentQuestion.id;

    debouncedHandleCallAddQuestion.current(request);
  };

  const handleDropdownChange = async (item: Option | Option[]) => {
    const request: IAddQuestionRequest["body"] = {
      type: (item as Option).value,
    };

    if (currentQuestion.id) request.id = currentQuestion.id;

    debouncedHandleCallAddQuestion.current(request);
  };

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

  const getTypeOptions: GroupOption[] = [
    {
      group: "Question Types",
      options: Object.entries(QuestionType)
        .filter(([key]) => key !== "Custom-Single" && key !== "Custom-Multiple")
        .map(([_key, value]) => ({
          label: (
            <div className="row flex items-center gap-[1.925rem] px-2">
              <div className="text-2xl">{renderIcon(value.code)}</div>
              <Typography>{value.name}</Typography>
            </div>
          ),
          value: value.code,
        })),
    },
  ];

  const renderQuestionOptions = () => {
    const mappedOptions: { [key: string]: ReactNode } = {
      ["Text-Input"]: (
        <Input
          variation={InputVariations.Solid}
          placeholder="Short answer text field"
          containerClassName="max-w-[25.813rem]"
          readOnly
        />
      ),
      ["Text-Area"]: <TextArea readOnly placeholder="Paragraph text field" />,
      ["Rating"]: <Rating value={0} onChange={noop} readOnly />,
    };

    const isRadioGroup =
      currentQuestion?.type &&
      !mappedOptions[currentQuestion.type.value] &&
      currentQuestion.type.value !== "Rating";

    if (isRadioGroup && currentQuestion?.type) {
      const questionOptions = QuestionType[currentQuestion.type.value]?.options;

      if (questionOptions && questionOptions.length > 0) {
        mappedOptions[currentQuestion.type.value] = (
          <RadioGroup
            onChange={noop}
            selectedOption={null}
            readOnly
            options={questionOptions.map((option) => ({
              label: option.name,
              value: option.name,
            }))}
          />
        );
      }
    }

    return currentQuestion?.type ? (
      mappedOptions[currentQuestion.type.value]
    ) : (
      <Fragment />
    );
  };

  const handleRemoveQuestion = async () => {
    if (!currentQuestion.id) return;

    await handleDeleteQuestion(currentQuestion.id, index);
  };

  return (
    <div className="rounded-lg bg-white px-8 py-[1.625rem] shadow-md">
      <div className="flex flex-col justify-between gap-2 lg:flex-row">
        <FormInput
          name={`questions.${index}.title`}
          placeholder="Enter your question here"
          variation={InputVariations.Solid}
          containerClassName="max-w-[51.063rem]"
          handleInputChange={handleInputChange}
        />

        <FormDropdown
          name={`questions.${index}.type`}
          placeholder="Select question type here..."
          options={getTypeOptions}
          className="lg:w-[18.75rem]"
          handleDropdownChange={handleDropdownChange}
        />
      </div>

      <div className="mt-5">
        <FormCheckbox
          name={`questions.${index}.isRequired`}
          label="Required"
          handleCheckedChange={handleCheckboxChange}
        />
      </div>

      <div className="mt-5">{renderQuestionOptions()}</div>

      <div
        className="mt-4 flex cursor-pointer justify-end text-2xl"
        onClick={handleRemoveQuestion}>
        <Icon src="/assets/red-trash.svg" />
      </div>
    </div>
  );
};

export { Question };
