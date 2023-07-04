import { ChangeEvent, useCallback, useState } from "react";

import type { SearchBarProps } from "./types";
import { Button } from "../Button";
import { Dropdown } from "../Dropdown";
import type { Option } from "../Dropdown/types";
import { Icon } from "../Icon";

const SearchBar = ({ onSearch, showDraft }: SearchBarProps) => {
  const [query, setQuery] = useState<string>("");
  const [filter, setFilter] = useState<string>("");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSubmit = () => {
    onSearch(query, filter);
  };

  let mockFilter = [
    {
      label: "ALL SURVEY",
      value: "",
    },
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
  if (showDraft === false) {
    mockFilter = [
      {
        label: "ALL SURVEY",
        value: "",
      },
      {
        label: "ACTIVE SURVEY",
        value: "ACTIVE",
      },
      {
        label: "FINISHED SURVEY",
        value: "FINISHED",
      },
    ];
  }

  const [selectedOption, setSelectedOption] = useState<
    Option | Option[] | null
  >(null);

  const handleOptionChange = useCallback(
    (selectedOptions: Option | Option[]) => {
      setSelectedOption(selectedOptions);
      const optionStr = JSON.stringify(selectedOptions);
      const optionObj = JSON.parse(optionStr);
      setFilter(optionObj.value);
    },
    []
  );

  return (
    <div className="mx-auto mb-[1.5rem] flex w-screen max-w-3xl items-center px-4">
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
        className="w-full border border-gray-400 text-sm placeholder-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        value={query}
        onChange={handleInputChange}
      />

      <Button
        onClick={handleSubmit}
        className="rounded-r rounded-tl-none rounded-bl-none px-2 py-[0.625rem]"
      >
        <Icon src="/assets/search.svg" />
      </Button>
    </div>
  );
};

export { SearchBar };
