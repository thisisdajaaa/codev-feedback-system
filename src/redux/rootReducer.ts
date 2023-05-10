import { combineReducers } from "@reduxjs/toolkit";

import { sampleReducers } from "./sample/slices";

const rootReducer = combineReducers({
  sample: sampleReducers,
});

export { rootReducer };
