export type PaginationProps = {
  onPageChange: (page: number) => void;
  totalCount: number;
  siblingCount?: number;
  currentPage: number;
  pageSize: number;
  csv?: CSVProps;
};

export type CSVProps = {
  onClick: () => void;
  isLoading: boolean;
};
