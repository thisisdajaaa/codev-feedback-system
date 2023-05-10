export type ListenerFn = () => any;

export type ScrollDirection = "UP" | "DOWN" | "LEFT" | "RIGHT" | null;

export type ScrollDirectionHookResult = {
  isScrollXAtStart: boolean;
  isScrollXAtEnd: boolean;
  isScrolling: boolean;
  isScrollingX: boolean;
  isScrollingY: boolean;
  isScrollingUp: boolean;
  isScrollingDown: boolean;
  isScrollingLeft: boolean;
  isScrollingRight: boolean;
  scrollDirection: ScrollDirection;
  scrollTargetRef: (node: HTMLElement) => void;
};
