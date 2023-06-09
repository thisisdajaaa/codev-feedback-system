import { questionnaireActions } from "./slices";
import { AppDispatch, AppThunk } from "../store";

const { setActiveTemplateId, setServerErrorMessage } = questionnaireActions;

const callSetActiveTemplateId =
  (templateId: string): AppThunk =>
  (dispatch: AppDispatch) => {
    dispatch(setActiveTemplateId(templateId));
  };

const callSetServerErrorMessage =
  (errorMessage: string): AppThunk =>
  (dispatch: AppDispatch) => {
    dispatch(setServerErrorMessage(errorMessage));
  };

const actions = {
  callSetActiveTemplateId,
  callSetServerErrorMessage,
};

export default actions;
