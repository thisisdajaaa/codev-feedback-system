import { useSession } from "next-auth/react";
import React, { FC, Fragment, PropsWithChildren, useMemo } from "react";

import { noop } from "@/utils/helpers";
import { useAppSelector, useRouteTracking } from "@/hooks";

import { selectors } from "@/redux/utils";

import { Icon } from "../Icon";
import { Loading } from "../Loading";
import { Modal } from "../Modal";
import { Navbar } from "../Navbar";
import { Typography } from "../Typography";

const Layout: FC<PropsWithChildren> = (props) => {
  const { children } = props;

  const { data: session, status } = useSession();

  const isRouteChange = useRouteTracking(noop, []);

  const toast = useAppSelector(selectors.toast);

  const renderContent = useMemo(() => {
    if (!session && status === "unauthenticated") return null;

    const getToastIcon = () => {
      const types = {
        success: "/assets/success.svg",
        error: "/assets/error.svg",
        default: "/assets/info-gray.svg",
      };

      return types[toast.type];
    };

    return (
      <div className="flex min-h-screen flex-col">
        <Navbar />

        <div className="flex flex-1 flex-col md:flex-row">
          <main className="mt-[4.5rem] flex-1 overflow-x-auto bg-brightGray transition-all duration-200 ease-in-out">
            <Modal
              open={toast.open}
              size="xs"
              contentClassName="flex flex-col items-center gap-2"
              className="min-h-[200px]"
            >
              <div className="text-[2rem]">
                <Icon src={getToastIcon()} />
              </div>

              <Typography variant="p" size="text-lg" className="font-semibold">
                {toast.message}
              </Typography>
            </Modal>

            {isRouteChange ? (
              <Loading height="h-[calc(100vh-6.75rem)]" />
            ) : (
              children
            )}
          </main>
        </div>
      </div>
    );
  }, [children, isRouteChange, session, status, toast]);

  return <Fragment>{renderContent}</Fragment>;
};

export { Layout };
