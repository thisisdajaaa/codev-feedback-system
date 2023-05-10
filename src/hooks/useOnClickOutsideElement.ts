import { RefObject, useCallback } from "react";
import { useEffect } from "react";

const useOnClickOutsideElement = (
  ref: RefObject<Element>,
  onClickOutside: (element?: Element) => void
) => {
  const handleClickOutside = useCallback((event: any) => {
    if (!ref.current || ref.current.contains(event.target)) return;

    onClickOutside(event.target);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [handleClickOutside]);
};

export default useOnClickOutsideElement;
