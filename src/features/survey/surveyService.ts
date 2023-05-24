import Survey from "@/models/Survey";

import type { ICreateSurveyRequest, IGetSurveyRequest, PickedSurvey } from "@/features/survey/types";
import { advancedResults } from "@/utils/advancedResults";
import { ISurvey, ISurveyAnswer } from "@/models/Survey/types";
import SurveyCoverage from "@/models/SurveyCoverage";
import { ISurveyCoverage } from "@/models/SurveyCoverage/types";
import { ITemplate } from "@/models/Template/types";
import { GetQuestionnaireResponse } from "../questionnaire/types";
import Template from "@/models/Template";
import { NextApiRequest } from "next";

export const SurveyService = () => {
  const getSurvey = async (req: IGetSurveyRequest) => {
    const { coverageId, userId } = req;

    const coverage: ISurveyCoverage = await SurveyCoverage.findById(coverageId).lean().exec();
    const survey: ISurvey = await Survey.findOne({coverageID: coverageId, answeredBy: userId}).lean().exec();
    const template: ITemplate = await Template.findById(coverage.templateID).lean().exec();

    const result = {
      coverageID: coverageId,
      answeredBy: userId,
      surveyAnswers: template.questions.map(x => {
        const surveyAnswer = survey.surveyAnswers.find(a => a.title === x.title);
        return { 
          title: x.title, 
          type: x.type, 
          asnwer: surveyAnswer?.answer,
          comment: surveyAnswer?.comment
        };}),
    }

    //todo: we will populate the answers using Survey collection
   return result;
  };

  const createSurvey = async (req: ICreateSurveyRequest) => {
    let survey:ISurvey = await Survey.findOne({coverageID: req.coverageId, answeredBy: req.userId}).exec();

    if (!survey){
      const newSurvey = {
        coverageID: req.coverageId,
        answeredBy: req.userId,
        surveyAnswers: [{title:req.title, answer: req.answer, comment: req.comment}],
        dateSubmitted: (new Date()).toISOString()
      };
      survey = await Survey.create(newSurvey);
    }else{
      const item = survey.surveyAnswers.find(x => x.title === req.title);
      if (item){
        item.answer = req.answer;
        item.comment = req.comment;
      }else{
        survey.surveyAnswers.push({title:req.title, answer: req.answer, comment: req.comment} as ISurveyAnswer);
      }
      survey.save();
    }
   return survey;
  };

  return { createSurvey, getSurvey};
};
