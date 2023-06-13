import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useMemo, useState } from "react";

import { withAuth } from "@/utils/withAuth";
import { useUserRole } from "@/hooks";

import { AlertBanner } from "@/components/AlertBanner";
import { Typography } from "@/components/Typography";

import { AdminView } from "./components/AdminView";
import { SurveyeeView } from "./components/SurveyeeView";
import { SurveyorView } from "./components/SurveyorView";

const HomePage: NextPage = () => {
  const { data } = useSession();
  const { isAdmin, isSurveyor } = useUserRole();

  const [showAlert, setShowAlert] = useState<boolean>(true);

  const firstName = data?.user?.name?.split(" ")[0];

  const renderAlertMessage = (
    <div className="flex flex-col gap-1 sm:flex-row">
      <Typography preset="regular" className="text-center">
        Hi {firstName}!
      </Typography>
      <Typography preset="regular">Welcome to the Feedback System</Typography>
    </div>
  );

  const renderView = useMemo(() => {
    if (isAdmin) return <AdminView />;
    if (isSurveyor) return <SurveyorView />;

    return <SurveyeeView />;
  }, [isAdmin, isSurveyor]);

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

      {renderView}
    </div>
  );
};

export default withAuth(HomePage);
