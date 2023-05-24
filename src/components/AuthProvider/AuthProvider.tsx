import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { FC, Fragment, PropsWithChildren, useMemo } from "react";

import { useRouteTracking } from "@/hooks";

import { whitelistPaths } from "@/config";

import { AUTH_PAGE_URL } from "@/constants/pageUrl";

import { Loading } from "../Loading";

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const { status, data: session } = useSession();

  const router = useRouter();

  const { isAuthenticated, isNotAuthenticated, isWhitelistRoute } =
    useMemo(() => {
      const isWhitelistRoute = whitelistPaths.includes(router.pathname);
      const isAuthenticated = session && isWhitelistRoute;
      const isNotAuthenticated =
        !isWhitelistRoute && status === "unauthenticated";

      return { isWhitelistRoute, isAuthenticated, isNotAuthenticated };
    }, [router.pathname, session, status]);

  const onAuthentication = () => {
    if (isAuthenticated) router.replace("/");
    if (isNotAuthenticated) router.replace(AUTH_PAGE_URL.LOGIN);
  };

  const isRouteChange = useRouteTracking(onAuthentication, [
    isNotAuthenticated,
    isAuthenticated,
  ]);

  if ((isRouteChange && isWhitelistRoute) || status === "loading")
    return <Loading />;

  return <Fragment>{children}</Fragment>;
};

export default AuthProvider;
