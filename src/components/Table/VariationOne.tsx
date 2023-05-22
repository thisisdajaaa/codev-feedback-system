import clsx from "clsx";
import React, { FC, Fragment } from "react";

import type { VariationTableProps } from "./types";
import { Typography } from "../Typography";

const VariationOne: FC<VariationTableProps> = (props) => {
  const { title, data, columns } = props;

  return (
    <div className="mx-auto w-full max-w-screen-xl rounded-2xl bg-white pt-[1.063rem] pb-[3.375rem] shadow-md sm:px-6">
      <Typography
        variant="h2"
        color="text-gray-600"
        size="text-lg"
        className="mb-[1.188rem] px-2 font-semibold sm:px-0"
      >
        {title}
      </Typography>

      <div className="divide-y divide-gray-200 border">
        {data.map((row, index) => (
          <div
            key={index}
            className={`flex min-h-[4.125rem] items-center justify-between ${
              index % 2 === 0 ? "bg-gray-100" : "bg-white"
            }`}
          >
            {columns.map((column) => {
              const value = row[column.key];
              const typeList = ["string", "number"];

              return typeList.includes(typeof value) ? (
                <Typography
                  key={column.key}
                  variant="p"
                  color="text-gray-600"
                  size="text-lg"
                  className={clsx("px-4", column.style)}
                >
                  {value}
                </Typography>
              ) : (
                <Fragment key={column.key}>{value}</Fragment>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export { VariationOne };
