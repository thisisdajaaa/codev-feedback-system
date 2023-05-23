import Image from "next/image";
import React, { FC } from "react";

import type { IconProps } from "./types";

const Icon: FC<IconProps> = ({ src, className, onClick }) => {
  const alt = src !== "" ? src?.split("/")[2]?.split(".")[0] : "";

  return (
    <div className="relative h-[1em] w-[1em]">
      <Image
        src={src}
        alt={alt}
        layout="fill"
        objectFit="contain"
        className={className}
        onClick={onClick}
      />
    </div>
  );
};

export { Icon };
