import { initialState } from "./data";
import { RootState } from "../store";

const serverErrorMessage = (state: RootState) =>
  state.surveys.serverErrorMessage || initialState.serverErrorMessage;

const selectors = {
  serverErrorMessage,
};

export default selectors;
