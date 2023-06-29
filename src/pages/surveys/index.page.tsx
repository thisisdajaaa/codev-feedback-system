import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { Fragment } from "react";

import { withAuth } from "@/utils/withAuth";

import { SYSTEM_URL } from "@/constants/pageUrl";

import { Button } from "@/components/Button";
import { Icon } from "@/components/Icon";
import { Typography } from "@/components/Typography";

import { EmployeeList } from "./components/EmployeeList";
import { SurveyCardList } from "./components/SurveyCardList";

const Surveys: NextPage = () => {
  const router = useRouter();

  return (
    <>
      <div className="mt-7 mb-[1.688rem] flex justify-end px-[1.125rem] sm:mb-[2.438rem] sm:px-0 md:mr-4 lg:mr-4">
        <Button
          onClick={() => router.push(SYSTEM_URL.ADD_QUESTIONNAIRE)}
          className="flex gap-0">
          <div className="text-[1.313rem]">
            <Icon src="/assets/add.svg" />
          </div>

          <Typography
            variant="span"
            size="text-lg"
            lineHeight="leading-[1.688rem]"
            textAlign="text-left"
            color="text-white"
            className="font-semibold">
            Survey
          </Typography>
        </Button>
      </div>
      <div className="flex max-w-screen-2xl flex-col py-2 sm:py-[1.125rem] sm:px-[2rem]">
        <Fragment>
          <SurveyCardList />
          <EmployeeList />
        </Fragment>
      </div>
    </>
  );
};

export default withAuth(Surveys);
