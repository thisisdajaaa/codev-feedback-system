import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { initialState } from "./data";

const questionnaireSlice = createSlice({
  name: "questionnaire",
  initialState,
  reducers: {
    setActiveTemplateId: (state, { payload }: PayloadAction<string>) => {
      state.activeTemplateId = payload;
    },
    setServerErrorMessage: (state, { payload }: PayloadAction<string>) => {
      state.serverErrorMessage = payload;
    },
  },
});

const { actions: questionnaireActions, reducer: questionnaireReducers } =
  questionnaireSlice;

export { questionnaireActions, questionnaireReducers };
