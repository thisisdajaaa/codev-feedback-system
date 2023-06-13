import type { NextPage } from "next";
import type { AppInitialProps } from "next/app";

export type NextApplicationPage<P, T> = NextPage<PagePropsWithAuth<P, T>> & {
  requireAuth?: boolean;
};

export type NextAppProps<P, T> = {
  Component: NextApplicationPage<P, T>;
  pageProps: AppInitialProps["pageProps"];
};

export type PagePropsWithAuth<P, T> = P & {
  data?: T;
};

export type ScreenSize = {
  isMobile: boolean;
  isLargeScreen: boolean;
};
