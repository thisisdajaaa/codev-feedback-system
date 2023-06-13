import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useCallback, useState } from "react";

import { useMount } from "@/hooks";

import { AUTH_PAGE_URL } from "@/constants/pageUrl";

import { Button } from "@/components/Button";
import { Icon } from "@/components/Icon";
import { Loading } from "@/components/Loading";
import { Typography } from "@/components/Typography";

import { acceptSurveyorInvitationAPI } from "@/api/auth";
import type { ICommonSurveyorRequest } from "@/features/auth/types";

const SurveyorInvitation: NextPage = () => {
  const router = useRouter();

  const { id } = router.query;

  const [email, setEmail] = useState<string>("");
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleAcceptVerification = useCallback(async () => {
    const request: ICommonSurveyorRequest["body"] = {
      userId: String(id),
    };

    setIsLoading(true);

    const { success, data } = await acceptSurveyorInvitationAPI(request);

    if (!success) {
      setIsSuccess(false);
      setIsLoading(false);
      return;
    }

    setIsSuccess(true);
    setIsLoading(false);
    setEmail(String(data));
  }, [id]);

  useMount(() => {
    handleAcceptVerification();
  });

  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex flex-1 flex-col md:flex-row">
        <main className="flex-1 overflow-x-auto bg-brightGray transition-all duration-200 ease-in-out">
          <div className="grid h-screen place-content-center">
            <div className="flex flex-col items-center bg-white px-5 pt-[1.625rem] pb-[3.563rem] md:w-[31.625rem] md:rounded-[1.125rem]">
              {isLoading ? (
                <Loading height="h-96" />
              ) : (
                <>
                  <div className="mb-[2.938rem] flex w-full items-center justify-between">
                    <div className="text-[2rem]">
                      <Icon src="/assets/codev-logo.svg" />
                    </div>

                    {isSuccess ? (
                      <Typography
                        variant="h1"
                        size="text-2xl"
                        lineHeight="leading-[1.816rem]"
                        color="text-green-500"
                        className="font-bold"
                      >
                        Account Verified
                      </Typography>
                    ) : (
                      <Typography
                        variant="h1"
                        size="text-2xl"
                        lineHeight="leading-[1.816rem]"
                        color="text-red-400"
                        className="font-bold"
                      >
                        Verification Failed
                      </Typography>
                    )}

                    <div />
                  </div>

                  <div className="text-[2rem]">
                    <Icon
                      src={
                        isSuccess ? "/assets/success.svg" : "/assets/error.svg"
                      }
                    />
                  </div>

                  {isSuccess ? (
                    <>
                      <Typography
                        variant="h2"
                        size="text-2xl"
                        lineHeight="leading-[1.816rem]"
                        color="text-gray-600"
                        className="my-[2.875rem] font-semibold"
                      >
                        Hi, {email}!
                      </Typography>

                      <Typography
                        variant="p"
                        size="text-xl"
                        lineHeight="leading-[1.501rem]"
                        textAlign="text-center"
                        color="text-gray-600"
                        className="mb-[4.125rem] px-5"
                      >
                        Your email has been successfully verified and your
                        account is now active. Please use the link below to
                        login to your account. Thank you!
                      </Typography>

                      <Button
                        className="rounded-none"
                        onClick={() => router.push(AUTH_PAGE_URL.LOGIN)}
                      >
                        <Typography
                          variant="p"
                          size="text-xl"
                          lineHeight="leading-[1.361rem]"
                          textAlign="text-center"
                          color="text-white"
                          className="font-semibold uppercase"
                        >
                          Login to your account
                        </Typography>
                      </Button>
                    </>
                  ) : (
                    <Typography
                      variant="p"
                      size="text-xl"
                      lineHeight="leading-[1.501rem]"
                      textAlign="text-center"
                      color="text-gray-600"
                      className="my-[2.875rem] px-5"
                    >
                      There was a problem verifying your email. Please{" "}
                      <Typography
                        variant="span"
                        size="text-xl"
                        lineHeight="leading-[1.501rem]"
                        textAlign="text-center"
                        color="text-gray-600"
                        className="font-bold"
                      >
                        Contact Support.
                      </Typography>
                    </Typography>
                  )}
                </>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SurveyorInvitation;
