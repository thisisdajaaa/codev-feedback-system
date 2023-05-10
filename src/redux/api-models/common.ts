import { AxiosError } from "axios";

export type ResponseError = AxiosError;

export type ResponseState<T> = {
  response: T;
  isLoading: boolean;
  error?: ResponseError;
};
