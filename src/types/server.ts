import type { Model } from "mongoose";
import type { NextApiRequest, NextApiResponse } from "next";
import { NextHandler } from "next-connect";

import ErrorHandler from "@/utils/errorHandler";

export type ApiHandler = (
  req: NextApiRequest,
  res: NextApiResponse,
  next: NextHandler
) => Promise<void>;

export type EmailOptions = {
  email: string;
  subject: string;
  html: string;
  attachments?: any;
};

export type PageItem = {
  page: number;
  limit: number;
};

export type Pagination = {
  next?: PageItem;
  prev?: PageItem;
};

export type ApiResponse<T> = {
  data?: T;
  success: boolean;
  count?: number;
  total?: number;
  pagination?: Pagination;
  message?: string;
  error?: ErrorHandler;
  stack?: string;
};

export type Populate = {
  path: string;
  select?: string;
  model?: string;
  populate?: Populate | Populate[];
};

export type ValidationRequestOptions = "body" | "query";

export type AdvancedResultsOptions<T> = {
  model: Model<T>;
  req: NextApiRequest;
  strict?: boolean;
  populate?: Populate | Populate[];
  discardQueryList?: string[];
};

export type QueryOptions = {
  page?: number;
  limit?: number;
  sort?: string;
  select?: string;
  filter?: Record<string, unknown>;
};
