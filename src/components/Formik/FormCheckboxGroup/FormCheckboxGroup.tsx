import { useField } from "formik";
import React, { FC, useCallback } from "react";

import { useFieldError, useUpdateEffect } from "@/hooks";

import { CheckboxGroup } from "@/components/CheckboxGroup";
import type { Option } from "@/components/CheckboxGroup/types";

import type { FormCheckboxGroupProps } from "./types";

const FormCheckboxGroup: FC<FormCheckboxGroupProps> = (props) => {
  const { name, handleCheckboxGroupChange, ...rest } = props;

  const [field, meta, helpers] = useField(name);

  const { errorMessage } = useFieldError(name);

  useUpdateEffect(() => {
    helpers.setValue(meta.value);
  }, [meta.value]);

  const handleOptionClick = useCallback(
    (options: Option[]) => {
      helpers.setValue(options);
      helpers.setError("");
      helpers.setTouched(true);

      if (handleCheckboxGroupChange) handleCheckboxGroupChange(options);
    },
    [helpers, handleCheckboxGroupChange]
  );

  return (
    <CheckboxGroup
      {...rest}
      selectedOptions={field.value}
      errorMessage={errorMessage}
      onChange={handleOptionClick}
    />
  );
};

export { FormCheckboxGroup };
