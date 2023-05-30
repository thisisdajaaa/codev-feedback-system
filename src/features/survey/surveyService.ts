import type { NextApiRequest } from "next/types";

import { QueryBuilder } from "@/utils/advancedResults";
import ErrorHandler from "@/utils/errorHandler";

import { QuestionType } from "@/constants/questionType";
import { StatusCodes } from "@/constants/statusCode";

import Survey from "@/models/Survey";
import type { ISurvey, ISurveyAnswer } from "@/models/Survey/types";
import Template from "@/models/Template";
import type { ITemplate } from "@/models/Template/types";
import User from "@/models/User/User";

import type { Populate } from "@/types";

import type {
  GetSurveysResponse,
  IAnswerSurveyRequest,
  IGetSurveyResponse,
  IViewSurveAnswer,
  SingleSurveyResponse,
} from "@/features/survey/types";

import { SURVEY_MESSAGES } from "./config";
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

  return {
    answerSurvey,
    getSurveyByTemplateId,
    getAnsweredSurveysByTemplateId,
    getSurveys,
  };
};
