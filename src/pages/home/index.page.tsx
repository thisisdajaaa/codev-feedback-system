import type { NextPage } from "next";
import { Fragment, useMemo } from "react";

import { withAuth } from "@/utils/withAuth";
import { useUserRole } from "@/hooks";

import { AdminView } from "./components/AdminView";
import { SurveyorView } from "./components/SurveyorView";

const HomePage: NextPage = () => {
  const { isAdmin, isSurveyor } = useUserRole();

  const renderView = useMemo(() => {
    if (isAdmin) return <AdminView />;
    if (isSurveyor) return <SurveyorView />;

    return <Fragment />;
  }, [isAdmin, isSurveyor]);

  return <Fragment>{renderView}</Fragment>;
};

export default withAuth(HomePage);
