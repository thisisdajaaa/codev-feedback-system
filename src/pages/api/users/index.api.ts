import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";

import { ROLES } from "@/models/User/config";

import type { ApiResponse } from "@/types";

import { UserController } from "@/features/user";
import { onError } from "@/middlewares/errors";
import { isAuthenticatedUser } from "@/middlewares/isAuthenticatedUser";
import { mongoHandler } from "@/middlewares/mongodb";
import { roleAtLeast } from "@/middlewares/roleAtLeast";

const handler = nextConnect<
  NextApiRequest,
  NextApiResponse<ApiResponse<unknown>>
>({
  onError,
});

const { handleGetUsers } = UserController();

handler
  .use(isAuthenticatedUser)
  .use(roleAtLeast(ROLES.ADMIN))
  .get(mongoHandler(handleGetUsers));

export default handler;
