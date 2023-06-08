import { useField } from "formik";
import React, { FC, useCallback } from "react";

import { useFieldError, useUpdateEffect } from "@/hooks";

import { RadioGroup } from "@/components/RadioGroup";
import type { Option } from "@/components/RadioGroup/types";

import type { FormRadioGroupProps } from "./types";

const FormRadioGroup: FC<FormRadioGroupProps> = (props) => {
  const { name, handleRadioGroupChange, ...rest } = props;

  const [field, meta, helpers] = useField(name);

  const { errorMessage } = useFieldError(name);

  useUpdateEffect(() => {
    helpers.setValue(meta.value);
  }, [meta.value]);

  const handleOptionClick = useCallback(
    (option: Option) => {
      helpers.setValue(option);
      helpers.setError("");
      helpers.setTouched(true);

      if (handleRadioGroupChange) handleRadioGroupChange(option);
    },
    [helpers, handleRadioGroupChange]
  );

  return (
    <RadioGroup
      {...rest}
      selectedOption={field.value}
      errorMessage={errorMessage}
      onChange={handleOptionClick}
    />
  );
};

export { FormRadioGroup };
