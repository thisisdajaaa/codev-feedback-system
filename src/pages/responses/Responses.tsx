import { useSession } from "next-auth/react";
import React, { Fragment, useMemo, useState } from "react";

import { withAuth } from "@/utils/withAuth";

import { AlertBanner } from "@/components/AlertBanner";
import { Pagination } from "@/components/Pagination";
import { SurveyCard } from "@/components/SurveyCard";
import { surveyList } from "@/components/SurveyCard/config";
import { Typography } from "@/components/Typography";

const PageSize = 10;

const ResponsesPage = () => {
  const { data } = useSession();
  const [showAlert, setShowAlert] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState(1);

  const firstName = data?.user?.name?.split(" ")[0];

  const renderAlertMessage = (
    <div className="flex flex-col gap-1 sm:flex-row">
      <Typography preset="regular" className="text-center">
        Hi {firstName}!
      </Typography>
      <Typography preset="regular">Welcome to the Feedback System</Typography>
    </div>
  );

  const currentSurveyData = useMemo(() => {
    /* 
      PageSize is to be with how many cards we want to display per page;
      value is only temporary to show UI and functionalities of pagination component
    */

    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;

    return surveyList.slice(firstPageIndex, lastPageIndex);
  }, [currentPage]);

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
          // totalCount to be also replaced with surveyList.length
          totalCount={100}
          // pageSize is determined on how many you want to display
          pageSize={PageSize}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    </div>
  );
};

export default withAuth(ResponsesPage);
