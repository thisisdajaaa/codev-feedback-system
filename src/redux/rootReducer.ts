import { combineReducers } from "@reduxjs/toolkit";

import { questionnaireReducers } from "./questionnaire/slices";

const rootReducer = combineReducers({
  questionnaire: questionnaireReducers,
});

export { rootReducer };
