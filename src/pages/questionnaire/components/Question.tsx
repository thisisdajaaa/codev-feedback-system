import { useFormikContext } from "formik";
import React, { FC, Fragment, ReactNode, useMemo } from "react";

import { noop } from "@/utils/helpers";

import { QuestionType } from "@/constants/questionType";

import { GroupOption } from "@/components/Dropdown/types";
import { FormDropdown } from "@/components/Formik/FormDropdown";
import { FormInput } from "@/components/Formik/FormInput";
import { Icon } from "@/components/Icon";
import { Input } from "@/components/Input";
import { InputVariations } from "@/components/Input/config";
import { RadioGroup } from "@/components/RadioGroup";
import { Rating } from "@/components/Rating";
import { TextArea } from "@/components/TextArea";
import { Typography } from "@/components/Typography";

import type { QuestionnaireForm, QuestionProps } from "../types";

const Question: FC<QuestionProps> = (props) => {
  const { index } = props;

  const { values } = useFormikContext<QuestionnaireForm>();

  const selectedType = useMemo(
    () => values.questions[index],
    [index, values.questions]
  );

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
            <div className="row flex items-center gap-[30.8px] px-2">
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
          containerClassName="max-w-[413px]"
          readOnly
        />
      ),
      ["Text-Area"]: <TextArea readOnly placeholder="Paragraph text field" />,
      ["Rating"]: <Rating value={0} onChange={noop} readOnly />,
    };

    const isRadioGroup =
      selectedType?.type &&
      !mappedOptions[selectedType.type.value] &&
      selectedType.type.value !== "Rating";

    if (isRadioGroup && selectedType?.type) {
      const questionOptions = QuestionType[selectedType.type.value].options;

      if (questionOptions && questionOptions.length > 0) {
        mappedOptions[selectedType.type.value] = (
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

    return selectedType?.type ? (
      mappedOptions[selectedType.type.value]
    ) : (
      <Fragment />
    );
  };

  return (
    <div className="rounded-lg bg-white px-8 py-[26px] shadow-md">
      <div className="flex flex-col justify-between gap-2 lg:flex-row">
        <FormInput
          name={`questions.${index}.title`}
          placeholder="Enter your question here"
          variation={InputVariations.Solid}
          containerClassName="max-w-[817px]"
        />

        <FormDropdown
          name={`questions.${index}.type`}
          placeholder="Select question type here..."
          options={getTypeOptions}
          className="lg:w-[300px]"
        />
      </div>

      <div className="mt-5">{renderQuestionOptions()}</div>

      <div className="mt-4 flex cursor-pointer justify-end text-2xl">
        <Icon src="/assets/red-trash.svg" />
      </div>
    </div>
  );
};

export { Question };
