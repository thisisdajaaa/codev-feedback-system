import { debounce } from "lodash";
import React, { FC, useRef, useState } from "react";

import { Button } from "@/components/Button";
import { Icon } from "@/components/Icon";
import { Modal } from "@/components/Modal";
import { Typography } from "@/components/Typography";

import { sendSurveyInvitesAPI } from "@/api/surveys";
import { getUserAPI } from "@/api/users";

import type { SurveyInvitesModalProps, SurveyInviteState } from "../types";

const SurveyInvitesModal: FC<SurveyInvitesModalProps> = (props) => {
  const { open, templateId, setShowInviteDialog } = props;
  const [inviteState, setInviteState] = useState<SurveyInviteState>({
    email: "",
    addedEmails: [],
  });
  const [allowAdd, setAllowAdd] = useState<boolean>(false);

  const debouncedHandleCall = useRef(
    debounce(async (email: string) => {
      if (email) {
        const result = await getUserAPI(email);
        const user = result.data?.find((x) => x.email === email);
        if (user) {
          setAllowAdd(true);
        } else {
          setAllowAdd(false);
        }
      } else {
        setAllowAdd(false);
      }
    }, 500)
  );

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
    debouncedHandleCall.current.cancel();
    debouncedHandleCall.current(value);
  };

  const handleAddEmail = () => {
    const { email, addedEmails } = inviteState;
    if (email) {
      addedEmails.push(email);
      setInviteState({ ...inviteState, ...{ addedEmails, email: "" } });
      setAllowAdd(false);
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
        <div className="mb-[0.688rem] flex gap-2 rounded-2xl bg-white px-[0.938rem] py-5">
          <div className="flex flex-col gap-[0.688rem]">
            <Typography
              variant="h4"
              color="text-gray-700"
              size="text-base"
              lineHeight="leading-[1.5rem]"
              className="font-semibold sm:px-0"
            >
              Email
            </Typography>
          </div>

          <div
            className="flex flex-col gap-[0.688rem]"
            style={{ display: "inline" }}
          >
            <input
              type="text"
              name="email"
              value={inviteState.email}
              autoComplete="off"
              className="p-0 text-[1.2rem]"
              onChange={(e) => {
                handleEmailChange(e.target.value);
              }}
            />

            <div style={{ display: "inline" }}>
              <Button
                className="px-2 sm:px-2"
                onClick={handleAddEmail}
                disabled={!allowAdd}
              >
                <div className="text-xl">
                  <Icon src="/assets/add.svg" />
                </div>
              </Button>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-[0.688rem] rounded-2xl bg-white px-5 py-[1.125rem]">
          <div>
            <ul>
              {inviteState.addedEmails.map((item, index) => (
                <li key={index} style={{ width: "100%" }}>
                  {item}
                  <div style={{ display: "inline" }}>
                    <Button
                      className="px-2 sm:px-2"
                      onClick={() => handleRemoveEmail(item)}
                    >
                      <div className="text-xl">
                        <Icon src="/assets/trash.svg" />
                      </div>
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
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
