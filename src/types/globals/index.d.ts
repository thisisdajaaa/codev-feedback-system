import "next";
import "next-auth";

import type { IUser } from "@/models/User/types";

type GoogleAuthUser = {
  id: string;
  name: string;
  email: string;
  image: string;
};

declare module "next" {
  interface NextApiRequest extends NextApiRequest {
    user: IUser;
  }
}

declare module "next-auth" {
  interface Session {
    user: GoogleAuthUser;
  }
}

import "redux";
