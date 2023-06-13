import moment from "moment";

import { SurveyStatus } from "@/models/Survey/config";
import Template from "@/models/Template";

export const CronService = () => {
  const updateDueQuestionnaires = async (): Promise<void> => {
    const currentDate = moment().toISOString();
    const templates = await Template.find({ dateTo: { $lt: currentDate } });

    for (const template of templates) {
      template.status = SurveyStatus.FINISHED;
      await template.save();
    }
  };

  return { updateDueQuestionnaires };
};
