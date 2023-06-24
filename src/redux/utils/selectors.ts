import { initialState } from "./data";
import { RootState } from "../store";

const toast = (state: RootState) => state.utils.toast || initialState.toast;

const selectors = {
  toast,
};

export default selectors;
