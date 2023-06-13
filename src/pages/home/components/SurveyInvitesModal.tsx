import React, { FC, useEffect, useState } from "react";

import { Button } from "@/components/Button";
import { Icon } from "@/components/Icon";
import { Input } from "@/components/Input";
import { InputVariations } from "@/components/Input/config";
import { Modal } from "@/components/Modal";
import { Typography } from "@/components/Typography";

import { sendSurveyInvitesAPI } from "@/api/surveys";
import { getUserAPI } from "@/api/users";

import type { SurveyInvitesModalProps, SurveyInviteState } from "../types";

const SurveyInvitesModal: FC<SurveyInvitesModalProps> = (props) => {
  const { open, templateId, setShowInviteDialog } = props;
  const [inviteState, setInviteState] = useState<SurveyInviteState>({
    allowAdd: false,
    email: "",
    addedEmails: [],
  });

  useEffect(() => {
    const search = async (email: string) => {
      const result = await getUserAPI(email);
      const user = result.data?.find((x) => x.email === email);
      if (user) {
        setInviteState({ ...inviteState, allowAdd: true });
      } else {
        setInviteState({ ...inviteState, allowAdd: false });
      }
    };

    const timeoutId = setTimeout(() => {
      if (
        inviteState.email.length > "@codev.com".length &&
        !inviteState.addedEmails.includes(inviteState.email)
      ) {
        search(inviteState.email);
      } else {
        setInviteState({ ...inviteState, allowAdd: false });
      }
    }, 500);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [inviteState]);

  const handleSendInvites = async () => {
    const result = await sendSurveyInvitesAPI(
      templateId,
      inviteState.addedEmails
    );
    if (result.success) {
      setShowInviteDialog(false);
    }
  };

  const handleEmailChange = async (value: string) => {
    setInviteState({ ...inviteState, email: value });
  };

  const handleAddEmail = () => {
    const { email, addedEmails } = inviteState;
    if (email) {
      addedEmails.push(email);
      setInviteState({
        ...inviteState,
        ...{ allowAdd: false, addedEmails, email: "" },
      });
    }
  };

  const handleRemoveEmail = (email: string) => {
    const addedEmails = inviteState.addedEmails.filter((x) => x !== email);
    setInviteState({ ...inviteState, addedEmails });
  };

  return (
    <Modal
      open={open}
      handleClose={() => setShowInviteDialog(false)}
      size="sm"
      title="Send Survey Invites"
      contentClassName="p-0"
      scrollable
      className="max-h-[40rem] min-h-[25rem] bg-gray-100"
    >
      <div className="flex flex-col px-7 pt-8 pb-[1.813rem]">
        <div className="mb-[0.688rem] flex gap-20 rounded-2xl bg-white px-[0.938rem] py-5">
          <div className="flex w-16 gap-[0.688rem]">
            <Typography
              variant="h4"
              color="text-gray-700"
              size="text-base"
              lineHeight="leading-[1.5rem]"
              className="text-base font-semibold sm:px-0"
            >
              Email
            </Typography>
          </div>
          <div className="flex w-80 flex-row gap-[0.688rem]">
            <Input
              type="text"
              name="email"
              value={inviteState.email}
              autoComplete="off"
              variation={InputVariations.Solid}
              containerClassName="p-0 mb-[0.688rem]"
              inputClassName="text-[1.2rem] font-bold p-0"
              onChange={(e) => {
                handleEmailChange(e.target.value);
              }}
            />
            <div>
              <Button
                className="border-none px-2 sm:px-2"
                onClick={handleAddEmail}
                disabled={!inviteState.allowAdd}
              >
                <div className="text-xl">
                  <Icon src="/assets/add-thick.svg" />
                </div>
              </Button>
            </div>
          </div>
        </div>
        {inviteState.addedEmails.length > 0 && (
          <div className="flex gap-6 rounded-2xl bg-white px-5 py-[1.125rem]">
            <div className="flex w-28 flex-col gap-[0.688rem]">
              <Typography
                variant="h4"
                color="text-gray-700"
                size="text-base"
                lineHeight="leading-[1.5rem]"
                className="text-base font-semibold sm:px-0"
              >
                Mailing List
              </Typography>
            </div>

            <div className="flex flex-col gap-1">
              {inviteState.addedEmails.map((item, index) => (
                <div key={index} className="flex w-80 flex-row gap-6">
                  <Typography
                    variant="div"
                    color="text-gray-700"
                    size="text-base"
                    lineHeight="leading-[1.5rem]"
                    className="mt-1 w-80 text-base font-semibold sm:px-0"
                  >
                    {item}
                  </Typography>
                  <div>
                    <Button
                      className="border-none bg-red-500 px-2 hover:bg-red-500 sm:px-2"
                      onClick={() => handleRemoveEmail(item)}
                    >
                      <div className="text-xl">
                        <Icon src="/assets/trash.svg" />
                      </div>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        <div>
          <div className="mt-10 flex justify-end">
            <Button
              className="rounded-[0.938rem]"
              onClick={handleSendInvites}
              disabled={inviteState.addedEmails.length === 0}
            >
              <Typography
                variant="span"
                size="text-lg"
                lineHeight="leading-[1.688rem]"
                textAlign="text-left"
                color="text-white"
                className="font-bold"
              >
                Invite
              </Typography>
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export { SurveyInvitesModal };
