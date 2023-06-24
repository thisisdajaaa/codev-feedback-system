import { combineReducers } from "@reduxjs/toolkit";

import { questionnaireReducers } from "./questionnaire/slices";
import { utilsReducers } from "./utils/slices";

const rootReducer = combineReducers({
  questionnaire: questionnaireReducers,
  utils: utilsReducers,
});

export { rootReducer };
