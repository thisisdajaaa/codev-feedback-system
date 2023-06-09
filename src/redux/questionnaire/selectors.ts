import { initialState } from "./data";
import { RootState } from "../store";

const activeTemplateId = (state: RootState) =>
  state.questionnaire.activeTemplateId || initialState.activeTemplateId;

const serverErrorMessage = (state: RootState) =>
  state.questionnaire.serverErrorMessage || initialState.serverErrorMessage;

const selectors = {
  activeTemplateId,
  serverErrorMessage,
};

export default selectors;
