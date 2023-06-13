import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { initialState } from "./data";

const surveysSlice = createSlice({
  name: "surveys",
  initialState,
  reducers: {
    setServerErrorMessage: (state, { payload }: PayloadAction<string>) => {
      state.serverErrorMessage = payload;
    },
  },
});

const { actions: surveysActions, reducer: surveysReducers } = surveysSlice;

export { surveysActions, surveysReducers };
