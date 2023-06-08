import { ChangeEvent, FormEvent, useState } from "react";

import { SearchBarProps } from "./types";
import { Button } from "../Button";
import { Dropdown } from "../Dropdown";
import type { Option } from "../Dropdown/types";

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [query, setQuery] = useState("");

  const handleChange2 = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  const mockFilter = [
    {
      label: "ACTIVE SURVEY",
      value: "ACTIVE",
    },
    {
      label: "DRAFT SURVEY",
      value: "DRAFT",
    },
    {
      label: "FINISHED SURVEY",
      value: "FINISHED",
    },
  ];
  const [selectedOption, setSelectedOption] = useState<
    Option | Option[] | null
  >(null);

  const handleOptionChange = (selectedOptions: Option | Option[]) => {
    setSelectedOption(selectedOptions);
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto mb-[1.5rem] flex w-screen max-w-3xl items-center px-4"
    >
      <Dropdown
        options={mockFilter}
        selectedOption={selectedOption as Option[]}
        placeholder="Select"
        onChange={handleOptionChange}
        className="min-h-[37px] w-[170px] rounded-r-none border-gray-400 bg-white text-sm focus:border-none focus:outline-none focus:ring-1 focus:ring-blue-500"
      />
      <input
        type="text"
        placeholder="Search for Survey"
        className="w-full border border-gray-400 text-sm placeholder-slate-400 shadow-md focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        value={query}
        onChange={handleChange2}
      />

      <Button className="rounded-r rounded-tl-none rounded-bl-none px-2 py-[6px]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="#ffffff"
          className="h-6 w-6"
        >
          <path
            fill-rule="evenodd"
            d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z"
            clip-rule="evenodd"
          />
        </svg>
      </Button>
    </form>
  );
};

export { SearchBar };
