import NextAuth, { type NextAuthOptions, type User } from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";

const mockUserData: User[] = [
  {
    id: "1",
    accountNum: "1234",
    email: "test@test.com",
    name: "Test User",
  },
];

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialProvider({
      name: "credentials",
      credentials: {
        accountNum: { label: "Account number", type: "text" },
        email: { label: "Email address", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: (credentials) => {
        // database look up
        const user = mockUserData.find(
          (user) => credentials && user.email === credentials["email"]
        );

        if (!user) return null;

        return user;
      },
    }),
  ],

  secret: process.env.NEXT_AUTH_SECRET,

  session: {
    strategy: "jwt",
  },

  callbacks: {
    jwt: ({ token, user }) => {
      if (user) token.id = user.id;
      return token;
    },
    session: ({ session, token }) => {
      if (token) session.id = token.id;
      return session;
    },
  },

  pages: {
    signIn: "auth/login",
  },
};

export default NextAuth(authOptions);
