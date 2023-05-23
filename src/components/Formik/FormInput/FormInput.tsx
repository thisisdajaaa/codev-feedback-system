import { useField } from "formik";
import React, { FC, useCallback } from "react";

import { useFieldError, useUpdateEffect } from "@/hooks";

import { Input } from "@/components/Input";

import type { FormInputProps } from "./types";

const FormInput: FC<FormInputProps> = (props) => {
  const { name, handleInputChange, ...rest } = props;

  const [field, meta, helpers] = useField(name);

  const { errorMessage } = useFieldError(name);

  useUpdateEffect(() => {
    helpers.setValue(meta.value);
  }, [meta.value]);

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const text = event.target.value;

      helpers.setValue(text);
      helpers.setError("");

      if (handleInputChange) handleInputChange(text);
    },
    [helpers, handleInputChange]
  );

  const handleBlur = useCallback(() => {
    helpers.setTouched(true);
  }, [helpers]);

  return (
    <Input
      {...rest}
      value={field.value}
      errorMessage={errorMessage}
      onChange={handleChange}
      onBlur={handleBlur}
    />
  );
};

export { FormInput };
