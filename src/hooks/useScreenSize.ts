import { useEffect, useState } from "react";

import type { ScreenSize } from "@/types";

const useScreenSize = (): ScreenSize => {
  const [screenSize, setScreenSize] = useState<ScreenSize>({
    isMobile: false,
    isLargeScreen: false,
  });

  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 768; // Adjust the breakpoint for mobile screens as needed
      const isLargeScreen = window.innerWidth >= 768; // Adjust the breakpoint for large screens as needed
      setScreenSize({ isMobile, isLargeScreen });
    };

    // Initial check on component mount
    handleResize();

    // Attach event listener to window resize
    window.addEventListener("resize", handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return screenSize;
};

export default useScreenSize;
