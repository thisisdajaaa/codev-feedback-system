import { NextPage } from "next";
import { AppInitialProps } from "next/app";

export type NextApplicationPage = NextPage & {
  requireAuth?: boolean;
};

export type NextAppProps = {
  Component: NextApplicationPage;
  pageProps: AppInitialProps["pageProps"];
};
