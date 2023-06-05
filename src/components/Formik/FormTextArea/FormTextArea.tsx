import { useField } from "formik";
import React, { FC, useCallback } from "react";

import { useFieldError, useUpdateEffect } from "@/hooks";

import { TextArea } from "@/components/TextArea";

import type { FormTextAreaProps } from "./types";

const FormTextArea: FC<FormTextAreaProps> = (props) => {
  const { name, handleInputChange, ...rest } = props;

  const [field, meta, helpers] = useField(name);

  const { errorMessage } = useFieldError(name);

  useUpdateEffect(() => {
    helpers.setValue(meta.value);
  }, [meta.value]);

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
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
    <TextArea
      {...rest}
      value={field.value}
      errorMessage={errorMessage}
      onChange={handleChange}
      onBlur={handleBlur}
    />
  );
};

export { FormTextArea };
