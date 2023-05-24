

import Survey from "@/models/Survey";
import { ISurvey, ISurveyAnswer } from "@/models/Survey/types";
import SurveyCoverage from "@/models/SurveyCoverage";
import { ISurveyCoverage } from "@/models/SurveyCoverage/types";
import Template from "@/models/Template";
import { ITemplate } from "@/models/Template/types";

import type { ICreateSurveyRequest, IGetSurveyRequest } from "@/features/survey/types";


export const SurveyService = () => {
  const getSurvey = async (req: IGetSurveyRequest) => {
    const { coverageId, userId } = req;

    const coverage = (await SurveyCoverage.findById(coverageId)) as ISurveyCoverage | null;
    const survey = (await Survey.findOne({coverageID: coverageId, answeredBy: userId})) as ISurvey | null ;
    const template = (await Template.findById(coverage?.templateID)) as ITemplate | null;

    const result = {
      coverageID: coverageId,
      answeredBy: userId,
      surveyAnswers: template?.questions.map(x => {
        const surveyAnswer = survey?.surveyAnswers.find(a => a.questionId.toString() === x._id.toString());
        return { 
          questionId: x._id,
          title: x.title, 
          type: x.type, 
          answer: surveyAnswer?.answer,
          comment: surveyAnswer?.comment
        };}),
    }

    return result;
  };

  const createSurvey = async (req: ICreateSurveyRequest) => {
    let survey = (await Survey.findOne({coverageID: req.coverageId, answeredBy: req.userId})) as ISurvey | null;

    if (!survey){
      const newSurvey = {
        coverageID: req.coverageId,
        answeredBy: req.userId,
        surveyAnswers: [{questionId:req.questionId, answer: req.answer, comment: req.comment}],
        dateSubmitted: (new Date()).toISOString()
      };
      survey = await Survey.create(newSurvey);
    }else{
      const item = survey.surveyAnswers.find(x => x.questionId.toString() === req.questionId);
      if (item){
        item.answer = req.answer;
        item.comment = req.comment;
      }else{
        survey.surveyAnswers.push({questionId: req.questionId, answer: req.answer, comment: req.comment} as ISurveyAnswer);
      }
      await survey.save();
    }
   return survey;
  };

  return { createSurvey, getSurvey};
};
