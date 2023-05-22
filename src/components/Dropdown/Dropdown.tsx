import React, { FC, useCallback, useRef, useState } from "react";

import clsxm from "@/utils/clsxm";
import { noop } from "@/utils/helpers";
import { useOnClickOutsideElement } from "@/hooks";

import type { DropdownProps, Option } from "./types";
import { Icon } from "../Icon";
import { Typography } from "../Typography";

const Dropdown: FC<DropdownProps> = ({
  options,
  placeholder,
  onChange,
  onFocus,
  onBlur,
  errorMessage,
  multiSelect = false,
}) => {
  const ref = useRef<HTMLDivElement | null>(null);

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);

  const handleClickOutside = useCallback(() => {
    setIsOpen(false);
    if (onBlur) onBlur();
  }, [onBlur]);

  useOnClickOutsideElement(ref, handleClickOutside);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleOptionClick = (option: Option) => {
    if (multiSelect) {
      const newSelectedOptions = selectedOptions.find(
        (opt) => opt.value === option.value
      )
        ? selectedOptions.filter((opt) => opt.value !== option.value)
        : [...selectedOptions, option];

      setSelectedOptions(newSelectedOptions);
      onChange(newSelectedOptions);
    } else {
      setSelectedOptions([option]);
      setIsOpen(false);
      onChange(option);
    }

    if (onFocus) onFocus();
  };

  const formattedSelectedOptions = selectedOptions
    .map((opt) => opt.label)
    .join(", ");

  return (
    <>
      <div className="relative" ref={ref}>
        <button
          onClick={toggleDropdown}
          className={clsxm(
            "flex h-[2.5rem] w-full flex-grow appearance-none items-center justify-between px-[0.875rem] py-2 text-base leading-[1.813rem]",
            "rounded-[0.25rem] border text-black",
            "duration-150 focus-within:border-nero focus-within:transition-all sm:text-sm",
            isOpen && "border-nero",
            !!errorMessage && "border-red-400"
          )}
        >
          {formattedSelectedOptions || (
            <Typography variant="span" size="text-base" color="text-gray-500">
              {placeholder}
            </Typography>
          )}
          <Icon
            className={clsxm(
              "ease 300ms ml-auto transition",
              isOpen ? "rotate-180" : ""
            )}
            src="/assets/chevron-down.svg"
            width={12}
            height={6}
          />
        </button>

        {isOpen && (
          <ul className="absolute mt-2 w-full rounded-[0.25rem] border border-gray-200 bg-white">
            {options.map((option, index) => {
              const isSelectedOption = selectedOptions.find(
                (opt) => opt.value === option.value
              );

              return (
                <li
                  key={option.value}
                  onClick={() => handleOptionClick(option)}
                  className={clsxm(
                    "cursor-pointer px-[0.875rem] py-2",
                    "hover:bg-gray-100 active:bg-gray-200",
                    index % 2 === 0 ? "bg-gray-100" : "bg-white",
                    multiSelect && isSelectedOption && "bg-blue-100"
                  )}
                >
                  {multiSelect && (
                    <input
                      type="checkbox"
                      className="mr-2"
                      checked={!!isSelectedOption}
                      onChange={noop}
                    />
                  )}
                  {option.label}
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {!!errorMessage && (
        <Typography
          variant="p"
          size="text-sm"
          lineHeight="leading-[1.063rem]"
          textAlign="text-left"
          color="text-red-400"
          className="mt-[0.5rem] font-light"
        >
          {errorMessage}
        </Typography>
      )}
    </>
  );
};

export { Dropdown };
