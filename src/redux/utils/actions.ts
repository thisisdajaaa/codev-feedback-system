import { initialState } from "./data";
import type { Toast } from "./models";
import { utilsActions } from "./slices";
import { AppDispatch, AppThunk } from "../store";

const { toggleToast } = utilsActions;

const callShowToast =
  (toast: Toast): AppThunk =>
  (dispatch: AppDispatch) => {
    const timeout = toast.timeout || 1000;

    dispatch(toggleToast({ ...toast, open: true }));

    setTimeout(() => {
      dispatch(toggleToast(initialState.toast));
    }, timeout);
  };

const actions = {
  callShowToast,
};

export default actions;
