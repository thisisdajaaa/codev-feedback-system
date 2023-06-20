import type { NextApiRequest } from "next";

import { QueryBuilder } from "@/utils/advancedResults";
import ErrorHandler from "@/utils/errorHandler";

import { StatusCodes } from "@/constants/statusCode";

import { SurveyStatus } from "@/models/Survey/config";
import Template from "@/models/Template";
import type { IQuestion, ITemplate } from "@/models/Template/types";
import User from "@/models/User";

import type { Populate, ValidationResult } from "@/types";

import type {
  AddedQuestionResponse,
  CreatedQuestionnaireResponse,
  GetQuestionnaireApiResponse,
  GetQuestionnaireResponse,
  IAddQuestionRequest,
  ICreateQuestionnaireRequest,
  IRemoveQuestionRequest,
  PickedQuestion,
} from "@/features/questionnaire/types";

import { QUESTIONNAIRE_MESSAGES } from "./config";
import { USER_MESSAGES } from "../user/config";

export const QuestionnaireService = () => {
  const createTemplate = async (
    req: ICreateQuestionnaireRequest
  ): Promise<CreatedQuestionnaireResponse> => {
    const newTemplate = {
      ...req.body,
      createdBy: req.user._id,
      updatedBy: req.user._id,
    };

    let dbTemplate = {} as ITemplate;

    // look for a template with the provided externalId
    const existingTemplate = await Template.findOne({
      externalId: newTemplate.externalId,
    });

    if (existingTemplate) {
      // if found, update it
      dbTemplate = (await Template.findOneAndUpdate(
        { externalId: newTemplate.externalId },
        newTemplate,
        { new: true, lean: true }
      )) as ITemplate;
    } else {
      // if not found, create a new template
      dbTemplate = (await Template.create(newTemplate)) as ITemplate;
    }

    const {
      _id,
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
      id: _id.toString(),
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
  ): Promise<AddedQuestionResponse> => {
    const { templateId } = req.query;

    const newQuestion = {
      ...req.body,
    };

    const template = (await Template.findOne({
      externalId: templateId,
    })) as ITemplate;

    if (!template) {
      throw new ErrorHandler(
        QUESTIONNAIRE_MESSAGES.ERROR.TEMPLATE_NOT_FOUND,
        StatusCodes.NOT_FOUND
      );
    }

    const item = template.questions?.find(
      (x) => x.externalId === newQuestion.externalId // Use externalId instead of id here
    );

    if (item) {
      Object.assign(item, { ...newQuestion });
    } else {
      template.questions?.push(newQuestion as IQuestion);
    }

    await template.save();

    const { id, questions } = template;

    const addedQuestion = questions?.find(
      ({ externalId }) => externalId === req.body.externalId
    );

    const formattedQuestion: PickedQuestion = {
      id: addedQuestion?.id || "",
      title: addedQuestion?.title,
      type: addedQuestion?.type,
      options: addedQuestion?.options,
      isRequired: addedQuestion?.isRequired,
    };

    const formattedResponse: AddedQuestionResponse = {
      templateId: template?.externalId || id,
      ...formattedQuestion,
    };

    return formattedResponse;
  };

  const removeQuestion = async (
    req: IRemoveQuestionRequest
  ): Promise<CreatedQuestionnaireResponse> => {
    const { templateId } = req.query;

    const reqQuestion = {
      ...req.body,
    };

    const template = (await Template.findOne({
      externalId: templateId,
    })) as ITemplate;

    if (!template) {
      throw new ErrorHandler(
        QUESTIONNAIRE_MESSAGES.ERROR.TEMPLATE_NOT_FOUND,
        StatusCodes.NOT_FOUND
      );
    }

    template.questions = template.questions?.filter(
      (x) => x.externalId !== reqQuestion.id
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
        externalId: templateId,
      })) as ITemplate;
      found =
        template &&
        Boolean(template?.questions?.some((x) => x.externalId === questionId));
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

  const getTemplateById = async (
    req: NextApiRequest
  ): Promise<CreatedQuestionnaireResponse> => {
    const { id } = req.query;

    const template = (await Template.findOne({ _id: id }).lean()) as ITemplate;

    if (!template) {
      throw new ErrorHandler(
        QUESTIONNAIRE_MESSAGES.ERROR.TEMPLATE_NOT_FOUND,
        StatusCodes.NOT_FOUND
      );
    }

    const {
      _id: templateId,
      title,
      description,
      dateFrom,
      dateTo,
      department,
      questions,
      status,
      externalId,
    } = template;

    const formattedResponse: CreatedQuestionnaireResponse = {
      id: templateId.toString(),
      title,
      description,
      dateFrom,
      dateTo,
      department,
      questions,
      status,
      externalId,
    };

    return formattedResponse;
  };

  const getQuestionnaires = async (
    req: NextApiRequest
  ): Promise<GetQuestionnaireApiResponse> => {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 25;
    const createdBy = (req.query.createdBy as string) || req.user.email;
    const title = req.query.title as string;
    const status = req.query.status as string;

    let createdById: string | null = null;
    if (createdBy !== "all") {
      const user = await User.findOne({
        $or: [{ email: createdBy }],
      });

      if (!user)
        throw new ErrorHandler(
          USER_MESSAGES.ERROR.USER_NOT_FOUND,
          StatusCodes.NOT_FOUND
        );
      createdById = user._id.toString();
    }

    const filter = {
      ...(createdBy !== "all" && { createdBy: createdById }),
      ...(title && { title: { $regex: title, $options: "i" } }),
      ...(status && { status }),
      ...(!status && { status: { $ne: SurveyStatus.DELETED } }),
    };

    // Constructing initial query.
    const query = Template.find();

    const total = await Template.countDocuments(filter);

    // Building query with QueryBuilder
    const builder = new QueryBuilder(query, Template.schema, total);

    const populate: Populate[] = [
      {
        path: "createdBy",
        model: "User",
        select: "email name",
      },
    ];

    // Populate fields
    builder.populateFields(populate);

    // Filtering
    await builder.filtering(filter);

    // Sorting
    builder.sorting(req.query.sort as string);

    // Pagination
    builder.pagination({ page, limit });

    // Execute query
    const { query: buildQuery, pagination } = builder.build();
    const results = (await buildQuery.exec()) as GetQuestionnaireResponse[];

    return { count: results.length, total, pagination, data: results };
  };

  return {
    createTemplate,
    setTemplateStatus,
    isQuestionExistInTemplate,
    isTemplateExist,
    getTemplateById,
    addQuestion,
    removeQuestion,
    validateTemplate,
    getQuestionnaires,
  };
};
