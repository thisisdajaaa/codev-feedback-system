import type { NextPage } from "next";
import { Fragment, useMemo } from "react";

import { withAuth } from "@/utils/withAuth";
import { useUserRole } from "@/hooks";

import { Card } from "@/components/Card";
import { surveyList } from "@/components/Card/config";

import { AdminView } from "./components/AdminView";

const HomePage: NextPage = () => {
  const { isAdmin } = useUserRole();

  const renderView = useMemo(() => {
    if (isAdmin) return <AdminView />;

    return <Fragment />;
  }, [isAdmin]);

  return (
    <Fragment>
      {renderView}
      {surveyList.map((survey, i) => (
        <Fragment key={i}>
          <Card {...survey} />
        </Fragment>
      ))}
    </Fragment>
  );
};

export default withAuth(HomePage);
