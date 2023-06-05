import { useField } from "formik";
import React, { FC, useCallback } from "react";

import { useFieldError, useUpdateEffect } from "@/hooks";

import { DatePicker } from "@/components/DatePicker";

import type { FormDatePickerProps } from "./types";

const FormDatePicker: FC<FormDatePickerProps> = (props) => {
  const { name, handleDateChange, ...rest } = props;

  const [field, meta, helpers] = useField(name);

  const { errorMessage } = useFieldError(name);

  useUpdateEffect(() => {
    helpers.setValue(meta.value);
  }, [meta.value]);

  const handleChange = useCallback(
    (value: Date) => {
      const date = value;

      helpers.setValue(date);
      helpers.setError("");
      helpers.setTouched(true);

      if (handleDateChange) handleDateChange(date);
    },
    [helpers, handleDateChange]
  );

  const handleBlur = useCallback(() => {
    helpers.setTouched(true);
  }, [helpers]);

  return (
    <DatePicker
      {...rest}
      selectedDate={field.value}
      errorMessage={errorMessage}
      onChange={handleChange}
      onBlur={handleBlur}
    />
  );
};

export { FormDatePicker };
