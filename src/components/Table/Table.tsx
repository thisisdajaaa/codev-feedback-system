import React, { FC, Fragment } from "react";

import { Variations } from "./config";
import type { TableProps } from "./types";
import { VariationOne } from "./VariationOne";
import { VariationTwo } from "./VariationTwo";

const Table: FC<TableProps> = (props) => {
  const { variation = Variations.Primary, ...rest } = props;

  const variations = {
    [Variations.Primary]: <VariationOne {...rest} />,
    [Variations.Secondary]: <VariationTwo {...rest} />,
  };

  return variations[variation] || <Fragment />;
};

export { Table };
