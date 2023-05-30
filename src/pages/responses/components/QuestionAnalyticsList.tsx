import { Typography } from "@/components/Typography";
import React, { FC, useCallback, useEffect, useState } from "react";
import type { QuestionAnalyticsListProps } from "../types";
import { AnalyticsResponse } from "@/features/survey/types";
import { getSurveyAnalyticsByTemplateAPI } from "@/api/surveys";
import { PieChart } from "@/components/PieChart";

const QuestionAnalyticsList: FC<QuestionAnalyticsListProps> = (props) => {
  const { selectedSurvey } = props;

  const [analyticsList, setAnalyticsList] = useState<AnalyticsResponse>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleFetchData = useCallback(async () => {
    setIsLoading(true);

    const { success, data } = await getSurveyAnalyticsByTemplateAPI(
      selectedSurvey
    );

    if (success) {
      setAnalyticsList(data || []);
    }

    setIsLoading(false);
  }, [selectedSurvey]);

  useEffect(() => {
    handleFetchData();
  }, [handleFetchData]);

  return (
    <div className="mx-[10px] mt-[28.5px] max-w-screen-2xl overflow-x-auto rounded-2xl bg-white pt-[1.063rem] pb-[3.375rem] shadow-md sm:mx-0 sm:px-6">
      {/* <Typography
        variant="h2"
        color="text-gray-600"
        size="text-lg"
        className="mb-[1.188rem] px-2 font-semibold sm:px-0">
        Q1
      </Typography>

       */}

      <div className="flex justify-center">
        {analyticsList.map((data, index) => (
          <PieChart
            key={index}
            questionName={data.questionName}
            data={data.responses}
          />
        ))}
      </div>
    </div>
  );
};

export { QuestionAnalyticsList };
