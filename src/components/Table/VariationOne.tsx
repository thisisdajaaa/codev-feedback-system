import clsx from "clsx";
import React, { FC, Fragment, useCallback } from "react";

import type { TableRow, VariationTableProps } from "./types";
import { Loading } from "../Loading";
import { Typography } from "../Typography";

const VariationOne: FC<VariationTableProps> = (props) => {
  const { title, data, isLoading, onClick, columns } = props;

  const handleRowClick = useCallback(
    (row: TableRow) => () => {
      if (onClick) onClick(row);
    },
    [onClick]
  );

  return (
    <div className="mx-auto w-full max-w-screen-2xl bg-white pt-[1.063rem] pb-[3.375rem] shadow-md sm:rounded-2xl sm:px-6">
      <Typography
        variant="h2"
        color="text-gray-600"
        size="text-lg"
        className="mb-[1.188rem] px-2 font-semibold sm:px-0">
        {title}
      </Typography>

      {isLoading ? (
        <Loading height="h-96" />
      ) : (
        <>
          {data.length === 0 ? (
            <Typography
              variant="p"
              color="text-gray-600"
              size="text-base"
              className="px-2 font-semibold sm:px-0">
              No data available
            </Typography>
          ) : (
            <div className="divide-y divide-gray-200 border">
              {data.map((row, index) => (
                <div
                  key={index}
                  onClick={handleRowClick(row)}
                  className={`flex min-h-[4.125rem] cursor-pointer items-center justify-between transition-all hover:bg-gray-50 ${
                    index % 2 === 0 ? "bg-gray-100" : "bg-white"
                  }`}>
                  {columns.map((column) => {
                    const value = row[column.key];
                    const typeList = ["string", "number"];

                    return typeList.includes(typeof value) ? (
                      <Typography
                        key={column.key}
                        variant="p"
                        color="text-gray-600"
                        size="text-lg"
                        className={clsx("px-4", column.style)}>
                        {value}
                      </Typography>
                    ) : (
                      <Fragment key={column.key}>{value}</Fragment>
                    );
                  })}
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export { VariationOne };
