import Image from "next/image";
import React from "react";

import clsxm from "@/utils/clsxm";

import { DOTS } from "./hooks/usePagination";
import { usePagination } from "./hooks/usePagination";

const Pagination = ({
  onPageChange,
  totalCount,
  siblingCount = 1,
  currentPage,
  pageSize,
}: {
  onPageChange: (page: number) => void;
  totalCount: number;
  siblingCount?: number;
  currentPage: number;
  pageSize: number;
}) => {
  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  const onPreviousPage = () => {
    onPageChange(currentPage - 1);
  };

  const onNextPage = () => {
    onPageChange(currentPage + 1);
  };

  const lastPage = paginationRange?.[paginationRange.length - 1];

  return (
    <div className="flex items-center justify-between">
      <div>
        <p className="text-[1.25rem] text-gray-500">
          Showing <span className="font-medium">{currentPage}</span> to{" "}
          <span className="font-medium">{totalCount}</span> of{" "}
          <span className="font-medium">{totalCount}</span> results
        </p>
      </div>

      <ul className="flex items-center justify-between">
        <li>
          <button
            type="button"
            onClick={onPreviousPage}
            disabled={currentPage === 1}
            className="relative inline-flex items-center rounded-l-md px-3 py-2 text-gray-500 ring-1 ring-inset ring-gray-500 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
          >
            <span className="sr-only">Previous</span>
            <Image
              src="/assets/chevron-left.svg"
              width={13}
              height={27}
              alt="chevron left icon"
            />
          </button>
        </li>

        {paginationRange?.map((pageNumber, i) => {
          if (pageNumber === DOTS) {
            return (
              <button
                key={i}
                type="button"
                className="relative inline-flex min-w-[2.5rem] items-center border-y-[1px] border-l-0 border-r-[1px] border-gray-500 px-3 py-2 text-gray-500 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              >
                <li className="w-full text-center">&#8230;</li>
              </button>
            );
          }

          return (
            <button
              key={i}
              type="button"
              onClick={() => onPageChange(pageNumber as number)}
              className={clsxm(
                "relative inline-flex min-w-[2.5rem] items-center border-y-[1px] border-l-0 border-r-[1px] border-gray-500 px-3 py-2 text-gray-500 hover:bg-gray-50 focus:z-20 focus:outline-offset-0",
                currentPage === pageNumber && "bg-gray-50",
                pageNumber === lastPage && "border-r-0"
              )}
            >
              <li
                className={clsxm(
                  "w-full text-center",
                  currentPage === pageNumber ? "text-blue-500" : ""
                )}
              >
                {pageNumber}
              </li>
            </button>
          );
        })}

        <li>
          <button
            type="button"
            onClick={onNextPage}
            disabled={currentPage === lastPage}
            className="relative inline-flex items-center rounded-r-md px-3 py-2 text-gray-500 ring-1 ring-inset ring-gray-500 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
          >
            <span className="sr-only">Next</span>
            <Image
              src="/assets/chevron-right.svg"
              width={13}
              height={27}
              alt="chevron right icon"
            />
          </button>
        </li>
      </ul>
    </div>
  );
};

export { Pagination };
