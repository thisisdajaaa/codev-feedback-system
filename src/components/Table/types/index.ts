import type { ReactNode } from "react";

import { Variations } from "../config";

export type VariationOptions = keyof typeof Variations;

export type TableRow = {
  id: string;
  [key: string]: string | number | ReactNode;
};

export type TableColumn = {
  key: string;
  title: string;
  style?: string;
};

export type VariationTableProps = {
  title: string;
  isLoading?: boolean;
  data: TableRow[];
  onClick?: (row: TableRow) => void;
  columns: TableColumn[];
};

export type TableProps = {
  variation?: VariationOptions;
} & VariationTableProps;
