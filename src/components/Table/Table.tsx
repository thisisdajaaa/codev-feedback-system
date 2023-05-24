import React, { FC, Fragment } from "react";

import { Variations } from "./config";
import type { TableProps } from "./types";
import { VariationOne } from "./VariationOne";

const Table: FC<TableProps> = (props) => {
  const { variation = Variations.Primary, ...rest } = props;

  const variations = {
    [Variations.Primary]: <VariationOne {...rest} />,
  };

  return variations[variation] || <Fragment />;
};

export { Table };
