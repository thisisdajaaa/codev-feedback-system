import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { FC, Fragment, PropsWithChildren } from "react";

import { useRouteTracking } from "@/hooks";

import { whitelistPaths } from "@/config";

import { AUTH_PAGE_URL } from "@/constants/pageUrl";

import Loading from "../Loading";

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const { status, data: session } = useSession();

  const router = useRouter();

  const onAuthentication = () => {
    if (isAuthenticated) router.replace("/");
    if (isNotAuthenticated) router.replace(AUTH_PAGE_URL.LOGIN);
  };

  const isWhitelistRoute = whitelistPaths.includes(router.pathname);
  const isAuthenticated = session && isWhitelistRoute;
  const isNotAuthenticated = !isWhitelistRoute && status === "unauthenticated";

  const isRouteChange = useRouteTracking(onAuthentication, [
    isNotAuthenticated,
    isAuthenticated,
  ]);

  if ((isRouteChange && isWhitelistRoute) || status === "loading")
    return <Loading />;

  return <Fragment>{children}</Fragment>;
};

export default AuthProvider;
