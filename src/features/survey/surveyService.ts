import { groupBy } from "lodash";
import type { NextApiRequest } from "next/types";

import { QueryBuilder } from "@/utils/advancedResults";
import ErrorHandler from "@/utils/errorHandler";
import { sendEmail } from "@/utils/sendEmail";

import { QuestionType } from "@/constants/questionType";
import { StatusCodes } from "@/constants/statusCode";

import Survey from "@/models/Survey";
import { SurveyStatus } from "@/models/Survey/config";
import type { ISurvey, ISurveyAnswer } from "@/models/Survey/types";
import Template from "@/models/Template";
import type { IQuestion, ITemplate } from "@/models/Template/types";
import User from "@/models/User";
import type { IUser } from "@/models/User/types";

import { SurveyInvitesNotification } from "@/templates/SurveyorVerification";

import type { Populate, ValidationResult } from "@/types";

import type {
  AnalyticsQuestion,
  AnalyticsResponse,
  GetInvitedResponse,
  GetSurveysResponse,
  IAnswerSurveyRequest,
  ICreateSurveyRequest,
  IGetSurveyResponse,
  IViewSurveAnswer,
  QuestionAnalyticsData,
  SingleSurveyResponse,
  SurveyByIdQuestion,
  SurveyByIdResponse,
  SurveyDetailsByUserResponse,
  SurveysResponse,
} from "@/features/survey/types";

import { SURVEY_MESSAGES } from "./config";
import type { GetQuestionnaireResponse } from "../questionnaire/types";
import { USER_MESSAGES } from "../user/config";

