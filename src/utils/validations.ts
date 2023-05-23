import * as yup from "yup";

export const dropdownObjectSchema = yup.object().shape({
  label: yup.string().trim().required(),
  value: yup.string().trim().required(),
});
