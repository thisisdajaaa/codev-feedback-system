import Image from "next/image";
import React from "react";

const Pagination = () =>
  //   {
  //   onPageChange,
  //   totalCount,
  //   siblingCount = 1,
  //   currentPage,
  //   pageSize,
  //   className,
  // }: {
  //   onPageChange;
  //   totalCount: number;
  //   siblingCount: number;
  //   currentPage: number;
  //   pageSize: number;
  //   className: string;
  // }
  {
    // const paginationRange = usePagination({
    // currentPage,
    // totalCount,
    // siblingCount,
    // pageSize
    // })

    // const onPreviousPage = () => {
    //   onPageChange(currentPage - 1);
    // }

    // const onNextPage = () => {
    //   onPageChange(currentPage + 1);
    // }

    // const lastPage = paginationRange[paginationRange.length - 1];

    return (
      <ul className="flex items-center justify-between">
        <li>
          <button
            type="button"
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
        {/* {paginationRange.map((pageNumber, i) => {
          if (pageNumber === '...') {
            return <li key={i} className="pagination-item dots">&#8230;</li>;
          }

          return (
            <li
              className={classnames("pagination-item", {
                selected: pageNumber === currentPage,
              })}
              onClick={() => onPageChange(pageNumber)}>
              {pageNumber}
            </li>
          );
        })} */}
        <li>
          <button
            type="button"
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

      // <div className="flex items-center justify-between border-t border-gray-500 bg-white py-3">
      //   <div className="flex flex-1 justify-between sm:hidden">
      //     <a
      //       href="#"
      //       className="relative inline-flex items-center rounded-md border border-gray-500 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50">
      //       Previous
      //     </a>
      //     <a
      //       href="#"
      //       className="relative ml-3 inline-flex items-center rounded-md border border-gray-500 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50">
      //       Next
      //     </a>
      //   </div>

      //   <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
      //     <div>
      //       <p className="text-[1.25rem] text-gray-500">
      //         Showing <span className="font-medium">1</span> to{" "}
      //         <span className="font-medium">3</span> of{" "}
      //         <span className="font-medium">3</span> results
      //       </p>
      //     </div>

      //     <div>
      //       <nav
      //         className="isolate inline-flex -space-x-px rounded-md shadow-sm"
      //         aria-label="Pagination">
      //         <button
      //           type="button"
      //           className="relative inline-flex items-center rounded-l-md px-3 py-2 text-gray-500 ring-1 ring-inset ring-gray-500 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
      //           <span className="sr-only">Previous</span>
      //           <Image
      //             src="/assets/chevron-left.svg"
      //             width={13}
      //             height={27}
      //             alt="chevron left icon"
      //           />
      //         </button>

      //         <a
      //           href="#"
      //           aria-current="page"
      //           className="relative z-10 inline-flex items-center bg-gray-100 px-4 py-2 text-[1.125rem] font-semibold text-blue-500 ring-1 ring-inset ring-gray-500 focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500">
      //           1
      //         </a>
      //         <a
      //           href="#"
      //           className="relative inline-flex items-center px-4 py-2 text-[1.125rem] font-semibold text-gray-500 ring-1 ring-inset ring-gray-500 hover:bg-gray-100 focus:z-20 focus:outline-offset-0">
      //           2
      //         </a>

      //         <a
      //           href="#"
      //           className="relative inline-flex items-center rounded-r-md px-3 py-2 text-gray-500 ring-1 ring-inset ring-gray-500 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
      //           <span className="sr-only">Next</span>
      //           <Image
      //             src="/assets/chevron-right.svg"
      //             width={13}
      //             height={27}
      //             alt="chevron right icon"
      //           />
      //         </a>
      //       </nav>
      //     </div>
      //   </div>
      // </div>
    );
  };

export { Pagination };
