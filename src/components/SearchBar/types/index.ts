import { InputHTMLAttributes } from "react";

export type SearchBarProps = {
  onSearch: (query: string,filter:string) => void;
} & InputHTMLAttributes<HTMLInputElement>;
