import { NextPage } from "next";
import Image from "next/image";
import { useSession } from "next-auth/react";
import React, { useMemo } from "react";

import { withAuth } from "@/utils/withAuth";
import { useScreenSize } from "@/hooks";

import { BackArrow } from "@/components/BackArrow";
import { Typography } from "@/components/Typography";

const Profile: NextPage = () => {
  const { data } = useSession();
  const { isLargeScreen } = useScreenSize();

  const memoizedAvatarSize = useMemo(
    () => (isLargeScreen ? 200 : 150),
    [isLargeScreen]
  );

  return (
    <div className="m-auto flex max-w-screen-2xl flex-col py-2 px-[1.125rem] sm:py-[1.125rem] sm:px-[2rem]">
      <BackArrow />

      <div className="mt-[1.781rem] flex h-[28.125rem] max-w-screen-2xl flex-col overflow-x-auto rounded-2xl bg-white pt-[1.063rem] pb-[3.375rem] shadow-md sm:mx-0 sm:px-6 md:h-[51.063rem] md:w-[42.5rem] md:self-center md:pt-[1.625rem]">
        <Typography
          variant="h2"
          color="text-gray-600"
          size="text-lg"
          className="mb-[1.188rem] px-2 font-semibold sm:px-0"
        >
          My Profile
        </Typography>
        <div className="flex flex-col items-center">
          <Image
            src={data?.user?.image || "/assets/avatar-placeholder.svg"}
            alt="user-image"
            width={memoizedAvatarSize}
            height={memoizedAvatarSize}
            className="rounded-full"
          />

          <ul className="mt-20 flex flex-col gap-[1.938rem]">
            <li className="flex gap-8">
              <Typography
                variant="span"
                color="text-gray-700"
                size="text-lg"
                className="min-w-[3.188rem] font-medium"
              >
                Name
              </Typography>

              <Typography
                variant="span"
                color="text-gray-700"
                size="text-lg"
                className="font-normal"
              >
                {data?.user?.name || "--"}
              </Typography>
            </li>

            <li className="flex gap-8">
              <Typography
                variant="span"
                color="text-gray-700"
                size="text-lg"
                className="min-w-[3.188rem] font-medium"
              >
                Email
              </Typography>

              <Typography
                variant="span"
                color="text-gray-700"
                size="text-lg"
                className="min-w-[3.188rem] font-normal"
              >
                {data?.user?.email || "--"}
              </Typography>
            </li>

            <li className="flex gap-8">
              <Typography
                variant="span"
                color="text-gray-700"
                size="text-lg"
                className="min-w-[3.188rem] font-medium"
              >
                Role
              </Typography>

              <Typography
                variant="span"
                color="text-gray-700"
                size="text-lg"
                className="font-normal"
              >
                {data?.user?.role || "--"}
              </Typography>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default withAuth(Profile);