export const SurveyService = () => {
  const setSurveyStatus = async (req: NextApiRequest): Promise<void> => {
    const { surveyId, status } = req.query;

    if (status === SurveyStatus.FINISHED) {
      await Survey.findOneAndUpdate(
        { _id: surveyId },
        { status: status, dateSubmitted: new Date().toISOString() }
      );
    } else {
      await Survey.findOneAndUpdate({ _id: surveyId }, { status: status });
    }
  };

  const sendInvites = async (req: NextApiRequest): Promise<void> => {
    const { templateId } = req.query;
    const emails: string[] = req.body;

    const template = await Template.findById(templateId).lean();
    if (template) {
      emails.forEach(async (email) => {
        const user = await User.findOne({ email }).lean();
        if (user) {
          const survey = await Survey.findOne({
            templateId,
            answeredBy: user._id,
          }).lean();
          if (!survey) {
            const newSurvey = {
              templateId,
              answeredBy: user._id,
            };
            const survey = (await Survey.create(newSurvey)) as ISurvey;
            const invitationURL = `${process.env.NEXT_PUBLIC_BASE_URL}/survey/${survey._id}`;
            await sendEmail({
              email,
              subject: `Survey notification ${template.title}`,
              html: SurveyInvitesNotification(invitationURL),
            });
          }
        }
      });
    }
  };

  const isSurveyExist = async (surveyId: string): Promise<boolean> => {
    let found = false;
    try {
      found =
        (await Survey.findOne({
          _id: surveyId,
        }).lean()) != null;
    } catch {
      found = false;
    }
    return found;
  };

  const getSurveyByTemplateId = async (
    req: NextApiRequest
  ): Promise<IGetSurveyResponse> => {
    const { templateId, title } = req.query;
    const userId = req.user.id;

    const survey = (await Survey.findOne({
      templateId,
      answeredBy: userId,
    })) as ISurvey | null;

    const template = (await Template.findOne({
      id: templateId,
    })) as ITemplate | null;

    const data: IGetSurveyResponse = {
      templateId: String(template?.id),
      answeredBy: survey?.answeredBy || userId,
      surveyAnswers: template?.questions
        ?.filter(
          (f) =>
            f.title?.toLowerCase().includes(String(title)?.toLowerCase()) ||
            !title
        )
        .map((x) => {
          const surveyAnswer = survey?.surveyAnswers.find(
            (a) => a.questionId.toString() === x._id.toString()
          );
          return {
            questionId: x._id,
            title: x.title,
            type: x.type,
            options:
              QuestionType[x.type || ""]?.options.length > 0
                ? JSON.stringify(
                    QuestionType[x.type || ""].options
                      .sort((a, b) => a.sortOrder - b.sortOrder)
                      .map((x) => x.name)
                  )
                : x.options,
            answer: surveyAnswer?.answer,
            comment: surveyAnswer?.comment,
          };
        }) as IViewSurveAnswer[],
    };

    return data;
  };

  const createSurvey = async (req: ICreateSurveyRequest): Promise<ISurvey> => {
    const { templateId, isAnonymous } = req.body;

    const userId = req.user.id;

    const template = (await Template.findOne({
      _id: templateId,
    })) as ITemplate | null;

    if (!template)
      throw new ErrorHandler(
        SURVEY_MESSAGES.ERROR.TEMPLATE_NOT_FOUND,
        StatusCodes.NOT_FOUND
      );

    const survey = await Survey.findOne({
      templateId,
      answeredBy: userId,
    }).lean();

    if (!survey) {
      const newSurvey = {
        templateId,
        answeredBy: userId,
        isAnonymous: isAnonymous,
      };

      return (await Survey.create(newSurvey)) as ISurvey;
    } else {
      return (await Survey.findOneAndUpdate(
        {
          templateId,
          answeredBy: userId,
        },
        { ...req.body },
        { new: true }
      )) as ISurvey;
    }
  };

  const answerSurvey = async (
    req: IAnswerSurveyRequest
  ): Promise<ISurvey | null> => {
    const { templateId, answer, questionId, comment } = req.body;

    const userId = req.user.id;

    const template = (await Template.findOne({
      _id: templateId,
    })) as ITemplate | null;

    if (!template)
      throw new ErrorHandler(
        SURVEY_MESSAGES.ERROR.TEMPLATE_NOT_FOUND,
        StatusCodes.NOT_FOUND
      );

    let survey = (await Survey.findOne({
      templateId,
      answeredBy: userId,
    })) as ISurvey | null;

    if (!survey) {
      const newSurvey = {
        templateId,
        answeredBy: userId,
        surveyAnswers: [
          {
            questionId,
            answer,
            comment,
          },
        ],
        isAnonymous: false,
      };

      survey = await Survey.create(newSurvey);
    } else {
      const item = survey.surveyAnswers.find(
        (x) => x.questionId.toString() === questionId
      );

      const foundQuestion = template.questions?.find(
        ({ _id }) => _id.toString() === item?.questionId.toString()
      );

      if (foundQuestion?.isRequired && !answer)
        throw new ErrorHandler(
          SURVEY_MESSAGES.ERROR.MISSING_QUESTION_ANSWER,
          StatusCodes.BAD_REQUEST
        );

      if (item) {
        item.answer = answer;
        item.comment = comment;
      } else {
        survey.surveyAnswers.push({
          questionId,
          answer,
          comment,
        } as ISurveyAnswer);
      }

      await survey.save();
    }

    return survey;
  };

  const getSurveys = async (
    req: NextApiRequest
  ): Promise<GetSurveysResponse> => {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 25;
    const answeredBy = req.user.email;

    const user = await User.findOne({
      $or: [{ email: answeredBy }],
    });

    if (!user)
      throw new ErrorHandler(
        USER_MESSAGES.ERROR.USER_NOT_FOUND,
        StatusCodes.NOT_FOUND
      );

    const filter = {
      answeredBy: user._id,
    };

    // Constructing initial query.
    const query = Survey.find();

    const total = await Survey.countDocuments(filter);

    // Building query with QueryBuilder
    const builder = new QueryBuilder(query, Survey.schema, total);

    const populate: Populate[] = [
      {
        path: "answeredBy",
        model: "User",
        select: "email name",
      },
      {
        path: "templateId",
        model: "Template",
        select: "title description dateFrom dateTo status",
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
    const results = (await buildQuery.exec()) as SingleSurveyResponse[];

    return { count: results.length, total, pagination, data: results };
  };

  const getInvitedByTemplateId = async (
    req: NextApiRequest
  ): Promise<GetInvitedResponse[]> => {
    const { templateId } = req.query;

    const surveys = await Survey.find({ templateId }).populate({
      path: "answeredBy",
      model: "User",
      select: "email name",
    });

    const formattedResult: GetInvitedResponse[] = surveys.map((x) => {
      return {
        templateId: x.templateId,
        answeredBy: x.id,
        answeredByEmail: x.answeredBy?.email,
      } as GetInvitedResponse;
    });
    return formattedResult;
  };

  const getAnsweredSurveysByTemplateId = async (
    req: NextApiRequest
  ): Promise<GetSurveysResponse> => {
    const { id } = req.query;
    const templateId = id;

    // Fetch the template once since we already have the templateId
    const template = (await Template.findOne({
      _id: templateId,
    })) as ITemplate | null;

    if (!template)
      throw new ErrorHandler(
        SURVEY_MESSAGES.ERROR.TEMPLATE_NOT_FOUND,
        StatusCodes.NOT_FOUND
      );

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 25;

    // Constructing initial query.
    const query = Survey.find({ templateId });

    const total = await Survey.countDocuments({ templateId });

    // Building query with QueryBuilder
    const builder = new QueryBuilder(query, Survey.schema, total);

    const populate: Populate[] = [
      {
        path: "answeredBy",
        model: "User",
        select: "email name",
      },
    ];

    // Populate fields
    builder.populateFields(populate);

    // Sorting
    builder.sorting(req.query.sort as string);

    // Pagination
    builder.pagination({ page, limit });

    // Execute query
    const { query: buildQuery, pagination } = builder.build();
    const results = (await buildQuery.exec()) as SingleSurveyResponse[];

    return { count: results.length, total, pagination, data: results };
  };

  const getTemplateAnalytics = async (
    req: NextApiRequest
  ): Promise<AnalyticsResponse> => {
    const { templateId } = req.query;

    if (!templateId)
      throw new ErrorHandler(
        SURVEY_MESSAGES.ERROR.MISSING_TEMPLATEID,
        StatusCodes.BAD_REQUEST
      );

    // Get all surveys with the specific templateId
    const surveys: SurveysResponse = await Survey.find({ templateId });

    if (!surveys.length)
      throw new ErrorHandler(
        SURVEY_MESSAGES.ERROR.SURVEY_NOT_FOUND,
        StatusCodes.NOT_FOUND
      );

    // Get the template with the specific templateId
    const template: GetQuestionnaireResponse | null = await Template.findOne({
      _id: templateId,
    });

    if (!template)
      throw new ErrorHandler(
        SURVEY_MESSAGES.ERROR.TEMPLATE_NOT_FOUND,
        StatusCodes.NOT_FOUND
      );

    const templateQuestions: IQuestion[] = template.questions || [];

    const totalSurveyCount = surveys.length;
    let allQuestions: AnalyticsQuestion[] = [];

    // Prepare analytics data
    surveys.forEach((survey) => {
      const convertedAnswers: AnalyticsQuestion[] = survey.surveyAnswers.map(
        (answer) => {
          return {
            questionId: String(answer.questionId),
            answer: answer.answer,
            comment: answer.comment,
          };
        }
      );
      allQuestions = [...allQuestions, ...convertedAnswers];
    });

    const groupedQuestions = groupBy(allQuestions, "questionId");

    const analytics: AnalyticsResponse = [];

    for (const questionId in groupedQuestions) {
      const questions = groupedQuestions[questionId];

      // Find the corresponding question in the templateQuestions array
      const questionInfo = templateQuestions.find(
        (tq) => String(tq._id) === questionId
      );

      if (!questionInfo) continue;

      // If question options are not defined, find it in QuestionType
      const questionOptions = QuestionType[questionInfo.type as string].options;

      if (!questionOptions?.length) continue;

      const responseCounts: Record<string, number> = {};
      let totalResponses = 0;

      questions.forEach((question) => {
        responseCounts[question.answer] =
          (responseCounts[question.answer] || 0) + 1;
        totalResponses += 1;
      });

      const yetToRespond = questionInfo.isRequired
        ? 0
        : totalSurveyCount - totalResponses;
      const totalPossibleResponses = totalSurveyCount;

      // Convert to array format with percentage
      const responseData: QuestionAnalyticsData[] = Array.isArray(
        questionOptions
      )
        ? questionOptions.map((option) => {
            const count = responseCounts[option.name] || 0;
            return {
              value: option.name,
              answers: `${(count / totalPossibleResponses) * 100}%`,
            };
          })
        : [];

      // If question is not required, consider "yet to respond"
      if (!questionInfo.isRequired) {
        responseData.push({
          value: SURVEY_MESSAGES.INFO.YET_TO_RESPOND,
          answers: `${(yetToRespond / totalPossibleResponses) * 100}%`,
        });
      }

      analytics.push({
        questionName: questionInfo.title || "",
        responses: responseData,
      });
    }

    return analytics;
  };

  const getSurveyDetailsByUser = async (
    req: NextApiRequest
  ): Promise<SurveyDetailsByUserResponse> => {
    const { templateId, userId } = req.query;

    if (!templateId || !userId)
      throw new ErrorHandler(
        SURVEY_MESSAGES.ERROR.MISSING_TEMPLATEID_USERID,
        StatusCodes.BAD_REQUEST
      );

    const survey = (await Survey.findOne({
      templateId: templateId,
      answeredBy: userId,
    }).lean()) as ISurvey | null;

    const user = (await User.findOne({ _id: userId }).lean()) as IUser | null;

    if (!survey || !user)
      throw new ErrorHandler(
        SURVEY_MESSAGES.ERROR.SURVEY_USER_NOT_FOUND,
        StatusCodes.NOT_FOUND
      );

    const template = (await Template.findById(
      survey.templateId
    ).lean()) as ITemplate | null;

    if (!template)
      throw new ErrorHandler(
        SURVEY_MESSAGES.ERROR.TEMPLATE_NOT_FOUND,
        StatusCodes.NOT_FOUND
      );

    const response: SurveyDetailsByUserResponse = {
      answeredBy: {
        name: String(user.name || "--"),
        email: String(user.email || "--"),
      },
      isAnonymous: survey.isAnonymous,
      createdAt: survey.dateSubmitted,
      surveyAnswers: survey.surveyAnswers.map((surveyAnswer) => {
        const question = template.questions?.find(
          (question) =>
            question._id.toString() === surveyAnswer.questionId.toString()
        );

        return {
          title: question
            ? question.title
            : SURVEY_MESSAGES.INFO.PLACEHOLDER_QUESTION,
          answer: surveyAnswer.answer,
        };
      }),
    };

    return response;
  };

  const validateSurvey = async (
    surveyId: string
  ): Promise<ValidationResult> => {
    const survey = (await Survey.findOne({
      _id: surveyId,
    }).lean()) as ISurvey;

    if (survey.surveyAnswers.length === 0) {
      return {
        isValid: false,
        message: SURVEY_MESSAGES.ERROR.UNANSWERED_SURVEY,
      };
    }

    const template = (await Template.findById(
      survey.templateId
    ).lean()) as ITemplate;

    if (
      template.questions
        ?.filter((x) => x.isRequired)
        .some((q) => {
          const hasAnswer = survey.surveyAnswers.some(
            (a) => a.questionId.toString() === q._id.toString() && a.answer
          );

          return !hasAnswer;
        })
    ) {
      return {
        isValid: false,
        message: SURVEY_MESSAGES.ERROR.INCOMPLETE_ANSWER,
      };
    }

    return { isValid: true };
  };

  const getSurveyById = async (
    req: NextApiRequest
  ): Promise<SurveyByIdResponse> => {
    const { id } = req.query;

    if (!id)
      throw new ErrorHandler(
        SURVEY_MESSAGES.ERROR.TEMPLATE_NOT_FOUND,
        StatusCodes.BAD_REQUEST
      );

    const survey = (await Survey.findOne({
      _id: String(id),
    }).lean()) as ISurvey;

    if (!survey)
      throw new ErrorHandler(
        SURVEY_MESSAGES.ERROR.SURVEY_NOT_FOUND,
        StatusCodes.NOT_FOUND
      );

    const template = (await Template.findById(
      survey.templateId
    ).lean()) as ITemplate;

    if (!template)
      throw new ErrorHandler(
        SURVEY_MESSAGES.ERROR.TEMPLATE_NOT_FOUND,
        StatusCodes.NOT_FOUND
      );

    const mappedQuestions: SurveyByIdQuestion[] =
      template.questions?.map((item) => {
        const foundSurvey = survey.surveyAnswers.find(
          (surveyAnswer) =>
            surveyAnswer.questionId.toString() === item._id.toString()
        );

        return {
          id: item._id || "",
          title: item.title || "",
          type: item.type || "",
          isRequired: item.isRequired || false,
          answer: foundSurvey?.answer || "",
          comment: foundSurvey?.comment || "",
        };
      }) || [];

    const formattedResponse: SurveyByIdResponse = {
      templateId: template._id,
      title: template.title || "",
      description: template.description || "",
      isAnonymous: survey.isAnonymous,
      dateFrom: template.dateFrom || "",
      dateTo: template.dateTo || "",
      questions: mappedQuestions || [],
      status: survey.status,
    };

    return formattedResponse;
  };

  return {
    sendInvites,
    createSurvey,
    answerSurvey,
    getSurveyByTemplateId,
    getAnsweredSurveysByTemplateId,
    getSurveys,
    getTemplateAnalytics,
    getSurveyDetailsByUser,
    isSurveyExist,
    setSurveyStatus,
    validateSurvey,
    getSurveyById,
    getInvitedByTemplateId
  };
};
