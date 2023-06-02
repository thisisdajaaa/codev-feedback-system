import { useSession } from "next-auth/react";
import React, { FC, Fragment, useMemo, useState } from "react";

import { AlertBanner } from "@/components/AlertBanner";
import { Button } from "@/components/Button";
import { Icon } from "@/components/Icon";
import { Pagination } from "@/components/Pagination";
import { SearchBar } from "@/components/SearchBar";
import { SurveyCard } from "@/components/SurveyCard";
import { surveyList } from "@/components/SurveyCard/config";
import { Typography } from "@/components/Typography";

import { INITIAL_PAGE, PAGE_SIZE } from "../config";

const SurveyorView: FC = () => {
  const { data } = useSession();
  const [showAlert, setShowAlert] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(INITIAL_PAGE);

  const firstName = data?.user?.name?.split(" ")[0];
  const handleSearch = (e: string) => {
    // eslint-disable-next-line no-console
    console.log(e);
  };

  const currentSurveyData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PAGE_SIZE;
    const lastPageIndex = firstPageIndex + PAGE_SIZE;

    return surveyList.slice(firstPageIndex, lastPageIndex);
  }, [currentPage]);

  const renderAlertMessage = (
    <div className="flex flex-col gap-1 sm:flex-row">
      <Typography preset="regular" className="text-center">
        Hi {firstName}!
      </Typography>
      <Typography preset="regular">Welcome to the Feedback System</Typography>
    </div>
  );

  return (
    <div className="m-auto flex max-w-screen-2xl flex-col py-2 sm:py-[1.125rem] sm:px-[2rem]">
      <div className="sm:px-[6.25rem]">
        <AlertBanner
          open={showAlert}
          message={renderAlertMessage}
          type="info"
          handleClose={() => setShowAlert(false)}
        />
      </div>
      <div className="mt-7 mb-[1.125rem] flex justify-end px-[1.125rem] sm:mb-[2.438rem] sm:px-0">
        <Button className="flex w-full justify-center sm:w-auto">
          <div className="text-[1.313rem]">
            <Icon src="/assets/plus.svg" />
          </div>

          <Typography
            variant="span"
            size="text-lg"
            lineHeight="leading-[1.688rem]"
            textAlign="text-left"
            color="text-white"
            className="font-semibold"
          >
            Survey
          </Typography>
        </Button>
      </div>
      <SearchBar onSearch={handleSearch} />

      <div className="mx-auto mt-16 w-full max-w-screen-2xl bg-white pt-[1.063rem] pb-[3.375rem] shadow-md sm:rounded-2xl sm:px-6">
        <Typography
          variant="h2"
          color="text-gray-600"
          size="text-lg"
          className="mb-[1.188rem] px-2 font-semibold sm:px-0"
        >
          My Surveys
        </Typography>

        <div className="gap-8 xs:columns-1 md:columns-2 lg:columns-3">
          {currentSurveyData.map((survey, i) => (
            <Fragment key={i}>
              <SurveyCard {...survey} />
            </Fragment>
          ))}
        </div>

        <Pagination
          currentPage={currentPage}
          totalCount={100}
          pageSize={PAGE_SIZE}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    </div>
  );
};

export { SurveyorView };
