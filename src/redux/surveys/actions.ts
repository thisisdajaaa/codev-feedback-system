import { surveysActions } from "./slices";
import { AppDispatch, AppThunk } from "../store";

const { setServerErrorMessage } = surveysActions;

const callSetServerErrorMessage =
  (errorMessage: string): AppThunk =>
  (dispatch: AppDispatch) => {
    dispatch(setServerErrorMessage(errorMessage));
  };

const actions = {
  callSetServerErrorMessage,
};

export default actions;
