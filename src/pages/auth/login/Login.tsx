import { NextPage } from "next";
import Image from "next/image";
import { signIn } from "next-auth/react";
import React from "react";

const LoginPage: NextPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#EAEBEE] py-12 px-4 sm:px-6 lg:px-8">
      <div className="flex w-full max-w-screen-lg bg-white xs:flex-col-reverse md:flex-row ">
        <div className="relative xs:h-[445px] sm:w-full md:h-[710px] md:w-1/2">
          <Image
            src="/assets/login-img.png"
            alt="lady with a laptop"
            layout="fill"
            objectFit="cover"
          />
        </div>

        <div className="xs:p-6 sm:w-full md:w-1/2 md:p-6 lg:p-16">
          <div className="mt-16 xs:mt-4">
            <Image
              src="/assets/codev-logo.png"
              alt="codev logo"
              width={26}
              height={26}
            />

            <h1 className="mt-3">Sign in to CoDev</h1>
            <h2 className="text-2xl font-bold xs:mb-24 md:mb-36">
              Feedback System
            </h2>

            <button
              onClick={async () => await signIn("google")}
              className="w-full rounded-3xl bg-[#3B82F6] py-2 px-6 text-white xs:mb-6"
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
