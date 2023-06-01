import type { NextApplicationPage } from "@/types";

export const withAuth = <P, T>(Component: NextApplicationPage<P, T>) => {
  Component.requireAuth = true;
  return Component;
};
