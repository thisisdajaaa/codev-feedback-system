import { NextPage } from "next";
import { signIn } from "next-auth/react";
import React, { useCallback, useEffect, useState } from "react";

import logger from "@/utils/logger";

import Button from "@/components/Button";

import { getSampleMethodAPI } from "@/services/sample";

import type { UserForm } from "./types";

const LoginPage: NextPage = () => {
  const [userInfo, setUserInfo] = useState<UserForm>({
    accountNum: "",
    email: "",
    password: "",
  });

  const handleLoad = useCallback(async () => {
    const { success, message } = await getSampleMethodAPI();

    if (success) logger(message);
  }, []);

  useEffect(() => {
    handleLoad();
  }, [handleLoad]);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (
    event
  ) => {
    // validate your userinfo
    event.preventDefault();

    const res = await signIn("credentials", {
      email: userInfo.email,
      password: userInfo.password,
      redirect: false,
    });

    logger(res);
  };

  const handleChange =
    (key: keyof UserForm) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setUserInfo((prev) => ({
        ...prev,
        [key]: event.target.value,
      }));
    };

  return (
    <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Sign in
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm">
            <div className="mb-4">
              <label htmlFor="account-number" className="sr-only">
                Account number
              </label>
              <input
                id="account-number"
                name="account-number"
                type="number"
                value={userInfo.accountNum}
                required
                onChange={handleChange("accountNum")}
                className="relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                placeholder="Account number"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                value={userInfo.email}
                autoComplete="email"
                required
                onChange={handleChange("email")}
                className="relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                placeholder="Email address"
              />
            </div>

            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={userInfo.password}
                onChange={handleChange("password")}
                autoComplete="current-password"
                required
                className="relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-900"
              >
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <a
                href="#"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Forgot your password?
              </a>
            </div>
          </div>

          <div>
            <Button type="submit" className="w-full justify-center">
              Sign in
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
