import { useField } from "formik";
import { useMemo } from "react";

const useFieldError = (name: string) => {
  const [, meta] = useField(name);

  const hasError: boolean = useMemo(
    () => meta.touched && !!meta.error,
    [meta.error, meta.touched]
  );

  return hasError;
};

export default useFieldError;
