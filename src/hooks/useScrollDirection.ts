import { useCallback, useEffect, useState } from "react";

import {
  addScrollListener,
  getScrollLeft,
  getScrollTop,
  isBrowser,
  removeScrollListener,
} from "@/utils/domUtils";

import { ScrollDirection, ScrollDirectionHookResult } from "@/types";

export function useScrollDirection(
  target?: HTMLElement
): ScrollDirectionHookResult {
  const [targetFromApi, setTargetFromApi] = useState<HTMLElement | undefined>();
  const [targetFromProps, setTargetFromProps] = useState<
    HTMLElement | undefined
  >();
  const [scrollDirection, setScrollDirection] = useState<ScrollDirection>(null);
  const [isScrollXAtStart, setIsScrollXAtStart] = useState<boolean>(true);
  const [isScrollXAtEnd, setIsScrollXAtEnd] = useState<boolean>(true);
  const targetToUse = targetFromProps || targetFromApi;

  const isScrolling = scrollDirection !== null;
  const isScrollingX =
    scrollDirection === "LEFT" || scrollDirection === "RIGHT";
  const isScrollingY = scrollDirection === "UP" || scrollDirection === "DOWN";
  const isScrollingUp = scrollDirection === "UP";
  const isScrollingDown = scrollDirection === "DOWN";
  const isScrollingLeft = scrollDirection === "LEFT";
  const isScrollingRight = scrollDirection === "RIGHT";

  const scrollTargetRef = useCallback((node: HTMLElement) => {
    setTargetFromApi(node);
  }, []);

  useEffect(() => {
    setTargetFromProps(target);
  }, [target]);

  useEffect(() => {
    if (isBrowser()) {
      let scrollTimeout: number;
      let lastScrollTop = getScrollTop(targetToUse);
      let lastScrollLeft = getScrollLeft(targetToUse);

      const handleScroll = () => {
        // Reset scroll direction when scrolling stops
        window.clearTimeout(scrollTimeout);
        scrollTimeout = window.setTimeout(() => {
          setScrollDirection(null);
        }, 66);

        // Set vertical direction while scrolling
        const scrollTop = getScrollTop(targetToUse);

        if (scrollTop > lastScrollTop) {
          setScrollDirection("DOWN");
        } else if (scrollTop < lastScrollTop) {
          setScrollDirection("UP");
        }

        lastScrollTop = scrollTop;

        // Set horizontal scroll direction
        const scrollLeft = getScrollLeft(targetToUse);

        if (scrollLeft > lastScrollLeft) {
          setScrollDirection("RIGHT");
        } else if (scrollLeft < lastScrollLeft) {
          setScrollDirection("LEFT");
        }

        const scrollXAtStart =
          targetToUse && Math.abs(targetToUse.scrollLeft) === 0;

        const scrollXAtEnd =
          targetToUse &&
          Math.abs(targetToUse.scrollLeft) ===
            targetToUse.scrollWidth - targetToUse.clientWidth;

        setIsScrollXAtStart(Boolean(scrollXAtStart));
        setIsScrollXAtEnd(Boolean(scrollXAtEnd));

        lastScrollLeft = scrollLeft;
      };

      addScrollListener(handleScroll, targetToUse);

      return () => removeScrollListener(handleScroll, targetToUse);
    }
  }, [targetToUse]);

  return {
    isScrollXAtStart,
    isScrollXAtEnd,
    isScrolling,
    isScrollingX,
    isScrollingY,
    isScrollingUp,
    isScrollingDown,
    isScrollingLeft,
    isScrollingRight,
    scrollDirection,
    scrollTargetRef,
  };
}
