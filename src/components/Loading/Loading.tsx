import { FC } from "react";
import { ImSpinner2 } from "react-icons/im";

import clsxm from "@/utils/clsxm";

import type { LoadingProps } from "./types";

export const Loading: FC<LoadingProps> = (props) => {
  const {
    fullscreen = true,
    size = 45,
    height = "h-screen",
    color = "#3d3a3a",
  } = props;

  return (
    <>
      <div
        className={clsxm(
          fullscreen ? "flex items-center justify-center" : "",
          height
        )}
        data-testid="loading"
      >
        <ImSpinner2 className="animate-spin" size={size} color={color} />
      </div>
    </>
  );
};

export default Loading;
