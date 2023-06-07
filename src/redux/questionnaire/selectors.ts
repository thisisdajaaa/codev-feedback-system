import { initialState } from "./data";
import { RootState } from "../store";

const activeTemplateId = (state: RootState) =>
  state.questionnaire.activeTemplateId || initialState.activeTemplateId;

const selectors = {
  activeTemplateId,
};

export default selectors;
