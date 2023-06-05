import React, { FC, Fragment } from "react";

import { TableVariations } from "./config";
import { Primary } from "./Primary";
import { Secondary } from "./Secondary";
import type { TableProps } from "./types";

const Table: FC<TableProps> = (props) => {
  const { variation = TableVariations.Primary, ...rest } = props;

  const variations = {
    [TableVariations.Primary]: <Primary {...rest} />,
    [TableVariations.Secondary]: <Secondary {...rest} />,
  };

  return variations[variation] || <Fragment />;
};

export { Table };
