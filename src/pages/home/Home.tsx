import type { NextPage } from "next";
import { signOut } from "next-auth/react";
import { useCallback } from "react";

import logger from "@/utils/logger";
import { useMount } from "@/hooks";

import Navbar from "@/components/Navbar/Navbar";

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
        <button
          onClick={() => signOut()}
          className="rounded-sm bg-gray-500 px-3 py-2 text-white transition-all hover:bg-gray-700">
          Logout
        </button>
      </div>
    </>
  );
};

export default Home;
