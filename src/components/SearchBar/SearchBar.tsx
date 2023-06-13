import { ChangeEvent, FormEvent, useState } from "react";

import type { SearchBarProps } from "./types";
import { Button } from "../Button";
import { Dropdown } from "../Dropdown";
import type { Option } from "../Dropdown/types";
import { Icon } from "../Icon";

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("");
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSearch(query, filter);
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
    const optionStr = JSON.stringify(selectedOptions);
    const optionObj = JSON.parse(optionStr);
    setFilter(optionObj.value);
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
        className="min-h-[2.313rem] w-[10.625rem] rounded-r-none border-gray-400 bg-white text-sm focus:border-none focus:outline-none focus:ring-1 focus:ring-blue-500"
      />
      <input
        type="text"
        placeholder="Search for Survey"
        className="w-full border border-gray-400 text-sm placeholder-slate-400 shadow-md focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        value={query}
        onChange={handleInputChange}
      />

      <Button className="rounded-r rounded-tl-none rounded-bl-none px-2 py-[0.625rem]">
        <Icon src="/assets/search.svg" />
      </Button>
    </form>
  );
};

export { SearchBar };
