import { useField } from "formik";
import React, { FC, useCallback } from "react";

import { useFieldError, useUpdateEffect } from "@/hooks";

import { Dropdown } from "@/components/Dropdown";
import type { Option } from "@/components/Dropdown/types";

import type { FormDropdownProps } from "./types";

const FormDropdown: FC<FormDropdownProps> = (props) => {
  const { name, handleDropdownChange, ...rest } = props;

  const [field, meta, helpers] = useField(name);

  const { errorMessage } = useFieldError(name);

  useUpdateEffect(() => {
    helpers.setValue(meta.value);
  }, [meta.value]);

  const handleOptionClick = useCallback(
    (option: Option | Option[]) => {
      helpers.setValue(option);
      helpers.setError("");

      if (handleDropdownChange) handleDropdownChange(option);
    },
    [helpers, handleDropdownChange]
  );

  const handleBlur = useCallback(() => {
    helpers.setTouched(true);
  }, [helpers]);

  return (
    <Dropdown
      {...rest}
      selectedOption={field.value}
      errorMessage={errorMessage}
      onChange={handleOptionClick}
      onBlur={handleBlur}
    />
  );
};

export { FormDropdown };
