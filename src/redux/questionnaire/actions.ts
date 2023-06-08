import { questionnaireActions } from "./slices";
import { AppDispatch, AppThunk } from "../store";

const { setActiveTemplateId } = questionnaireActions;

const callSetActiveTemplateId =
  (templateId: string): AppThunk =>
  (dispatch: AppDispatch) => {
    dispatch(setActiveTemplateId(templateId));
  };

const actions = {
  callSetActiveTemplateId,
};

export default actions;
