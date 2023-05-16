import type { NextPage } from "next";

import { withAuth } from "@/utils/withAuth";

import Home from "./home/index.page";

const Main: NextPage = () => {
  return <Home />;
};

export default withAuth(Main);
