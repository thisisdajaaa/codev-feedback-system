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
    <div className="mx-auto flex w-full max-w-screen-2xl flex-col overflow-x-auto bg-white pt-[1.063rem] pb-[3.375rem] shadow-md sm:rounded-2xl sm:px-6 lg:-mx-8">
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
            <div className="inline-block min-w-full py-2 lg:px-8">
              <div className="overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200 text-center text-sm font-light">
                  <thead className="border-b font-medium">
                    <tr>
                      {columns.map((column, index) => (
                        <th
                          key={column.key}
                          scope="col"
                          className={clsx(
                            "border border-auroMetalSaurus px-[14px] py-[5px] font-bold text-black",
                            column.style,
                            {
                              "bg-gray-100": index % 2 === 0,
                              "bg-white": index % 2 !== 0,
                            }
                          )}>
                          {column.title}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {data.map((row, index) => (
                      <tr key={index} onClick={handleRowClick(row)}>
                        {columns.map((column, index) => (
                          <td
                            key={column.key}
                            className={clsx(
                              "whitespace-nowrap border border-auroMetalSaurus px-[14px] py-[5px]",
                              column.style,
                              {
                                "bg-gray-100": index % 2 === 0,
                                "bg-white": index % 2 !== 0,
                              }
                            )}>
                            <div className="text-sm">{row[column.key]}</div>
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
