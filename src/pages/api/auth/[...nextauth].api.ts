import NextAuth, { type NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

import User from "@/models/User";
import { ROLES } from "@/models/User/config";
import type { IUser } from "@/models/User/types";

import type { PickedUserDetails } from "@/features/auth/types";
import { mongoConnect } from "@/middlewares/mongodb";

const getDbUser = async (email: string): Promise<IUser | null> => {
  await mongoConnect();
  return (await User.findOne({ email: email })) as IUser | null;
};

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],

  secret: process.env.NEXT_AUTH_SECRET,

  session: {
    strategy: "jwt",
  },

  events: {
    signIn: async ({ user }) => {
      const email = user.email as string;
      const dbUser = await getDbUser(email);

      if (dbUser === null) {
        const newUser: Pick<IUser, PickedUserDetails> = {
          email,
          isVerified: false,
          role: ROLES.SURVEYEE,
        };

        await User.create(newUser);
      }
    },
  },

  callbacks: {
    signIn: ({ user }) => {
      if (user.email?.endsWith("codev.com")) {
        return true;
      }

      //Access denied
      return false;
    },
    jwt: async ({ token, user }) => {
      if (user) token.id = user.id;

      //todo: find a more efficient way. if we can find a way not to hit the db, much better.
      const email = token.email as string;
      const dbUser = await getDbUser(email);
      if (dbUser !== null) {
        token.role = dbUser.role;
      }
      //end todo

      return Promise.resolve(token);
    },
    session: async ({ session, token }) => {
      if (token) session.id = token.id;
      session.user.role = token.role as string;
      return session;
    },
  },

  pages: {
    signIn: "/auth/login",
  },
};

export default NextAuth(authOptions);
