import type { UtilsState } from "./models";

export const initialState: UtilsState = {
  toast: {
    open: false,
    message: "",
    type: "default",
  },
};
