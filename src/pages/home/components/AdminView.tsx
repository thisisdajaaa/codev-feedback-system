import Image from "next/image";
import { useSession } from "next-auth/react";
import { FC, useCallback, useMemo, useState } from "react";

import { useMount } from "@/hooks";

import { AlertBanner } from "@/components/AlertBanner";
import { Button } from "@/components/Button";
import { Icon } from "@/components/Icon";
import { Table } from "@/components/Table";
import { Typography } from "@/components/Typography";

import { getSurveyorsAPI, revokeSurveyorAPI } from "@/api/users";
import { ICommonSurveyorRequest } from "@/features/auth/types";
import type { SingleUserResponse, UserResponse } from "@/features/user/types";

import { InviteForm } from "../forms/InviteForm";
import RevokeInvite from "../forms/RevokeInvite";

const AdminView: FC = () => {
  const { data } = useSession();
  const [users, setUsers] = useState<UserResponse>([]);
  const [showAlert, setShowAlert] = useState<boolean>(true);
  const [showInvite, setShowInvite] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showRevokeModal, setShowRevokeModal] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<string>("");

  const handleLoad = useCallback(async () => {
    setIsLoading(true);

    const { success, data: response } = await getSurveyorsAPI();

    if (success) setUsers(response as UserResponse);

    setIsLoading(false);
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

  const handleRevoke = useCallback(
    async (userId: string) => {
      const request: ICommonSurveyorRequest["body"] = {
        userId,
      };

      const { success } = await revokeSurveyorAPI(request);

      if (success) {
        handleLoad();
        setShowRevokeModal(false);
      }
    },
    [handleLoad]
  );

  const { tableColumns, tableData } = useMemo(() => {
    const renderSurveyor = (user: SingleUserResponse) => {
      const { image, name, email } = user;

      return (
        <div className="flex items-center space-x-4 px-[1.125rem]">
          <Image
            src={image || "/assets/avatar-placeholder.svg"}
            width={28}
            height={28}
            className="rounded-full"
            alt="avatar"
          />

          <div>
            <Typography preset="regular">{name || "--"}</Typography>

            <Typography
              variant="p"
              size="text-sm"
              lineHeight="leading-[1.313rem]"
              color="text-gray-500">
              {email}
            </Typography>
          </div>
        </div>
      );
    };

    const renderBtnRevoke = (userId: string) => {
      return (
        <div className="px-[1.125rem]">
          <Button
            onClick={() => {
              setSelectedUser(userId);
              setShowRevokeModal(true);
            }}
            variant="warning"
          >
            <Icon src="/assets/trash.svg" />
            <Typography
              variant="p"
              size="text-base"
              lineHeight="leading-[1.5rem]"
              color="text-white"
              className="hidden font-normal sm:inline">
              Revoke
            </Typography>
          </Button>
        </div>
      );
    };

    const tableData = users.map((user) => ({
      id: user.id,
      surveyor: renderSurveyor(user),
      btnRevoke: renderBtnRevoke(user.id),
    }));

    const tableColumns = [
      { key: "surveyor", title: "Surveyor" },
      { key: "btnRevoke", title: "Revoke" },
    ];

    return { tableData, tableColumns };
  }, [users]);

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
        <Button
          onClick={() => setShowInvite(true)}
          className="flex w-full justify-center sm:w-auto">
          <div className="text-[1.313rem]">
            <Icon src="/assets/mail.svg" />
          </div>

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

      <InviteForm
        open={showInvite}
        handleClose={() => setShowInvite(false)}
        handleRefetch={handleLoad}
      />

      <RevokeInvite
        open={showRevokeModal}
        handleClose={() => setShowRevokeModal(false)}
        handleRevoke={() => handleRevoke(selectedUser)}
      />

      <div>
        <Table
          title="Manage Surveyors"
          data={tableData}
          columns={tableColumns}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export { AdminView };
