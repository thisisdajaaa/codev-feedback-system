import type { NextPage } from "next";
import { Fragment, useMemo } from "react";

import { withAuth } from "@/utils/withAuth";
import { useUserRole } from "@/hooks";

import { AdminView } from "./components/AdminView";

const HomePage: NextPage = () => {
  const { isAdmin } = useUserRole();

  const renderView = useMemo(() => {
    if (isAdmin) return <AdminView />;

    return <Fragment />;
  }, [isAdmin]);

  return <Fragment>{renderView}</Fragment>;
};

export default withAuth(HomePage);
