import { useRouter } from "next/router";
import React, { FC } from "react";

import { Icon } from "../Icon";
import { Typography } from "../Typography";

const BackArrow: FC = () => {
  const router = useRouter();

  return (
    <div
      className="flex cursor-pointer items-center gap-[0.625rem]"
      onClick={router.back}
    >
      <Icon src="/assets/back-arrow.svg" />
      <Typography
        variant="span"
        size="text-base"
        lineHeight="leading-[1.5rem]"
        textAlign="text-left"
        className="font-normal"
      >
        Back
      </Typography>
    </div>
  );
};

export { BackArrow };
