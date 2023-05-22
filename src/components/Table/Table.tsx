import React, { FC, Fragment } from "react";

import { Variations } from "./config";
import type { TableProps } from "./types";
import { VariationOne } from "./VariationOne";

const Table: FC<TableProps> = (props) => {
  const { variation = Variations.Primary, columns, data, title } = props;

  const variations = {
    [Variations.Primary]: (
      <VariationOne title={title} columns={columns} data={data} />
    ),
  };

  return variations[variation] || <Fragment />;
};

export { Table };
