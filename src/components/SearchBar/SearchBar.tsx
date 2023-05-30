import { ChangeEvent, FormEvent, useState } from "react";
//import { Button } from '../Button'
//import { Dropdown } from '../Dropdown';
import React from "react";

interface SearchBoxProps {
  onSearch: (query: string) => void;
}
const SearchBar = ({ onSearch }: SearchBoxProps) => {
  const [query, setQuery] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  // const mockFilter = [
  //     {
  //       label: "ALL SURVEY",
  //       value: "ALL",
  //     },
  //     {
  //       label: "ACTIVE SURVEY",
  //       value: "ACTIVE",
  //     },
  //     {
  //       label: "DRAFT SURVEY",
  //       value: "DRAFT",
  //     },
  //   ];
  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto mb-[1.5rem] flex w-screen max-w-3xl items-center px-4"
    >
      <select
        name="cars"
        id="cars"
        className="rounded-l border border-gray-400 text-sm"
      >
        <option value="ALL" selected>
          All Surveys
        </option>
        <option value="ACTIVE">Active Surveys</option>
        <option value="CLOSED">Closed Surveys</option>
        <option value="DRAFT">Draft Surveys</option>
      </select>
      <input
        type="text"
        className="w-full border border-gray-400 text-sm placeholder-slate-400 shadow-md focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        value={query}
        onChange={handleChange}
      />
      <button
        type="submit"
        className="rounded-r border border-blue-600 bg-blue-500 px-2 py-[6px] text-lg font-semibold text-white shadow-md hover:bg-blue-600 focus:bg-blue-600"
      >
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
      </button>
    </form>
  );
};

export { SearchBar };
