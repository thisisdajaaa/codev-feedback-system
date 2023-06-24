import { useFormikContext } from "formik";
import { debounce } from "lodash";
import React, {
  FC,
  Fragment,
  ReactNode,
  useCallback,
  useMemo,
  useState,
} from "react";
import { v4 as uuidv4 } from "uuid";

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

import { SurveyStatus } from "@/models/Survey/config";

import { actions, selectors } from "@/redux/questionnaire";
import { actions as utilsActions } from "@/redux/utils";

import { addQuestionByTemplateIdAPI } from "@/api/questionnaire";
import type { IAddQuestionRequest } from "@/features/questionnaire/types";

import type { QuestionnaireForm, QuestionProps } from "../types";

const Question: FC<QuestionProps> = (props) => {
  const { index } = props;

  const dispatch = useAppDispatch();
  const activeTemplateId = useAppSelector(selectors.activeTemplateId);

  const {
    values: { questions, status },
    setFieldValue,
  } = useFormikContext<QuestionnaireForm>();

  const [isAddingQuestion, setIsAddingQuestion] = useState<boolean>(false);

  const currentQuestion = useMemo(() => questions[index], [index, questions]);

  const isEditable = useMemo(
    () => !status || status === SurveyStatus.DRAFT,
    [status]
  );

  const handleCallAddQuestion = async (
    request: IAddQuestionRequest["body"]
  ) => {
    const externalId = currentQuestion.id ?? uuidv4();

    const { success, data, message } = await addQuestionByTemplateIdAPI(
      activeTemplateId,
      { ...request, externalId }
    );

    if (!success && message) {
      dispatch(
        utilsActions.callShowToast({
          open: true,
          type: "error",
          message,
        })
      );

      setIsAddingQuestion(false);
      return;
    }

    if (activeTemplateId !== data?.templateId)
      dispatch(actions.callSetActiveTemplateId(String(data?.templateId)));

    setFieldValue(`questions.${index}.id`, externalId);
    setIsAddingQuestion(false);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleInputChange = useCallback(
    debounce(async (value: string) => {
      if (isAddingQuestion) return;

      setIsAddingQuestion(true);

      const request: IAddQuestionRequest["body"] = {
        title: value,
      };

      if (currentQuestion.id) request.id = currentQuestion.id;

      handleCallAddQuestion(request);
    }, 500),
    [currentQuestion.id, isAddingQuestion]
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleCheckboxChange = useCallback(
    debounce(async (checked: boolean) => {
      if (isAddingQuestion) return;

      setIsAddingQuestion(true);

      const request: IAddQuestionRequest["body"] = {
        isRequired: checked,
      };

      if (currentQuestion.id) request.id = currentQuestion.id;
      handleCallAddQuestion(request);
    }, 500),
    [currentQuestion.id, isAddingQuestion]
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleDropdownChange = useCallback(
    debounce(async (item: Option | Option[]) => {
      if (isAddingQuestion) return;

      setIsAddingQuestion(true);

      const request: IAddQuestionRequest["body"] = {
        type: (item as Option).value,
      };

      if (currentQuestion.id) request.id = currentQuestion.id;

      handleCallAddQuestion(request);
    }, 500),
    [currentQuestion.id, isAddingQuestion]
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

    setFieldValue("toDeleteId", currentQuestion.id);
    setFieldValue("toDeleteIndex", index);
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
          readOnly={!isEditable}
        />

        <FormDropdown
          name={`questions.${index}.type`}
          placeholder="Select question type here..."
          options={getTypeOptions}
          className="lg:w-[18.75rem]"
          handleDropdownChange={handleDropdownChange}
          readOnly={!isEditable}
        />
      </div>

      <div className="mt-5 w-fit">
        <FormCheckbox
          name={`questions.${index}.isRequired`}
          label="Required"
          handleCheckedChange={handleCheckboxChange}
          readOnly={!isEditable}
        />
      </div>

      <div className="mt-5">{renderQuestionOptions()}</div>

      {isEditable && (
        <div
          className="mt-4 flex cursor-pointer justify-end text-2xl"
          onClick={handleRemoveQuestion}
        >
          <Icon src="/assets/red-trash.svg" />
        </div>
      )}
    </div>
  );
};

export { Question };
