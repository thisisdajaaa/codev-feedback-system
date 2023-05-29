import type { NextApiRequest } from "next/types";

import { advancedResults } from "@/utils/advancedResults";
import ErrorHandler from "@/utils/errorHandler";

import { QuestionType } from "@/constants/questionType";
import { StatusCodes } from "@/constants/statusCode";

import Survey from "@/models/Survey";
import type { ISurvey, ISurveyAnswer } from "@/models/Survey/types";
import SurveyCoverage from "@/models/SurveyCoverage";
import type { ISurveyCoverage } from "@/models/SurveyCoverage/types";
import Template from "@/models/Template";
import type { ITemplate } from "@/models/Template/types";

import type { AdvancedResultsOptions, Populate } from "@/types";

import type {
  IAnswerSurveyRequest,
  IGetSurveyRequest,
  IGetSurveyResponse,
  IViewSurveAnswer,
  SurveysResponse,
} from "@/features/survey/types";

import { SURVEY_MESSAGES } from "./config";
import { SurveyCoverageService } from "../questionnaire/surveyCoverageService";

export const SurveyService = () => {
  const { isTitleExistInSurveyCoverage } = SurveyCoverageService();

  const getSurveyByCoverageId = async (
    req: IGetSurveyRequest["body"]
  ): Promise<IGetSurveyResponse> => {
    const { coverageId, userId, title } = req;

    const coverage = (await SurveyCoverage.findById(
      coverageId
    )) as ISurveyCoverage | null;
    const survey = (await Survey.findOne({
      coverageID: coverageId,
      answeredBy: userId,
    })) as ISurvey | null;
    const template = (await Template.findById(
      coverage?.templateID
    )) as ITemplate | null;

    const data: IGetSurveyResponse = {
      coverageID: coverageId,
      answeredBy: survey?.answeredBy || userId,
      surveyAnswers: template?.questions
        .filter(
          (f) => f.title.toLowerCase().includes(title?.toLowerCase()) || !title
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
    const { coverageId } = req.query;

    const { answer, questionId, comment } = req.body;

    const userId = req.user.id;

    let survey = (await Survey.findOne({
      coverageID: coverageId,
      answeredBy: userId,
    })) as ISurvey | null;

    const isTitleExist = await isTitleExistInSurveyCoverage(
      String(coverageId),
      questionId
    );

    if (!isTitleExist)
      throw new ErrorHandler(
        SURVEY_MESSAGES.ERROR.QUESTION_NOT_FOUND,
        StatusCodes.NOT_FOUND
      );

    if (!survey) {
      const newSurvey = {
        coverageID: coverageId,
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

  const getSurveys = async (req: NextApiRequest) => {
    const populateFields: Populate[] = [
      {
        path: "templateID",
        model: "Template",
        select: "title description createdBy",
        populate: {
          path: "createdBy",
          model: "User",
          select: "email role",
        },
      },
      {
        path: "surveys",
        model: "Survey",
        select: "answeredBy surveyAnswers isAnonymous status dateSubmitted",
        populate: {
          path: "answeredBy",
          model: "User",
          select: "email role",
        },
      },
    ];

    const options: AdvancedResultsOptions<ISurveyCoverage> = {
      model: SurveyCoverage,
      req,
      strict: false,
      populate: populateFields,
    };

    return await advancedResults<ISurveyCoverage, any>(options);
  };

  return { answerSurvey, getSurveyByCoverageId, getSurveys };
};
