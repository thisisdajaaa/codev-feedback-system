import { useSession } from "next-auth/react";
import React, { FC, Fragment, PropsWithChildren, useMemo } from "react";

import { noop } from "@/utils/helpers";
import { useRouteTracking } from "@/hooks";

import { Loading } from "../Loading";
import { Navbar } from "../Navbar";

const Layout: FC<PropsWithChildren> = (props) => {
  const { children } = props;

  const { data: session, status } = useSession();

  const isRouteChange = useRouteTracking(noop, []);

  const renderContent = useMemo(() => {
    if (!session && status === "unauthenticated") return null;

    return (
      <div className="flex min-h-screen flex-col">
        <Navbar />

        <div className="flex flex-1 flex-col md:flex-row">
          <main className="mt-[4.5rem] flex-1 overflow-x-auto bg-brightGray transition-all duration-200 ease-in-out">
            {isRouteChange ? (
              <Loading height="h-[calc(100vh-6.75rem)]" />
            ) : (
              children
            )}
          </main>
        </div>
      </div>
    );
  }, [children, isRouteChange, session, status]);

  return <Fragment>{renderContent}</Fragment>;
};

export { Layout };
