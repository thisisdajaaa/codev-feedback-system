import clsx from "clsx";
import moment from "moment";
import React, { FC, useCallback, useEffect, useState } from "react";

import { Loading } from "@/components/Loading";
import { Modal } from "@/components/Modal";
import { Typography } from "@/components/Typography";

import { getSurveyDetailsByUserAPI } from "@/api/surveys";
import { SurveyDetailsByUserResponse } from "@/features/survey/types";

import type { ResponseModalProps } from "../types";

const ResponseModal: FC<ResponseModalProps> = (props) => {
  const { open, selectedUser, selectedSurvey, handleClose } = props;

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [userData, setUserData] = useState<SurveyDetailsByUserResponse | null>(
    null
  );

  const handleFetch = useCallback(async () => {
    setIsLoading(true);

    const { success, data } = await getSurveyDetailsByUserAPI(
      selectedSurvey,
      selectedUser
    );

    if (success) setUserData(data as SurveyDetailsByUserResponse);

    setIsLoading(false);
  }, [selectedSurvey, selectedUser]);

  useEffect(() => {
    if (open && selectedSurvey && selectedUser) handleFetch();
  }, [handleFetch, open, selectedSurvey, selectedUser]);

  return (
    <Modal
      open={open}
      handleClose={handleClose}
      size="sm"
      title={`Response ID: ${selectedUser}`}
      contentClassName="p-0"
      scrollable
      className="max-h-[40rem] min-h-[25rem] bg-gray-100">
      {isLoading ? (
        <Loading height="h-96" />
      ) : (
        <div className="flex flex-col px-7 pt-8 pb-[29px]">
          <div className="mb-[11px] flex gap-2 rounded-2xl bg-white px-[15px] py-5">
            <div className="flex flex-col gap-[11px]">
              <Typography
                variant="h4"
                color="text-gray-700"
                size="text-base"
                lineHeight="leading-[1.5rem]"
                className="font-semibold sm:px-0">
                Name
              </Typography>
              <Typography
                variant="h4"
                color="text-gray-700"
                size="text-base"
                lineHeight="leading-[1.5rem]"
                className="font-semibold sm:px-0">
                Email
              </Typography>
              <Typography
                variant="h4"
                color="text-gray-700"
                size="text-base"
                lineHeight="leading-[1.5rem]"
                className="font-semibold sm:px-0">
                Timestamp
              </Typography>
            </div>

            <div className="flex flex-col gap-[11px]">
              <Typography
                variant="h4"
                color="text-gray-700"
                size="text-base"
                lineHeight="leading-[1.5rem]"
                className={clsx(userData?.isAnonymous && "italic")}>
                {userData?.isAnonymous
                  ? "Anonymous"
                  : userData?.answeredBy.name || "--"}
              </Typography>
              <Typography
                variant="h4"
                color="text-gray-700"
                size="text-base"
                lineHeight="leading-[1.5rem]"
                className={clsx(userData?.isAnonymous && "italic")}>
                {userData?.isAnonymous
                  ? "Anonymous"
                  : userData?.answeredBy.email || "--"}
              </Typography>
              <Typography
                variant="h4"
                color="text-gray-700"
                size="text-base"
                lineHeight="leading-[1.5rem]">
                {moment(userData?.createdAt).format("YYYY-MM-DD HH:mm:ss")}
              </Typography>
            </div>
          </div>

          <div className="flex flex-col gap-[11px] rounded-2xl bg-white px-5 py-[18px]">
            {userData?.surveyAnswers?.map((surveyAnswer, index) => (
              <div
                key={index}
                className="flex w-full rounded-2xl border border-auroMetalSaurus">
                <div className="flex items-center rounded-tl-2xl rounded-bl-2xl border-r border-auroMetalSaurus bg-gray-200 px-4 py-2">
                  <Typography
                    variant="h3"
                    color="text-gray-700"
                    size="text-lg"
                    lineHeight="leading-[1.688rem]"
                    className="font-semibold">
                    Q{index + 1}
                  </Typography>
                </div>
                <div className="flex w-full flex-col">
                  <div className="rounded-tr-2xl border-b bg-gray-200 px-[9px] py-[5px]">
                    <Typography
                      variant="h3"
                      color="text-gray-700"
                      size="text-base"
                      lineHeight="leading-[1.5rem]"
                      className="font-semibold">
                      {surveyAnswer.title}
                    </Typography>
                  </div>

                  <div className="px-[9px] py-[5px]">
                    <Typography
                      variant="h3"
                      color="text-gray-700"
                      size="text-lg"
                      lineHeight="leading-[1.688rem]">
                      {surveyAnswer.answer}
                    </Typography>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </Modal>
  );
};

export { ResponseModal };
