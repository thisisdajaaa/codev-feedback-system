import { createSlice } from "@reduxjs/toolkit";

import { initialState } from "./data";

const sampleSlice = createSlice({
  name: "sample",
  initialState,
  reducers: {
    setSample: (state) => {
      state.isSample = true;
    },
  },
});

const { actions: sampleActions, reducer: sampleReducers } = sampleSlice;

export { sampleActions, sampleReducers };
