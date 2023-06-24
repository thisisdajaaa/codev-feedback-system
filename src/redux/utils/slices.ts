import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { initialState } from "./data";
import type { Toast } from "./models";

const utilsSlice = createSlice({
  name: "utils",
  initialState,
  reducers: {
    toggleToast: (state, { payload }: PayloadAction<Toast>) => {
      state.toast = { ...payload };
    },
  },
});

const { actions: utilsActions, reducer: utilsReducers } = utilsSlice;

export { utilsActions, utilsReducers };
