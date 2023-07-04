import { InputHTMLAttributes } from "react";

export type SearchBarProps = {
  onSearch: (query: string, filter: string) => void;
  showDraft: boolean;
} & InputHTMLAttributes<HTMLInputElement>;
