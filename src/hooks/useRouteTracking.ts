import { useRouter } from "next/router";
import { DependencyList, useEffect, useState } from "react";

const useRouteTracking = (
  callback: () => void,
  deps: DependencyList
): boolean => {
  const router = useRouter();

  const [isRouteChange, setIsRouteChange] = useState(false);

  const handleStartChange = () => setIsRouteChange(true);

  const handleStopChange = () => setIsRouteChange(false);

  useEffect(() => {
    router.events.on("routeChangeStart", handleStartChange);
    router.events.on("routeChangeComplete", handleStopChange);
    router.events.on("routeChangeError", handleStopChange);

    if (callback) callback();

    return () => {
      router.events.off("routeChangeStart", handleStartChange);
      router.events.off("routeChangeComplete", handleStopChange);
      router.events.off("routeChangeError", handleStopChange);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return isRouteChange;
};

export default useRouteTracking;
