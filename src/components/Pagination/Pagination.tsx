import React from "react";

import clsxm from "@/utils/clsxm";

import { DOTS } from "./config";
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

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === lastPage;

  return (
    <div className="flex items-center justify-between xs:flex-col sm:flex-col md:flex-row">
      <div className="xs:mb-[0.625rem] sm:mb-[0.625rem] sm:mt-8 md:my-0">
        <p className="text-[1.25rem] text-gray-500">
          Showing <span className="font-medium">{totalCount}</span> to{" "}
          <span className="font-medium">{pageSize}</span> of{" "}
          <span className="font-medium">{pageSize}</span> results
        </p>
      </div>

      <ul className="flex items-center justify-between">
        <li>
          <button
            type="button"
            onClick={onPreviousPage}
            disabled={isFirstPage}
            className={clsxm(
              "relative inline-flex min-w-[2.5rem] items-center rounded-l-md border-y-[1px] border-x-[1px] border-gray-500 px-3 py-2 font-bold text-gray-500",
              isFirstPage
                ? "cursor-not-allowed"
                : "hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            )}>
            <span className="sr-only">Previous</span>
            <span className={isFirstPage ? "text-gray-300" : ""}>&lt;</span>
          </button>
        </li>

        {paginationRange?.map((pageNumber, i) => {
          if (pageNumber === DOTS) {
            return (
              <button
                key={i}
                type="button"
                className="relative inline-flex min-w-[2.5rem] items-center border-y-[1px] border-l-0 border-r-[1px] border-gray-500 px-3 py-2 text-gray-500 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
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
              )}>
              <li
                className={clsxm(
                  "w-full text-center",
                  currentPage === pageNumber ? "text-blue-500" : ""
                )}>
                {pageNumber}
              </li>
            </button>
          );
        })}

        <li>
          <button
            type="button"
            onClick={onNextPage}
            disabled={isLastPage}
            className={clsxm(
              "relative inline-flex min-w-[2.5rem] items-center rounded-r-md border-y-[1px] border-x-[1px] border-gray-500 px-3 py-2 font-bold text-gray-500",
              isLastPage
                ? "cursor-not-allowed"
                : "hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            )}>
            <span className="sr-only">Next</span>
            <span className={isLastPage ? "text-gray-300" : ""}>&gt;</span>
          </button>
        </li>
      </ul>
    </div>
  );
};

export { Pagination };
