import { sampleActions } from "./slices";
import { AppDispatch, AppThunk } from "../store";

const { setSample } = sampleActions;

/**
 * Sets isSample to true
 * @returns void
 */
const callSampleApi = (): AppThunk => (dispatch: AppDispatch) => {
  dispatch(setSample());
};

const actions = {
  callSampleApi,
};

export default actions;
