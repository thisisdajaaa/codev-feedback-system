import Image from "next/image";
import React, { FC } from "react";

import { Modal } from "./Modal";
import type { DeleteModalProps } from "./types";
import { Button } from "../Button";
import { Typography } from "../Typography";

const DeleteModal: FC<DeleteModalProps> = ({
  open,
  handleClose,
  handleDeleteFunction,
  title = "Are you sure you want to delete this?",
  primaryLabel = "Confirm",
  secondaryLabel = "Cancel",
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
          {title}
        </Typography>
      </div>

      <div className="flex items-center justify-center gap-[1.75rem]">
        <Button
          onClick={handleDeleteFunction}
          variant="warning"
          className="min-w-[6.875rem] text-[0.875rem] font-semibold"
        >
          <span className="inline-block w-full text-center">
            {primaryLabel}
          </span>
        </Button>
        <Button
          onClick={handleClose}
          className="min-w-[6.875rem] border border-gray-100 bg-gray-100 text-[0.875rem] font-semibold text-gray-500 hover:bg-gray-200 hover:text-gray-500 active:bg-gray-200"
        >
          <span className="inline-block w-full text-center">
            {secondaryLabel}
          </span>
        </Button>
      </div>
    </Modal>
  );
};

export default DeleteModal;
