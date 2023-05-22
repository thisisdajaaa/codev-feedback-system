import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useCallback, useState } from "react";

import logger from "@/utils/logger";
import { withAuth } from "@/utils/withAuth";
import { useMount } from "@/hooks";

import { AlertBanner } from "@/components/AlertBanner";
import { Button } from "@/components/Button";
import { Icon } from "@/components/Icon";
import { Table } from "@/components/Table";
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

  const tableData = [
    { id: 1, name: "Item 1", price: "$20" },
    { id: 2, name: "Item 2", price: "$30" },
    { id: 3, name: "Item 3", price: "$40" },
    { id: 4, name: "Item 3", price: "$40" },
  ];

  const tableColumns = [
    { key: "id", title: "ID" },
    { key: "name", title: "Name" },
    { key: "price", title: "Price" },
  ];

  return (
    <div className="m-auto flex max-w-screen-2xl flex-col sm:px-[2rem]">
      <div className="sm:px-[100px]">
        <AlertBanner
          open={showAlert}
          message={renderAlertMessage}
          type="info"
          className="mt-2 sm:mt-[18px]"
          handleClose={() => setShowAlert(false)}
        />
      </div>

      <div className="mt-7 mb-[18px] flex justify-end px-[18px] sm:mb-[39px] sm:px-0">
        <Button
          onClick={() => logger("clicked")}
          className="flex w-full justify-center sm:w-auto">
          <Icon src="/assets/mail.svg" height={20} width={20} />
          <Typography
            variant="span"
            size="text-lg"
            lineHeight="leading-[1.688rem]"
            textAlign="text-left"
            color="text-white"
            className="font-semibold">
            Invite
          </Typography>
        </Button>
      </div>

      <div>
        <Table title="Sample Title" data={tableData} columns={tableColumns} />
      </div>
    </div>
  );
};

export default withAuth(HomePage);
