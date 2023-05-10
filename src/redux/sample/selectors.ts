import { initialState } from "./data";
import { RootState } from "../store";

const isSample = (state: RootState) =>
  state.sample.isSample || initialState.isSample;

const selectors = {
  isSample,
};

export default selectors;
