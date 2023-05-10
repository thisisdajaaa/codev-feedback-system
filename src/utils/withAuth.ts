import type { NextApplicationPage } from "@/types";

export const withAuth = (Component: NextApplicationPage) => {
  Component.requireAuth = true;
  return Component;
};
