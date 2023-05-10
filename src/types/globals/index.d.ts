import "next";
import "next-auth";

declare module "next" {
  interface NextApiRequest extends NextApiRequest {
    user: {
      id: string;
    };
  }
}

declare module "next-auth" {
  interface User extends AuthUser {
    id: string;
  }

  interface Session {
    user: {
      id: string;
    };
  }
}

import "redux";
