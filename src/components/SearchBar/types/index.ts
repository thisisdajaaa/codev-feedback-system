import { InputHTMLAttributes } from "react";

export type SearchBarProps = {
  onSearch: (query: string) => void;
} & InputHTMLAttributes<HTMLInputElement>;
