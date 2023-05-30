import { groupBy } from "lodash";
import type { NextApiRequest } from "next/types";

import { QueryBuilder } from "@/utils/advancedResults";
import ErrorHandler from "@/utils/errorHandler";

import { QuestionType } from "@/constants/questionType";
import { StatusCodes } from "@/constants/statusCode";

import Survey from "@/models/Survey";
import type { ISurvey, ISurveyAnswer } from "@/models/Survey/types";
import Template from "@/models/Template";
import type { IQuestion, ITemplate } from "@/models/Template/types";
import User from "@/models/User/User";

import type { Populate } from "@/types";

import type {
  AnalyticsQuestion,
  AnalyticsResponse,
  GetSurveysResponse,
  IAnswerSurveyRequest,
  IGetSurveyResponse,
  IViewSurveAnswer,
  QuestionAnalyticsData,
  SingleSurveyResponse,
  SurveysResponse,
} from "@/features/survey/types";

import { SURVEY_MESSAGES } from "./config";
import type { GetQuestionnaireResponse } from "../questionnaire/types";
import { USER_MESSAGES } from "../user/config";

export const SurveyService = () => {
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
        .filter(
          (f) =>
            f.title.toLowerCase().includes(String(title)?.toLowerCase()) ||
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
              QuestionType[x.type]?.options.length > 0
                ? JSON.stringify(
                    QuestionType[x.type].options
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

  const answerSurvey = async (req: IAnswerSurveyRequest) => {
    const { templateId } = req.query;

    const { answer, questionId, comment } = req.body;

    const userId = req.user.id;

    let survey = (await Survey.findOne({
      templateId,
      answeredBy: userId,
    })) as ISurvey | null;

    const template = (await Template.findOne({
      id: templateId,
    })) as ITemplate | null;

    if (!template)
      throw new ErrorHandler(
        SURVEY_MESSAGES.ERROR.TEMPLATE_NOT_FOUND,
        StatusCodes.NOT_FOUND
      );

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
        dateSubmitted: new Date().toISOString(),
      };

      survey = await Survey.create(newSurvey);
    } else {
      const item = survey.surveyAnswers.find(
        (x) => x.questionId.toString() === questionId
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

      survey.dateSubmitted = new Date().toISOString();
      await survey.save();
    }

    return survey;
  };

  const getSurveys = async (
    req: NextApiRequest
  ): Promise<GetSurveysResponse> => {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 25;
    const createdBy = (req.query.createdBy as string) || req.user.email;
    const title = req.query.title as string;

    const user = await User.findOne({
      $or: [{ email: createdBy }],
    });

    if (!user)
      throw new ErrorHandler(
        USER_MESSAGES.ERROR.USER_NOT_FOUND,
        StatusCodes.NOT_FOUND
      );

    const filter = {
      createdBy: user._id,
      ...(title && { title: { $regex: title, $options: "i" } }),
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
      {
        path: "surveys",
        model: "Survey",
        select: "answeredBy surveyAnswers isAnonymous status dateSubmitted",
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

  const getAnsweredSurveysByTemplateId = async (
    req: NextApiRequest
  ): Promise<GetSurveysResponse> => {
    const { templateId } = req.query;
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

    if (!templateId) throw new Error("No Template ID");

    // Get all surveys with the specific templateId
    const surveys: SurveysResponse = await Survey.find({ templateId });
    if (!surveys.length) throw new Error("Surveys not found");

    // Get the template with the specific templateId
    const template: GetQuestionnaireResponse | null = await Template.findOne({
      _id: templateId,
    });

    if (!template) throw new Error("Template not found");
    const templateQuestions: IQuestion[] = template.questions;

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

      if (!questionInfo || !questionInfo?.options?.length) continue;

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
      const responseData: QuestionAnalyticsData[] = Object.entries(
        responseCounts
      ).map(([answer, count]) => ({
        value: answer,
        answers: `${(count / totalPossibleResponses) * 100}%`,
      }));

      // If question is not required, consider "yet to respond"
      if (!questionInfo.isRequired) {
        responseData.push({
          value: "Yet to Respond",
          answers: `${(yetToRespond / totalPossibleResponses) * 100}%`,
        });
      }

      analytics.push({
        questionName: questionInfo.title,
        responses: responseData,
      });
    }

    return analytics;
  };

  return {
    answerSurvey,
    getSurveyByTemplateId,
    getAnsweredSurveysByTemplateId,
    getSurveys,
    getTemplateAnalytics,
  };
};
