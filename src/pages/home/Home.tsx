import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useCallback, useState } from "react";

import logger from "@/utils/logger";
import { withAuth } from "@/utils/withAuth";
import { useMount } from "@/hooks";

import { AlertBanner } from "@/components/AlertBanner";
import { Typography } from "@/components/Typography";

import { getSampleMethodAPI } from "@/api/sample";

const HomePage: NextPage = () => {
  const { data } = useSession();
  const [showAlert, setShowAlert] = useState<boolean>(true);

  const handleLoad = useCallback(async () => {
    const { success, message } = await getSampleMethodAPI();

    if (success) logger(message);
  }, []);

  useMount(() => {
    handleLoad();
  });

  const firstName = data?.user?.name?.split(" ")[0];

  const renderAlertMessage = (
    <div className="flex flex-col gap-1 sm:flex-row">
      <Typography preset="regular" className="text-center">
        Hi {firstName}!
      </Typography>
      <Typography preset="regular">Welcome to the Feedback System</Typography>
    </div>
  );

  return (
    <div className="sm:px-[2rem]">
      <AlertBanner
        open={showAlert}
        message={renderAlertMessage}
        type="info"
        className="mt-2 sm:mt-[18px]"
        handleClose={() => setShowAlert(false)}
      />
    </div>
  );
};

export default withAuth(HomePage);
