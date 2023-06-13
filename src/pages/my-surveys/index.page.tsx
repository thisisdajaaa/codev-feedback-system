import type { NextPage } from "next";

import { withAuth } from "@/utils/withAuth";

import { SurveyeeView as SurveyList } from "@/pages/home/components/SurveyeeView";

const HomePage: NextPage = () => {
  return (
    <div className="m-auto flex max-w-screen-2xl flex-col py-2 sm:py-[1.125rem] sm:px-[2rem]">
      <SurveyList />
    </div>
  );
};

export default withAuth(HomePage);
