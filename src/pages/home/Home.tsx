import type { NextPage } from "next";
import { signOut } from "next-auth/react";
import { useCallback } from "react";

import logger from "@/utils/logger";
import { useMount } from "@/hooks";

import { Button } from "@/components/Button";
import { Icon } from "@/components/Icon";
import { Navbar } from "@/components/Navbar";

import { getSampleMethodAPI } from "@/api/sample";

const Home: NextPage = () => {
  const handleLoad = useCallback(async () => {
    const { success, message } = await getSampleMethodAPI();

    if (success) logger(message);
  }, []);

  useMount(() => {
    handleLoad();
  });

  return (
    <>
      <Navbar />

      <div className="grid h-[100vh] place-content-center">
        <Button
          onClick={() => signOut()}
          variant="warning"
          className="xs:px-[0.7rem]"
        >
          <Icon src="/assets/trash.svg" height={16} width={14} />
          <span className="hidden sm:inline">Trash</span>
        </Button>
      </div>
    </>
  );
};

export default Home;
