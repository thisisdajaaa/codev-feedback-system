import type { ReactNode } from "react";

import { Variations } from "../config";

export type VariationOptions = keyof typeof Variations;

export type TableRow = {
  [key: string]: string | number | ReactNode;
};

export type TableColumn = {
  key: string;
  title: string;
  style?: string;
};

export type VariationTableProps = {
  title: string;
  data: TableRow[];
  columns: TableColumn[];
};

export type TableProps = {
  variation?: VariationOptions;
} & VariationTableProps;
