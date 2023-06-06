import { NextApiRequest } from "next";

import Template from "@/models/Template";
import { IQuestion, ITemplate } from "@/models/Template/types";

import { ValidationResult } from "@/types";

import type {
  CreatedQuestionnaireResponse,
  IAddQuestionRequest,
  ICreateQuestionnaireRequest,
} from "@/features/questionnaire/types";

import { QUESTIONNAIRE_MESSAGES } from "./config";

export const TemplateService = () => {
  const createTemplate = async (
    req: ICreateQuestionnaireRequest
  ): Promise<CreatedQuestionnaireResponse> => {
    const newTemplate = {
      ...req.body,
      createdBy: req.user._id,
      updatedBy: req.user._id,
    };

    let isExist = false;
    let dbTemplate = {} as ITemplate;

    if (newTemplate.id) {
      isExist = true;
      dbTemplate = (await Template.findOneAndUpdate(
        { _id: newTemplate.id },
        newTemplate,
        { new: true }
      )) as ITemplate;
    }

    if (!isExist) {
      dbTemplate = (await Template.create(newTemplate)) as ITemplate;
    }

    const {
      id,
      title,
      department,
      dateFrom,
      dateTo,
      description,
      questions,
      createdBy,
      updatedBy,
      status,
    } = dbTemplate;

    const formattedResponse: CreatedQuestionnaireResponse = {
      id,
      title,
      department,
      dateFrom,
      dateTo,
      description,
      questions,
      createdBy,
      updatedBy,
      status,
    };

    return formattedResponse;
  };

  const setTemplateStatus = async (req: NextApiRequest): Promise<void> => {
    const { templateId, status } = req.query;

    await Template.findOneAndUpdate({ _id: templateId }, { status: status });
  };

  const addQuestion = async (
    req: IAddQuestionRequest
  ): Promise<CreatedQuestionnaireResponse> => {
    const { templateId } = req.query;
    const newQuestion = {
      ...req.body,
    };

    const template = (await Template.findOne({ _id: templateId })) as ITemplate;

    const item = template.questions?.find(
      (x) => x.id.toString() === newQuestion.id
    );

    if (item) {
      Object.assign(item, { ...newQuestion });
    } else {
      template.questions?.push(newQuestion as IQuestion);
    }

    await template.save();

    const {
      id,
      title,
      department,
      dateFrom,
      dateTo,
      description,
      questions,
      createdBy,
      updatedBy,
      status,
    } = template;

    const formattedResponse: CreatedQuestionnaireResponse = {
      id,
      title,
      department,
      dateFrom,
      dateTo,
      description,
      questions,
      createdBy,
      updatedBy,
      status,
    };

    return formattedResponse;
  };

  const removeQuestion = async (
    req: NextApiRequest
  ): Promise<CreatedQuestionnaireResponse> => {
    const { templateId } = req.query;
    const reqQuestion = {
      ...req.body,
    };

    const template = (await Template.findOne({ _id: templateId })) as ITemplate;

    template.questions = template.questions?.filter(
      (x) => x.id.toString() !== reqQuestion.id
    );

    await template.save();

    const {
      id,
      title,
      department,
      dateFrom,
      dateTo,
      description,
      questions,
      createdBy,
      updatedBy,
      status,
    } = template;

    const formattedResponse: CreatedQuestionnaireResponse = {
      id,
      title,
      department,
      dateFrom,
      dateTo,
      description,
      questions,
      createdBy,
      updatedBy,
      status,
    };

    return formattedResponse;
  };

  const isQuestionExistInTemplate = async (
    templateId: string,
    questionId: string
  ): Promise<boolean> => {
    let found = false;
    try {
      const template = (await Template.findOne({
        _id: templateId,
      })) as ITemplate;
      found =
        template &&
        Boolean(template?.questions?.some((x) => x.id === questionId));
    } catch {
      found = false;
    }
    return found;
  };

  const isTemplateExist = async (templateId: string): Promise<boolean> => {
    let found = false;
    try {
      found =
        (await Template.findOne({
          _id: templateId,
        }).lean()) != null;
    } catch {
      found = false;
    }
    return found;
  };

  const validateTemplate = async (
    templateId: string
  ): Promise<ValidationResult> => {
    const template = (await Template.findOne({
      _id: templateId,
    }).lean()) as ITemplate;

    if (!template.title) {
      return {
        isValid: false,
        message: QUESTIONNAIRE_MESSAGES.ERROR.TITLE_IS_REQUIRED,
      };
    }

    if (!template.department) {
      return {
        isValid: false,
        message: QUESTIONNAIRE_MESSAGES.ERROR.DEPARTMENT_IS_REQUIRED,
      };
    }

    if (!(template.dateFrom && template.dateTo)) {
      return {
        isValid: false,
        message: QUESTIONNAIRE_MESSAGES.ERROR.MISSING_DATE,
      };
    }
    if (template.questions?.length === 0) {
      return {
        isValid: false,
        message: QUESTIONNAIRE_MESSAGES.ERROR.EMPTY_QUESTIONNAIRE,
      };
    }
    return { isValid: true };
  };

  return {
    createTemplate,
    setTemplateStatus,
    isQuestionExistInTemplate,
    isTemplateExist,
    addQuestion,
    removeQuestion,
    validateTemplate,
  };
};
