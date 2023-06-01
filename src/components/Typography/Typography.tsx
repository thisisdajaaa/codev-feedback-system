import React, { FC, PropsWithChildren } from "react";

import { typographyPresets } from "./config";
import type { TypographyFieldsType, TypographyProps } from "./types";

const Typography: FC<PropsWithChildren<TypographyProps>> = (props) => {
  const {
    preset = "custom",
    variant = "p",
    color = "text-black",
    textAlign = "text-left",
    lineHeight = "leading-[0.957rem]",
    className,
    size = "text-base",
    children,
  } = props;

  const fields: TypographyFieldsType | undefined =
    preset === "custom"
      ? { size, lineHeight, variant, color, textAlign, className }
      : typographyPresets.find(({ key }) => key === preset)?.props;

  const Element = fields?.variant as keyof JSX.IntrinsicElements;

  return (
    <Element
      className={`${fields?.size} ${fields?.lineHeight} ${fields?.color} ${fields?.textAlign} ${fields?.className} ${className}`}>
      {children}
    </Element>
  );
};

export { Typography };
