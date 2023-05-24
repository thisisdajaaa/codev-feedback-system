import { useEffect, useRef } from "react";

const useMount = (callback: () => void) => {
  const isFirstMount = useRef(true);

  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false;
      callback();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export default useMount;
