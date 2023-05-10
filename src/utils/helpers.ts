import { AxiosError, AxiosRequestConfig } from "axios";
import { FormEvent } from "react";

import { instance } from "@/config";

import { ApiResponse } from "@/types";

import logger from "./logger";

export const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const GeneratePageTitle = (pathname: string) => {
  return pathname
    .substring(pathname.lastIndexOf("/"), pathname.length)
    .replaceAll("/", "")
    .split("-")
    .map((str) => {
      return capitalizeFirstLetter(str);
    })
    .join(" ");
};

export const camelize = (string: string) => {
  return string
    ?.replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
      return index === 0 ? word.toLowerCase() : word.toUpperCase();
    })
    ?.replace(/\s+/g, "");
};

// eslint-disable-next-line @typescript-eslint/no-empty-function
export const noop = () => {};

export const limitInputLength =
  (limit: number) => (event: FormEvent<HTMLInputElement>) => {
    const { currentTarget } = event;

    if (currentTarget.value.length >= limit)
      currentTarget.value = Math.max(0, parseInt(currentTarget.value))
        .toString()
        .slice(0, limit);
  };

export const generateRandomString = (maxLength = 8) => {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < maxLength; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

export const onParseResponse = async <T>(args: AxiosRequestConfig) => {
  let formattedResponse: ApiResponse<T>;

  try {
    const { data } = await instance({ ...args });

    formattedResponse = data;
  } catch (error) {
    const axiosError = error as AxiosError;
    const data = axiosError.response?.data as ApiResponse<T>;

    logger(axiosError);

    formattedResponse = data;
  }

  return formattedResponse;
};
