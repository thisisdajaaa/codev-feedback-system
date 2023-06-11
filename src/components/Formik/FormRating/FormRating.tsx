import { useField } from "formik";
import React, { FC, useCallback } from "react";

import { useFieldError, useUpdateEffect } from "@/hooks";

import { Rating } from "@/components/Rating";

import type { FormRatingProps } from "./types";

const FormRating: FC<FormRatingProps> = (props) => {
  const { name, handleRatingChange, ...rest } = props;

  const [field, meta, helpers] = useField(name);

  const { errorMessage } = useFieldError(name);

  useUpdateEffect(() => {
    helpers.setValue(meta.value);
  }, [meta.value]);

  const handleChange = useCallback(
    (value: number) => {
      helpers.setValue(value);
      helpers.setError("");
      helpers.setTouched(true);

      if (handleRatingChange) handleRatingChange(value);
    },
    [helpers, handleRatingChange]
  );

  return (
    <Rating
      {...rest}
      value={field.value}
      onChange={handleChange}
      errorMessage={errorMessage}
    />
  );
};

export { FormRating };
