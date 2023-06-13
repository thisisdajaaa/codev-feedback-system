import { NextPage } from "next";
import Image from "next/image";
import { signIn } from "next-auth/react";
import React from "react";

const LoginPage: NextPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-brightGray py-12 px-4 sm:px-6 lg:px-8">
      <div className="flex w-full max-w-screen-lg bg-white xs:flex-col-reverse md:flex-row ">
        <div className="relative xs:h-[27.813rem] sm:w-full md:h-[44.375rem] md:w-1/2">
          <Image
            src="/assets/login-image.svg"
            alt="lady with a laptop"
            layout="fill"
            objectFit="contain"
          />
        </div>

        <div className="xs:p-6 sm:w-full md:w-1/2 md:p-6 lg:p-16">
          <div className="mt-16 xs:mt-4">
            <Image
              src="/assets/codev-logo.svg"
              alt="codev logo"
              width={26}
              height={26}
            />

            <h1 className="mt-3 text-sm font-normal">Sign in to CoDev</h1>
            <h2 className="text-xl font-bold xs:mb-[8.625rem] md:mb-[8.688rem]">
              Feedback System
            </h2>

            <button
              onClick={async () => await signIn("google")}
              className="w-full rounded-3xl bg-blueberry py-2 px-6 text-white xs:mb-6"
            >
              Sign in via Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
