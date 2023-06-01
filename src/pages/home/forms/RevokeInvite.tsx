import Image from "next/image";
import React, { FC } from "react";

import { Button } from "@/components/Button";
import { Modal } from "@/components/Modal";
import { Typography } from "@/components/Typography";

import type { RevokeInviteProps } from "../types";

const RevokeInvite: FC<RevokeInviteProps> = ({
  open,
  handleClose,
  handleRevoke,
}) => {
  return (
    <Modal
      open={open}
      handleClose={handleClose}
      size="xs"
      scrollable={false}
      className="min-h-[18rem]"
    >
      <div className="text-center">
        <Image
          src="/assets/info-gray.svg"
          width={31}
          height={31}
          alt="info gray"
        />
        <Typography
          lineHeight="leading-[1.313rem]"
          textAlign="text-center"
          color="text-gray-500"
          className="mt-3 mb-[2.375rem]"
        >
          Are you sure you want to revoke this surveyor?
        </Typography>
      </div>

      <div className="flex items-center justify-center gap-[1.75rem]">
        <Button
          onClick={handleRevoke}
          variant="warning"
          className="min-w-[6.875rem] text-[0.875rem] font-semibold"
        >
          <span className="inline-block w-full text-center">
            Yes, I&apos;m sure
          </span>
        </Button>
        <Button
          onClick={handleClose}
          className="min-w-[6.875rem] border border-gray-100 bg-gray-100 text-[0.875rem] font-semibold text-gray-500 hover:bg-gray-200 hover:text-gray-500 active:bg-gray-200"
        >
          <span className="inline-block w-full text-center">No, cancel</span>
        </Button>
      </div>
    </Modal>
  );
};

export default RevokeInvite;
