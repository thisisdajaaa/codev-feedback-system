import { ListenerFn } from "@/types/scroll";

export const getScrollTop = (target?: HTMLElement) => {
  if (target) return target.scrollTop;

  return (
    window.scrollY ||
    window.pageYOffset ||
    document.body.scrollTop ||
    (document.documentElement && document.documentElement.scrollTop) ||
    0
  );
};

export const getScrollLeft = (target?: HTMLElement) => {
  if (target) return target.scrollLeft;

  return (
    window.scrollX ||
    window.pageXOffset ||
    document.body.scrollLeft ||
    (document.documentElement && document.documentElement.scrollLeft) ||
    0
  );
};

export const isBrowser = () => {
  return typeof window === "object";
};

export const addScrollListener = (
  listener: ListenerFn,
  target: HTMLElement | Document = document
) => {
  return target.addEventListener("scroll", listener);
};

export const removeScrollListener = (
  listener: ListenerFn,
  target: HTMLElement | Document = document
) => {
  return target.removeEventListener("scroll", listener);
};
