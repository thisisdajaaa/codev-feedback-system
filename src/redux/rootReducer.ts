import { combineReducers } from "@reduxjs/toolkit";

import { questionnaireReducers } from "./questionnaire/slices";
import { surveysReducers } from "./surveys/slices";

const rootReducer = combineReducers({
  questionnaire: questionnaireReducers,
  surveys: surveysReducers,
});

export { rootReducer };
