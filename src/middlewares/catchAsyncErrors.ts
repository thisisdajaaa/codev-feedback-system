import type { NextApiRequest, NextApiResponse } from "next";
import { NextHandler } from "next-connect";

import type { ApiHandler } from "@/types";

export const catchAsyncErrors =
  (func: ApiHandler) =>
  (req: NextApiRequest, res: NextApiResponse, next: NextHandler) => {
    Promise.resolve(func(req, res, next)).catch(next);
  };
