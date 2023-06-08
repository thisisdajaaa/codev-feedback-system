import type { NextApiRequest, NextApiResponse } from "next";
import { NextHandler } from "next-connect";

import { advancedResults } from "@/utils/advancedResults";
import ErrorHandler from "@/utils/errorHandler";

import { StatusCodes } from "@/constants/statusCode";

import { SurveyStatus } from "@/models/Survey/config";
import Template from "@/models/Template";
import type { ITemplate } from "@/models/Template/types";

import type { AdvancedResultsOptions, ApiResponse } from "@/types";

import { QUESTIONNAIRE_MESSAGES } from "@/features/questionnaire/config";
import { QuestionnaireService } from "@/features/questionnaire/questionnaireService";
import type {
  AddedQuestionResponse,
  CreatedQuestionnaireResponse,
  GetQuestionnaireResponse,
  IAddQuestionRequest,
  ICreateQuestionnaireRequest,
  IRemoveQuestionRequest,
} from "@/features/questionnaire/types";
import { catchAsyncErrors } from "@/middlewares/catchAsyncErrors";

export const QuestionnaireController = () => {
  const {
    createTemplate,
    setTemplateStatus,
    isTemplateExist,
    isQuestionExistInTemplate,
    addQuestion,
    removeQuestion,
    validateTemplate,
    getTemplateById,
  } = QuestionnaireService();

  const handleGetQuestionnaires = catchAsyncErrors(
    async (
      req: NextApiRequest,
      res: NextApiResponse<ApiResponse<GetQuestionnaireResponse[]>>,
      _next: NextHandler
    ) => {
      const populateFields = [
        { path: "createdBy", select: "name email" },
        { path: "updatedBy", select: "name email" },
      ];

      const options: AdvancedResultsOptions<ITemplate> = {
        model: Template,
        req,
        strict: false,
        populate: populateFields,
        discardQueryList: ["question"],
      };

      const { count, pagination, data } = await advancedResults<
        ITemplate,
        GetQuestionnaireResponse[]
      >(options);

      //Let's filter out question if question query is available.
      const { question } = req.query;
      if (question) {
        data.forEach((x) => {
          const datum = x as any;
          const { questions } = x as any;

          const items: any[] = Array.isArray(questions)
            ? questions
            : [questions];
          datum.questions = items.filter((q) =>
            q.title.toLowerCase().includes(question.toString().toLowerCase())
          );
        });
      }

      return res.status(StatusCodes.OK).json({
        success: true,
        count,
        pagination,
        data,
        message: QUESTIONNAIRE_MESSAGES.SUCCESS.ALL,
      });
    }
  );

  const handleCreateQuestionnaire = catchAsyncErrors(
    async (
      req: ICreateQuestionnaireRequest,
      res: NextApiResponse<ApiResponse<CreatedQuestionnaireResponse>>,
      _next: NextHandler
    ) => {
      const createdTemplate = await createTemplate(req);

      const data: CreatedQuestionnaireResponse = { ...createdTemplate };

      return res.status(StatusCodes.OK).json({
        success: true,
        data,
        message: QUESTIONNAIRE_MESSAGES.SUCCESS.CREATE,
      });
    }
  );

  const handleQuestionnaireStatus = catchAsyncErrors(
    async (req: NextApiRequest, res: NextApiResponse, _next: NextHandler) => {
      const { templateId, status } = req.query;

      if (!Object.values(SurveyStatus).includes(status as SurveyStatus)) {
        throw new ErrorHandler("Invalid status", StatusCodes.BAD_REQUEST);
      }

      if (!(await isTemplateExist(templateId as string))) {
        throw new ErrorHandler(
          QUESTIONNAIRE_MESSAGES.ERROR.TEMPLATE_NOT_FOUND,
          StatusCodes.NOT_FOUND
        );
      }

      if (status === SurveyStatus.ACTIVE) {
        const { isValid, message } = await validateTemplate(
          templateId as string
        );

        if (!isValid) {
          throw new ErrorHandler(
            message || "Validation error/s",
            StatusCodes.BAD_REQUEST
          );
        }
      }

      await setTemplateStatus(req);

      return res.status(StatusCodes.OK).json({
        success: true,
        message: QUESTIONNAIRE_MESSAGES.SUCCESS.UPDATED_STATUS,
      });
    }
  );

  const handleAddQuestion = catchAsyncErrors(
    async (
      req: IAddQuestionRequest,
      res: NextApiResponse<ApiResponse<AddedQuestionResponse>>,
      _next: NextHandler
    ) => {
      const { templateId } = req.query;

      if (!(await isTemplateExist(templateId as string))) {
        throw new ErrorHandler(
          QUESTIONNAIRE_MESSAGES.ERROR.TEMPLATE_NOT_FOUND,
          StatusCodes.NOT_FOUND
        );
      }

      const template = await addQuestion(req);

      const data: AddedQuestionResponse = { ...template };

      return res.status(StatusCodes.OK).json({
        success: true,
        data,
        message: QUESTIONNAIRE_MESSAGES.SUCCESS.CREATED_QUESTION,
      });
    }
  );

  const handleRemoveQuestion = catchAsyncErrors(
    async (
      req: IRemoveQuestionRequest,
      res: NextApiResponse<ApiResponse<CreatedQuestionnaireResponse>>,
      _next: NextHandler
    ) => {
      const { templateId } = req.query;
      const { id } = req.body;

      if (!(await isTemplateExist(templateId as string))) {
        throw new ErrorHandler(
          QUESTIONNAIRE_MESSAGES.ERROR.TEMPLATE_NOT_FOUND,
          StatusCodes.NOT_FOUND
        );
      }

      if (
        !(await isQuestionExistInTemplate(templateId as string, id as string))
      ) {
        throw new ErrorHandler(
          QUESTIONNAIRE_MESSAGES.ERROR.QUESTION_NOT_FOUND,
          StatusCodes.NOT_FOUND
        );
      }

      const template = await removeQuestion(req);

      const data: CreatedQuestionnaireResponse = { ...template };

      return res.status(StatusCodes.OK).json({
        success: true,
        data,
        message: QUESTIONNAIRE_MESSAGES.SUCCESS.DELETED_QUESTION,
      });
    }
  );

  const handleGetTemplateById = catchAsyncErrors(
    async (
      req: NextApiRequest,
      res: NextApiResponse<ApiResponse<CreatedQuestionnaireResponse>>,
      _next: NextHandler
    ) => {
      const data = await getTemplateById(req);

      return res.status(StatusCodes.OK).json({
        success: true,
        data,
        message: QUESTIONNAIRE_MESSAGES.SUCCESS.SINGLE,
      });
    }
  );

  return {
    handleGetQuestionnaires,
    handleCreateQuestionnaire,
    handleQuestionnaireStatus,
    handleAddQuestion,
    handleRemoveQuestion,
    handleGetTemplateById,
  };
};
