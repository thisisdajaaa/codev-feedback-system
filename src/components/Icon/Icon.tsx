import Image from "next/image";
import React, { FC } from "react";

import type { IconProps } from "./types";

const Icon: FC<IconProps> = ({ src, height, width, className, onClick }) => {
  const alt = src !== "" ? src?.split("/")[2]?.split(".")[0] : "";

  return (
    <Image
      src={src}
      alt={alt}
      height={height}
      width={width}
      className={className}
      onClick={onClick}
    />
  );
};

export { Icon };
