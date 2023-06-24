import React, { FC, useCallback, useEffect, useRef, useState } from "react";

import clsxm from "@/utils/clsxm";
import { noop } from "@/utils/helpers";
import { useOnClickOutsideElement } from "@/hooks";

import type { DropdownProps, GroupOption, Option } from "./types";
import { Icon } from "../Icon";
import { Typography } from "../Typography";

const Dropdown: FC<DropdownProps> = (props) => {
  const {
    options,
    placeholder,
    onChange,
    onFocus,
    onBlur,
    errorMessage,
    selectedOption: selectedOptionProp,
    multiSelect = false,
    className,
    readOnly,
  } = props;

  const ref = useRef<HTMLDivElement | null>(null);

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedOptions, setSelectedOptions] = useState<Option[]>(
    Array.isArray(selectedOptionProp)
      ? selectedOptionProp
      : selectedOptionProp
      ? [selectedOptionProp]
      : []
  );

  useEffect(() => {
    if (selectedOptionProp) {
      setSelectedOptions(
        Array.isArray(selectedOptionProp)
          ? selectedOptionProp
          : [selectedOptionProp]
      );
    }
  }, [selectedOptionProp]);

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

  const formattedSelectedOptions = selectedOptions.map((opt, index) => (
    <span key={index}>
      {index > 0 && ", "}
      {opt.label}
    </span>
  ));

  const onToggleDropdown = () => {
    if (readOnly) return;

    toggleDropdown();
  };

  return (
    <>
      <div className="relative" ref={ref}>
        <button
          onClick={onToggleDropdown}
          className={clsxm(
            "flex min-h-[2.5rem] w-full flex-grow appearance-none items-center justify-between px-[0.875rem] py-2 text-base leading-[1.813rem]",
            "rounded-[0.25rem] border text-black",
            "duration-150 focus-within:border-nero focus-within:transition-all sm:text-sm",
            isOpen && "border-nero",
            !!errorMessage && "border-red-400",
            className
          )}
        >
          <div>
            {formattedSelectedOptions.length > 0 ? (
              formattedSelectedOptions
            ) : (
              <Typography variant="span" size="text-base" color="text-gray-500">
                {placeholder}
              </Typography>
            )}
          </div>

          <Icon
            className={clsxm(
              "ease 300ms ml-auto transition",
              isOpen ? "rotate-180" : ""
            )}
            src="/assets/chevron-down.svg"
          />
        </button>

        {isOpen && (
          <ul className="absolute z-30 mt-2 w-full rounded-[0.25rem] border border-gray-200 bg-white">
            {options.map((groupOrOption, index) => {
              if ("options" in groupOrOption) {
                const groupOption: GroupOption = groupOrOption;

                return (
                  <li key={groupOption.group}>
                    <div className="px-[0.875rem] pt-2 pb-1">
                      <Typography
                        variant="p"
                        size="text-sm"
                        color="text-gray-700"
                        className="uppercase"
                      >
                        {groupOption.group}
                      </Typography>
                    </div>

                    <ul>
                      {groupOption.options.map((option) => {
                        const isSelectedOption = selectedOptions.find(
                          (opt) => opt.value === option.value
                        );

                        return (
                          <li
                            key={option.value}
                            onClick={() => handleOptionClick(option)}
                            className={clsxm(
                              "bg:white cursor-pointer py-2 pl-7 pr-[0.875rem]",
                              "hover:bg-aliceBlue active:bg-aliceBlue",
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
                  </li>
                );
              } else {
                const option: Option = groupOrOption;
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
              }
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
