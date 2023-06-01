import clsx from "clsx";
import React, { FC, useCallback } from "react";

import type { TableRow, VariationTableProps } from "./types";
import { Loading } from "../Loading";
import { Typography } from "../Typography";

const VariationTwo: FC<VariationTableProps> = (props) => {
  const { title, data, isLoading, onClick, columns } = props;

  const handleRowClick = useCallback(
    (row: TableRow) => () => {
      if (onClick) onClick(row);
    },
    [onClick]
  );

  return (
    <div className="mx-[0.625rem] max-w-screen-2xl overflow-x-auto rounded-2xl bg-white pt-[1.063rem] pb-[3.375rem] shadow-md sm:mx-0 sm:px-6">
      <Typography
        variant="h2"
        color="text-gray-600"
        size="text-lg"
        className="mb-[1.188rem] px-2 font-semibold sm:px-0"
      >
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
              className="px-2 font-semibold sm:px-0"
            >
              No data available
            </Typography>
          ) : (
            <div className="inline-block min-w-full px-[0.625rem]">
              <div className="overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200 text-center text-sm font-light">
                  <thead className="border-b font-medium">
                    <tr>
                      {columns.map((column, index) => (
                        <th
                          key={column.key}
                          scope="col"
                          className={clsx(
                            "border border-auroMetalSaurus px-[0.875rem] py-[0.313rem] text-lg font-bold text-black",
                            column.style,
                            index % 2 === 0 && "bg-gray-100",
                            index % 2 !== 0 && "bg-white"
                          )}
                        >
                          {column.title}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {data.map((row, rowIndex) => (
                      <tr
                        key={rowIndex}
                        className="table-row cursor-pointer"
                        onClick={handleRowClick(row)}
                      >
                        {columns.map((column, columnIndex) => (
                          <td
                            key={column.key}
                            className={clsx(
                              "table-cell whitespace-nowrap border border-auroMetalSaurus px-[0.875rem] py-[0.313rem] text-sm",
                              column.style,
                              columnIndex % 2 === 0 && "bg-gray-100",
                              columnIndex % 2 !== 0 && "bg-white"
                            )}
                          >
                            {row[column.key]}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export { VariationTwo };
